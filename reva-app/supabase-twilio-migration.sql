-- Add phone number and notification settings to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"earnings": true, "campaigns": true, "payouts": true, "weekly_summary": true}'::JSONB;