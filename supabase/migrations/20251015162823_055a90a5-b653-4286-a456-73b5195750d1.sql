-- Update assistant_chats table to match service expectations
ALTER TABLE public.assistant_chats 
  ADD COLUMN IF NOT EXISTS prompt TEXT,
  ADD COLUMN IF NOT EXISTS challenge_id TEXT;

-- Update assistant_chats to rename message to have both fields
UPDATE public.assistant_chats SET prompt = message WHERE prompt IS NULL;

-- Update calendar_events to add event_date field and course_id
ALTER TABLE public.calendar_events 
  ADD COLUMN IF NOT EXISTS event_date DATE,
  ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE;

-- Update calendar_events to populate event_date from start_time
UPDATE public.calendar_events SET event_date = start_time::date WHERE event_date IS NULL;

-- Update job_applications to add missing fields
ALTER TABLE public.job_applications 
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS resume_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_letter TEXT;

-- Drop the unique constraint on job_applications if it causes issues
ALTER TABLE public.job_applications DROP CONSTRAINT IF EXISTS job_applications_user_id_job_id_key;

-- Add back a more flexible unique constraint
ALTER TABLE public.job_applications 
  ADD CONSTRAINT job_applications_user_job_unique 
  UNIQUE NULLS NOT DISTINCT (user_id, job_id);