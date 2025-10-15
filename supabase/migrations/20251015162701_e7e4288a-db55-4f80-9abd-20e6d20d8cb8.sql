-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    due_date TIMESTAMP WITH TIME ZONE,
    max_score INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    score INTEGER,
    feedback TEXT,
    status TEXT DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    graded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (assignment_id, user_id)
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, course_id, date)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create saved_codes table
CREATE TABLE IF NOT EXISTS public.saved_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    challenge_id TEXT,
    title TEXT,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.saved_codes ENABLE ROW LEVEL SECURITY;

-- Create assistant_chats table
CREATE TABLE IF NOT EXISTS public.assistant_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.assistant_chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- RLS Policies for assignments
CREATE POLICY "Assignments are viewable by enrolled students" 
ON public.assignments FOR SELECT 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.enrollments
        WHERE course_id = assignments.course_id
        AND user_id = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE id = assignments.course_id
        AND faculty_id = auth.uid()
    )
);

CREATE POLICY "Teachers can manage assignments" 
ON public.assignments FOR ALL 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE id = assignments.course_id
        AND faculty_id = auth.uid()
    )
);

-- RLS Policies for submissions
CREATE POLICY "Students can view their own submissions" 
ON public.submissions FOR SELECT 
TO authenticated
USING (user_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.assignments a
        JOIN public.courses c ON a.course_id = c.id
        WHERE a.id = assignment_id AND c.faculty_id = auth.uid()
    )
);

CREATE POLICY "Students can create their own submissions" 
ON public.submissions FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Students can update their own submissions" 
ON public.submissions FOR UPDATE 
TO authenticated
USING (user_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.assignments a
        JOIN public.courses c ON a.course_id = c.id
        WHERE a.id = assignment_id AND c.faculty_id = auth.uid()
    )
);

-- RLS Policies for attendance
CREATE POLICY "Users can view their own attendance" 
ON public.attendance FOR SELECT 
TO authenticated
USING (user_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE id = attendance.course_id AND faculty_id = auth.uid()
    )
);

CREATE POLICY "Teachers can manage attendance" 
ON public.attendance FOR ALL 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses
        WHERE id = attendance.course_id AND faculty_id = auth.uid()
    )
);

-- RLS Policies for saved_codes
CREATE POLICY "Users can manage their own saved codes" 
ON public.saved_codes FOR ALL 
TO authenticated
USING (user_id = auth.uid());

-- RLS Policies for assistant_chats
CREATE POLICY "Users can manage their own chats" 
ON public.assistant_chats FOR ALL 
TO authenticated
USING (user_id = auth.uid());

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_saved_codes_updated_at
BEFORE UPDATE ON public.saved_codes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();