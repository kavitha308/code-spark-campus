-- Create discussions table
CREATE TABLE IF NOT EXISTS public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Create replies table
CREATE TABLE IF NOT EXISTS public.replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;

-- Create calendar_events table
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    event_type TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    job_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, job_id)
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for discussions
CREATE POLICY "Discussions are viewable by enrolled students" 
ON public.discussions FOR SELECT 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.enrollments
        WHERE course_id = discussions.course_id
        AND user_id = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE id = discussions.course_id
        AND faculty_id = auth.uid()
    ) OR author_id = auth.uid()
);

CREATE POLICY "Users can create discussions" 
ON public.discussions FOR INSERT 
TO authenticated
WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update their own discussions" 
ON public.discussions FOR UPDATE 
TO authenticated
USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own discussions" 
ON public.discussions FOR DELETE 
TO authenticated
USING (author_id = auth.uid());

-- RLS Policies for replies
CREATE POLICY "Replies are viewable by discussion viewers" 
ON public.replies FOR SELECT 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.discussions d
        LEFT JOIN public.enrollments e ON d.course_id = e.course_id
        LEFT JOIN public.courses c ON d.course_id = c.id
        WHERE d.id = replies.discussion_id
        AND (e.user_id = auth.uid() OR c.faculty_id = auth.uid() OR d.author_id = auth.uid())
    )
);

CREATE POLICY "Users can create replies" 
ON public.replies FOR INSERT 
TO authenticated
WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update their own replies" 
ON public.replies FOR UPDATE 
TO authenticated
USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own replies" 
ON public.replies FOR DELETE 
TO authenticated
USING (author_id = auth.uid());

-- RLS Policies for calendar_events
CREATE POLICY "Events are viewable by all authenticated users" 
ON public.calendar_events FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create events" 
ON public.calendar_events FOR INSERT 
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own events" 
ON public.calendar_events FOR UPDATE 
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own events" 
ON public.calendar_events FOR DELETE 
TO authenticated
USING (created_by = auth.uid());

-- RLS Policies for job_applications
CREATE POLICY "Users can manage their own applications" 
ON public.job_applications FOR ALL 
TO authenticated
USING (user_id = auth.uid());

-- Add triggers for updated_at
CREATE TRIGGER update_discussions_updated_at
BEFORE UPDATE ON public.discussions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
BEFORE UPDATE ON public.calendar_events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();