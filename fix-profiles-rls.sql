-- First, enable RLS on the profiles table if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to start fresh)
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policy to allow users to insert their own profile during signup
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Optional: If you want users to view all profiles (for public listings)
-- CREATE POLICY "Public profiles are viewable by everyone" ON profiles
--   FOR SELECT 
--   USING (true);