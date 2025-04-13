
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  duration: string;
  faculty_id: string;
  status: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  course_id: string;
  user_id: string;
  enrolled_at: string;
  progress: number;
  status: string;
  completed_at: string | null;
}

// Get all courses
export const getAllCourses = async () => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles!courses_faculty_id_fkey(*)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Get course by ID
export const getCourseById = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles!courses_faculty_id_fkey(*)
      `)
      .eq('id', courseId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

// Create a new course (faculty or admin)
export const createCourse = async (course: Omit<Course, 'id' | 'created_at' | 'faculty_id'>) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...course,
        faculty_id: user.user.id
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', courseId)
      .eq('user_id', user.user.id)
      .maybeSingle();
      
    if (checkError) throw checkError;
    
    if (existingEnrollment) {
      return existingEnrollment;
    }
    
    // Create new enrollment
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        course_id: courseId,
        user_id: user.user.id,
        progress: 0,
        status: 'in_progress'
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

// Get enrolled courses for a user
export const getEnrolledCourses = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses(*)
      `)
      .eq('user_id', user.user.id)
      .order('enrolled_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

// Update course progress
export const updateCourseProgress = async (enrollmentId: string, progress: number) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .update({
        progress
      })
      .eq('id', enrollmentId)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating course progress:", error);
    throw error;
  }
};

// Get courses created by a faculty member
export const getFacultyCourses = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('faculty_id', user.user.id)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    throw error;
  }
};
