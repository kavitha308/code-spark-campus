import { supabase } from "@/integrations/supabase/client";

export interface Lecture {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  order_number: number;
  duration: number;
  created_at: string;
  updated_at: string;
}

// Get lectures for a course
export const getCourseLectures = async (courseId: string): Promise<Lecture[]> => {
  try {
    const { data, error } = await supabase
      .from('lectures')
      .select('*')
      .eq('course_id', courseId)
      .order('order_number', { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching lectures:", error);
    return [];
  }
};

// Add a lecture to a course
export const addLecture = async (
  courseId: string,
  lectureData: Omit<Lecture, "id" | "created_at" | "updated_at" | "course_id">
): Promise<Lecture | null> => {
  try {
    const { data, error } = await supabase
      .from('lectures')
      .insert({
        course_id: courseId,
        ...lectureData
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding lecture:", error);
    throw error;
  }
};

// Upload video to storage
export const uploadLectureVideo = async (
  file: File,
  courseId: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${courseId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('course-videos')
      .upload(fileName, file);
      
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('course-videos')
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

// Update lecture
export const updateLecture = async (
  lectureId: string,
  updates: Partial<Lecture>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('lectures')
      .update(updates)
      .eq('id', lectureId);
      
    if (error) throw error;
  } catch (error) {
    console.error("Error updating lecture:", error);
    throw error;
  }
};

// Delete lecture
export const deleteLecture = async (lectureId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('lectures')
      .delete()
      .eq('id', lectureId);
      
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting lecture:", error);
    throw error;
  }
};