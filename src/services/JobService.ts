
import { supabase } from "@/integrations/supabase/client";

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  position: string;
  company_name: string;
  full_name: string;
  email: string;
  resume_url: string;
  cover_letter: string;
  status: string;
  submitted_at: string;
}

// Submit job application
export const submitJobApplication = async (
  jobId: string,
  position: string,
  companyName: string,
  fullName: string,
  email: string,
  resumeUrl: string,
  coverLetter: string
) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        job_id: jobId,
        job_title: position,
        user_id: user.user.id,
        position,
        company_name: companyName,
        full_name: fullName,
        email,
        resume_url: resumeUrl,
        cover_letter: coverLetter,
        status: 'submitted'
      } as any)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error submitting job application:", error);
    throw error;
  }
};

// Get user's job applications
export const getUserApplications = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.user.id)
      .order('submitted_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

// Upload resume to storage
export const uploadResume = async (file: File): Promise<string> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.user.id}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `resumes/${fileName}`;
    
    const { error } = await supabase.storage
      .from('job_applications')
      .upload(filePath, file);
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('job_applications')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};
