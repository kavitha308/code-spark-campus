
import { supabase } from "@/integrations/supabase/client";

// Function to get all assignments
export const getAssignments = async () => {
  try {
    const { data, error } = await supabase
      .from("assignments")
      .select(`
        *,
        instructor:instructor_id(id, full_name, avatar_url, role),
        course:course_id(id, title)
      `)
      .order("due_date", { ascending: true });

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
        instructor:instructor_id(id, full_name, avatar_url, role),
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

// Function to submit an assignment
export const submitAssignment = async (
  assignmentId: string,
  fileUrl: string,
  fileName: string
) => {
  try {
    // Check if a submission already exists
    const { data: existingSubmission } = await supabase
      .from("submissions")
      .select("*")
      .eq("assignment_id", assignmentId)
      .single();

    if (existingSubmission) {
      // Update existing submission
      const { error } = await supabase
        .from("submissions")
        .update({
          file_url: fileUrl,
          file_name: fileName,
          submission_date: new Date().toISOString(),
          status: "submitted"
        })
        .eq("id", existingSubmission.id);

      if (error) throw error;
      return true;
    } else {
      // Create new submission
      const { error } = await supabase.from("submissions").insert({
        assignment_id: assignmentId,
        file_url: fileUrl,
        file_name: fileName
      });

      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return false;
  }
};

// Function to get submissions for an assignment
export const getSubmissionsByAssignmentId = async (assignmentId: string) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select(`
        *,
        user:user_id(id, full_name, avatar_url, role)
      `)
      .eq("assignment_id", assignmentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting submissions:", error);
    return [];
  }
};

// Function to get user's submission for an assignment
export const getUserSubmission = async (assignmentId: string) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("assignment_id", assignmentId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No submission found
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting user submission:", error);
    return null;
  }
};

// Function to upload assignment file
export const uploadAssignmentFile = async (file: File, assignmentId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${assignmentId}_${Date.now()}.${fileExt}`;
    const filePath = `${assignmentId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('assignments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL for the file
    const { data } = supabase.storage.from('assignments').getPublicUrl(filePath);
    
    return {
      fileUrl: data.publicUrl,
      fileName: file.name
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
