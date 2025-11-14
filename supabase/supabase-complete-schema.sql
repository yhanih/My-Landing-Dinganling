-- REVA Complete Supabase Schema
-- Run this entire script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS earnings CASCADE;
DROP TABLE IF EXISTS clicks CASCADE;
DROP TABLE IF EXISTS tracking_links CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('marketer', 'promoter')),
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marketer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  destination_url TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  payout_per_click DECIMAL(10, 2) NOT NULL,
  remaining_budget DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracking links table
CREATE TABLE tracking_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  promoter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, promoter_id)
);

-- Clicks table
CREATE TABLE clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_link_id UUID REFERENCES tracking_links(id) ON DELETE CASCADE NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  promoter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  is_valid BOOLEAN DEFAULT false,
  payout_amount DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Earnings table
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  promoter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  click_id UUID REFERENCES clicks(id) ON DELETE CASCADE NOT NULL UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'paid')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_campaigns_marketer ON campaigns(marketer_id);
CREATE INDEX idx_tracking_links_campaign ON tracking_links(campaign_id);
CREATE INDEX idx_tracking_links_promoter ON tracking_links(promoter_id);
CREATE INDEX idx_clicks_tracking_link ON clicks(tracking_link_id);
CREATE INDEX idx_clicks_promoter ON clicks(promoter_id);
CREATE INDEX idx_earnings_promoter ON earnings(promoter_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Marketers can create campaigns" ON campaigns;
DROP POLICY IF EXISTS "Marketers can view own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Promoters can view active campaigns" ON campaigns;
DROP POLICY IF EXISTS "Marketers can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Promoters can create tracking links" ON tracking_links;
DROP POLICY IF EXISTS "Users can view own tracking links" ON tracking_links;
DROP POLICY IF EXISTS "Marketers can view campaign tracking links" ON tracking_links;
DROP POLICY IF EXISTS "Public can read tracking links by short code" ON tracking_links;
DROP POLICY IF EXISTS "Anyone can insert clicks" ON clicks;
DROP POLICY IF EXISTS "Promoters can view own clicks" ON clicks;
DROP POLICY IF EXISTS "Marketers can view campaign clicks" ON clicks;
DROP POLICY IF EXISTS "Promoters can view own earnings" ON earnings;
DROP POLICY IF EXISTS "System can insert earnings for valid clicks" ON earnings;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Marketers can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (auth.uid() = marketer_id);

CREATE POLICY "Marketers can view own campaigns" ON campaigns
  FOR SELECT USING (auth.uid() = marketer_id);

CREATE POLICY "Promoters can view active campaigns" ON campaigns
  FOR SELECT USING (is_active = true);

CREATE POLICY "Marketers can update own campaigns" ON campaigns
  FOR UPDATE USING (auth.uid() = marketer_id);

-- Tracking links policies
CREATE POLICY "Promoters can create tracking links" ON tracking_links
  FOR INSERT WITH CHECK (auth.uid() = promoter_id);

CREATE POLICY "Users can view own tracking links" ON tracking_links
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "Marketers can view campaign tracking links" ON tracking_links
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = tracking_links.campaign_id 
      AND campaigns.marketer_id = auth.uid()
    )
  );

CREATE POLICY "Public can read tracking links by short code" ON tracking_links
  FOR SELECT USING (true);

-- Clicks policies
CREATE POLICY "Anyone can insert clicks" ON clicks
  FOR INSERT WITH CHECK (is_valid = false AND payout_amount IS NULL);

CREATE POLICY "Promoters can view own clicks" ON clicks
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "Marketers can view campaign clicks" ON clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = clicks.campaign_id 
      AND campaigns.marketer_id = auth.uid()
    )
  );

-- Earnings policies
CREATE POLICY "Promoters can view own earnings" ON earnings
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "System can insert earnings for valid clicks" ON earnings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clicks
      WHERE clicks.id = click_id
      AND clicks.promoter_id = earnings.promoter_id
      AND clicks.campaign_id = earnings.campaign_id
    )
    AND NOT EXISTS (
      SELECT 1 FROM earnings AS existing_earnings
      WHERE existing_earnings.click_id = earnings.click_id
    )
  );

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_click_insert ON clicks;
DROP FUNCTION IF EXISTS verify_click();

-- Function to verify and validate clicks server-side
CREATE OR REPLACE FUNCTION verify_click()
RETURNS TRIGGER AS $$
DECLARE
  campaign_payout DECIMAL(10, 2);
  campaign_budget DECIMAL(10, 2);
  campaign_active BOOLEAN;
  recent_click_count INTEGER;
BEGIN
  -- Get campaign details
  SELECT payout_per_click, remaining_budget, is_active
  INTO campaign_payout, campaign_budget, campaign_active
  FROM campaigns
  WHERE id = NEW.campaign_id;

  -- Check for recent clicks from same IP (rate limiting - 1 hour window)
  SELECT COUNT(*)
  INTO recent_click_count
  FROM clicks
  WHERE tracking_link_id = NEW.tracking_link_id
    AND ip_address = NEW.ip_address
    AND created_at > NOW() - INTERVAL '1 hour';

  -- Validate click based on multiple criteria
  IF campaign_active = true 
     AND campaign_budget >= campaign_payout
     AND recent_click_count = 0
     AND NEW.user_agent IS NOT NULL
     AND length(NEW.user_agent) > 10
     -- Basic bot detection
     AND NEW.user_agent NOT ILIKE '%bot%'
     AND NEW.user_agent NOT ILIKE '%spider%'
     AND NEW.user_agent NOT ILIKE '%crawler%'
     AND NEW.user_agent NOT ILIKE '%scraper%'
     AND NEW.user_agent NOT ILIKE '%curl%'
     AND NEW.user_agent NOT ILIKE '%wget%'
     THEN
    -- Click is valid
    NEW.is_valid := true;
    NEW.payout_amount := campaign_payout;
    
    -- Update campaign budget
    UPDATE campaigns
    SET remaining_budget = remaining_budget - campaign_payout,
        updated_at = NOW()
    WHERE id = NEW.campaign_id;
    
    -- Create earning record
    INSERT INTO earnings (promoter_id, campaign_id, click_id, amount)
    VALUES (NEW.promoter_id, NEW.campaign_id, NEW.id, campaign_payout);
  ELSE
    -- Click is invalid
    NEW.is_valid := false;
    NEW.payout_amount := 0;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to verify clicks on insert
CREATE TRIGGER on_click_insert
  BEFORE INSERT ON clicks
  FOR EACH ROW
  EXECUTE FUNCTION verify_click();

-- Create function to handle user creation (auto-create profile)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create profile if user metadata contains role
  IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
    INSERT INTO profiles (id, email, role, full_name)
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data->>'role',
      NEW.raw_user_meta_data->>'full_name'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for auto-creating profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;