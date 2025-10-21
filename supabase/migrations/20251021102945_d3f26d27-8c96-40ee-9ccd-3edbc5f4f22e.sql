-- Create farmer_users table for authentication
CREATE TABLE IF NOT EXISTS public.farmer_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'farmer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.farmer_users ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer_users
CREATE POLICY "Users can view their own profile"
  ON public.farmer_users
  FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile"
  ON public.farmer_users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.farmer_users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_sessions
CREATE POLICY "Users can view their own sessions"
  ON public.user_sessions
  FOR SELECT
  USING (user_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can insert their own sessions"
  ON public.user_sessions
  FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can delete their own sessions"
  ON public.user_sessions
  FOR DELETE
  USING (user_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_farmer_users_updated_at
  BEFORE UPDATE ON public.farmer_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for phone number lookups
CREATE INDEX IF NOT EXISTS idx_farmer_users_phone ON public.farmer_users(phone_number);

-- Create index for session token lookups
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON public.user_sessions(session_token);