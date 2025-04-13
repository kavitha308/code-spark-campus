
import { supabase } from "@/integrations/supabase/client";

// Function to create a new discussion
export const createDiscussion = async (
  title: string,
  content: string,
  courseId?: string
) => {
  try {
    const { data, error } = await supabase.from("discussions").insert({
      title,
      content,
      course_id: courseId
    }).select("*").single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating discussion:", error);
    return null;
  }
};

// Function to get all discussions
export const getDiscussions = async (courseId?: string) => {
  try {
    let query = supabase
      .from("discussions")
      .select(`
        *,
        author:author_id(id, full_name, avatar_url, role),
        replies:replies(*)
      `)
      .order("created_at", { ascending: false });

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting discussions:", error);
    return [];
  }
};

// Function to get a specific discussion by id
export const getDiscussionById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("discussions")
      .select(`
        *,
        author:author_id(id, full_name, avatar_url, role),
        replies(
          *,
          author:author_id(id, full_name, avatar_url, role)
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting discussion:", error);
    return null;
  }
};

// Function to add a reply to a discussion
export const addReply = async (discussionId: string, content: string) => {
  try {
    const { data, error } = await supabase.from("replies").insert({
      discussion_id: discussionId,
      content
    }).select("*").single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding reply:", error);
    return null;
  }
};
