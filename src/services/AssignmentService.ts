
import { supabase } from "@/integrations/supabase/client";

// Function to get all assignments
export const getAssignments = async (courseId?: string) => {
  try {
    let query = supabase.from("assignments").select(`
      *,
      instructor:instructor_id(id, full_name, avatar_url),
      course:course_id(id, title)
    `);

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data, error } = await query.order("due_date", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting assignments:", error);
    return [];
  }
};

// Function to get assignment by id
export const getAssignmentById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("assignments")
      .select(`
        *,
        instructor:instructor_id(id, full_name, avatar_url),
        course:course_id(id, title)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting assignment:", error);
    return null;
  }
};

// Function to create a new assignment (for teachers)
export const createAssignment = async (assignment: {
  title: string;
  description?: string;
  course_id: string;
  due_date: string;
  total_marks: number;
  submission_type?: string;
  page_limit?: number;
}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("assignments").insert({
      ...assignment,
      instructor_id: user?.id
    }).select("*").single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    return null;
  }
};

// Function to submit an assignment
export const submitAssignment = async (
  assignmentId: string,
  fileUrl: string,
  fileName: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("submissions").insert({
      assignment_id: assignmentId,
      file_url: fileUrl,
      file_name: fileName,
      user_id: user?.id
    }).select("*").single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return null;
  }
};

// Function to upload assignment file to Supabase storage
export const uploadAssignmentFile = async (file: File) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('assignments')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('assignments')
      .getPublicUrl(data.path);
    
    return { url: publicUrl, fileName: file.name };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Function to get user submissions
export const getUserSubmissions = async (userId?: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const actualUserId = userId || user?.id;
    
    const { data, error } = await supabase
      .from("submissions")
      .select(`
        *,
        assignment:assignment_id(
          id,
          title,
          due_date,
          total_marks,
          course_id(id, title)
        )
      `)
      .eq("user_id", actualUserId)
      .order("submission_date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting user submissions:", error);
    return [];
  }
};

// Function to get a user's submission for a specific assignment
export const getUserSubmission = async (assignmentId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("assignment_id", assignmentId)
      .eq("user_id", user?.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting user submission:", error);
    return null;
  }
};

// Function for faculty to grade a submission
export const gradeSubmission = async (
  submissionId: string,
  marksAwarded: number,
  feedback?: string
) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .update({
        marks_awarded: marksAwarded,
        feedback: feedback,
        status: "graded"
      })
      .eq("id", submissionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error grading submission:", error);
    return null;
  }
};
