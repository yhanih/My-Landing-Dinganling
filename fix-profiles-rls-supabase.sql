-- FIX FOR SUPABASE SIGNUP ERROR: "new row violates row-level security policy for table profiles"
-- Run this SQL in your Supabase SQL Editor to fix the signup issue

-- First, check if the profiles table exists and has the correct RLS policies
-- This script will safely update the policies without breaking existing data

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policy that allows authenticated users to insert their own profile
-- This is crucial for the signup process to work
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Verify RLS is enabled on the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Optional: If you want to allow viewing all profiles (for public listings)
-- Uncomment the following lines:
-- CREATE POLICY "Public profiles are viewable by everyone" ON profiles
--   FOR SELECT 
--   USING (true);