-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create or update courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    instructor_name TEXT,
    category TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'draft',
    faculty_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create lectures table
CREATE TABLE public.lectures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    order_number INTEGER,
    duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on lectures
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;

-- Create enrollments table if not exists
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'in_progress',
    progress INTEGER DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (user_id, course_id)
);

-- Enable RLS on enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for courses
CREATE POLICY "Anyone can view published courses"
ON public.courses FOR SELECT
TO authenticated
USING (status = 'published' OR faculty_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can create courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update their own courses"
ON public.courses FOR UPDATE
TO authenticated
USING (faculty_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can delete their own courses"
ON public.courses FOR DELETE
TO authenticated
USING (faculty_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for lectures
CREATE POLICY "Anyone can view lectures of enrolled/owned courses"
ON public.lectures FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id
        AND (c.faculty_id = auth.uid() OR EXISTS (
            SELECT 1 FROM public.enrollments e
            WHERE e.course_id = c.id AND e.user_id = auth.uid()
        ))
    )
);

CREATE POLICY "Teachers can manage lectures for their courses"
ON public.lectures FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id
        AND (c.faculty_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
);

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students can enroll themselves"
ON public.enrollments FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own enrollments"
ON public.enrollments FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- Create storage bucket for course videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'course-videos',
    'course-videos',
    false,
    524288000, -- 500MB limit
    ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for videos
CREATE POLICY "Teachers can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'course-videos' AND
    (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Teachers can view their course videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'course-videos' AND
    (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Enrolled students can view course videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'course-videos'
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lectures_updated_at
BEFORE UPDATE ON public.lectures
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();