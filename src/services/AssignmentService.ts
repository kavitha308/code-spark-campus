
import { supabase } from "@/integrations/supabase/client";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  course_id: string;
  due_date: string;
  total_marks: number;
  instructor_id: string;
  created_at: string;
  submission_type: string;
  page_limit: number;
}

export interface Submission {
  id: string;
  assignment_id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  submission_date: string;
  status: string;
  marks_awarded: number | null;
  feedback: string | null;
}

// Get assignments for a user
export const getAssignments = async () => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .order('due_date', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

// Get assignment by ID
export const getAssignmentById = async (assignmentId: string) => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', assignmentId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching assignment:", error);
    throw error;
  }
};

// Submit assignment
export const submitAssignment = async (assignmentId: string, fileName: string, fileUrl: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        assignment_id: assignmentId,
        user_id: user.user.id,
        file_name: fileName,
        file_url: fileUrl,
        status: 'submitted'
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};

// Get submissions for a user
export const getUserSubmissions = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        assignments(*)
      `)
      .eq('user_id', user.user.id)
      .order('submission_date', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

// Get all submissions for an assignment (faculty or admin)
export const getAllSubmissionsForAssignment = async (assignmentId: string) => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        profiles(id, full_name, username, avatar_url)
      `)
      .eq('assignment_id', assignmentId)
      .order('submission_date', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

// Create a new assignment (faculty or admin)
export const createAssignment = async (assignment: Omit<Assignment, 'id' | 'created_at' | 'instructor_id'>) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        ...assignment,
        instructor_id: user.user.id
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

// Upload a file to storage
export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { error } = await supabase.storage
      .from('assignments')
      .upload(filePath, file);
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('assignments')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Grade a submission (faculty or admin)
export const gradeSubmission = async (submissionId: string, marks: number, feedback: string) => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .update({
        marks_awarded: marks,
        feedback: feedback,
        status: 'graded'
      })
      .eq('id', submissionId)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error grading submission:", error);
    throw error;
  }
};
