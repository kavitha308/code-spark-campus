
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Get all students
export const getAllStudents = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('full_name', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Get all faculty
export const getAllFaculty = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher')
      .order('full_name', { ascending: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching faculty:", error);
    throw error;
  }
};

// Get student progress
export const getStudentProgress = async (studentId: string) => {
  try {
    // Get enrolled courses
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses(*)
      `)
      .eq('user_id', studentId);
      
    if (enrollmentsError) throw enrollmentsError;
    
    // Get code submissions
    const { data: codeSubmissions, error: codeError } = await supabase
      .from('saved_codes')
      .select('*')
      .eq('user_id', studentId);
      
    if (codeError) throw codeError;
    
    // Get assignment submissions
    const { data: assignmentSubmissions, error: assignmentsError } = await supabase
      .from('submissions')
      .select(`
        *,
        assignments(*)
      `)
      .eq('user_id', studentId);
      
    if (assignmentsError) throw assignmentsError;
    
    return {
      enrollments: enrollments || [],
      codeSubmissions: codeSubmissions || [],
      assignmentSubmissions: assignmentSubmissions || []
    };
  } catch (error) {
    console.error("Error fetching student progress:", error);
    throw error;
  }
};

// Get student attendance
export const getStudentAttendance = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        courses(*)
      `)
      .eq('user_id', studentId)
      .order('date', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profile: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.user.id)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Upload avatar
export const uploadAvatar = async (file: File): Promise<string> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.user.id}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    const { error } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
