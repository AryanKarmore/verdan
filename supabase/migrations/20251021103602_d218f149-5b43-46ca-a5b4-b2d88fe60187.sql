-- Create farmer_profiles table
CREATE TABLE IF NOT EXISTS public.farmer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.farmer_users(id) ON DELETE CASCADE,
  soil_health TEXT,
  water_availability TEXT,
  pest_status TEXT,
  fertilization_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer_profiles
CREATE POLICY "Users can view all profiles"
  ON public.farmer_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.farmer_profiles
  FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can update their own profile"
  ON public.farmer_profiles
  FOR UPDATE
  USING (user_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

-- Create farmer_insights table
CREATE TABLE IF NOT EXISTS public.farmer_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.farmer_users(id) ON DELETE CASCADE,
  insight_type TEXT,
  insight_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.farmer_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer_insights
CREATE POLICY "Users can view their own insights"
  ON public.farmer_insights
  FOR SELECT
  USING (farmer_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can insert their own insights"
  ON public.farmer_insights
  FOR INSERT
  WITH CHECK (farmer_id IN (SELECT id FROM public.farmer_users WHERE auth.uid()::text = id::text));

-- Create community_posts table
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.farmer_users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for community_posts
CREATE POLICY "Anyone can view posts"
  ON public.community_posts
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.community_posts
  FOR INSERT
  WITH CHECK (auth.uid()::text = author_id::text);

CREATE POLICY "Users can update their own posts"
  ON public.community_posts
  FOR UPDATE
  USING (auth.uid()::text = author_id::text);

CREATE POLICY "Users can delete their own posts"
  ON public.community_posts
  FOR DELETE
  USING (auth.uid()::text = author_id::text);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.farmer_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for post_likes
CREATE POLICY "Anyone can view likes"
  ON public.post_likes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like posts"
  ON public.post_likes
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can unlike posts"
  ON public.post_likes
  FOR DELETE
  USING (auth.uid()::text = user_id::text);

-- Add trigger for farmer_profiles updated_at
CREATE TRIGGER update_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for community_posts updated_at
CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farmer_profiles_user_id ON public.farmer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_farmer_insights_farmer_id ON public.farmer_insights(farmer_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_author_id ON public.community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes(user_id);