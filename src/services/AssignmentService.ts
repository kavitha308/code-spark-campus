
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
