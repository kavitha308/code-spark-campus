
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  duration: string;
  status: string;
  faculty_id: string;
  created_at: string;
  is_enrolled?: boolean;
  progress?: number;
}

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Get all courses
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Get user's enrollments
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select('course_id, progress')
      .eq('user_id', user.user.id);
      
    if (enrollmentsError) throw enrollmentsError;
    
    // Mark courses as enrolled if user is enrolled
    const coursesWithEnrollment = courses.map(course => {
      const enrollment = enrollments?.find(e => e.course_id === course.id);
      return {
        ...course,
        is_enrolled: Boolean(enrollment),
        progress: enrollment?.progress || 0
      };
    });
    
    return coursesWithEnrollment;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

// Get course by ID
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
};

// Get faculty courses
export const getFacultyCourses = async (): Promise<Course[]> => {
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
    return [];
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId: string): Promise<void> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.user.id,
        course_id: courseId,
        status: 'in_progress',
        progress: 0
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (courseData: Omit<Course, "id" | "faculty_id" | "created_at">): Promise<Course> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...courseData,
        faculty_id: user.user.id
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Update course progress
export const updateCourseProgress = async (courseId: string, progress: number): Promise<void> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('enrollments')
      .update({ progress })
      .eq('user_id', user.user.id)
      .eq('course_id', courseId);
      
    if (error) throw error;
  } catch (error) {
    console.error("Error updating course progress:", error);
    throw error;
  }
};
