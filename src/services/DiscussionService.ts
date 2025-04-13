
import { supabase } from "@/integrations/supabase/client";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  course_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reply {
  id: string;
  discussion_id: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

// Get all discussions
export const getAllDiscussions = async () => {
  try {
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        *,
        author:profiles!discussions_author_id_fkey(*),
        replies(
          *,
          author:profiles!replies_author_id_fkey(*)
        )
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

// Get discussions for a course
export const getCourseDiscussions = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        *,
        author:profiles!discussions_author_id_fkey(*),
        replies(
          *,
          author:profiles!replies_author_id_fkey(*)
        )
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course discussions:", error);
    throw error;
  }
};

// Get discussion by ID
export const getDiscussionById = async (discussionId: string) => {
  try {
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        *,
        author:profiles!discussions_author_id_fkey(*),
        replies(
          *,
          author:profiles!replies_author_id_fkey(*)
        )
      `)
      .eq('id', discussionId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching discussion:", error);
    throw error;
  }
};

// Create a new discussion
export const createDiscussion = async (title: string, content: string, courseId?: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('discussions')
      .insert({
        title,
        content,
        author_id: user.user.id,
        course_id: courseId || null
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating discussion:", error);
    throw error;
  }
};

// Create a reply to a discussion
export const createReply = async (discussionId: string, content: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('replies')
      .insert({
        discussion_id: discussionId,
        content,
        author_id: user.user.id
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error;
  }
};

// Delete a discussion (author or admin only)
export const deleteDiscussion = async (discussionId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if user is author or admin
    const { data: discussion, error: checkError } = await supabase
      .from('discussions')
      .select('author_id')
      .eq('id', discussionId)
      .single();
      
    if (checkError) throw checkError;
    
    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    if (discussion.author_id !== user.user.id && profile.role !== 'admin' && profile.role !== 'teacher') {
      throw new Error("Not authorized to delete this discussion");
    }
    
    const { error } = await supabase
      .from('discussions')
      .delete()
      .eq('id', discussionId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting discussion:", error);
    throw error;
  }
};

// Delete a reply (author or admin only)
export const deleteReply = async (replyId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if user is author or admin
    const { data: reply, error: checkError } = await supabase
      .from('replies')
      .select('author_id')
      .eq('id', replyId)
      .single();
      
    if (checkError) throw checkError;
    
    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    if (reply.author_id !== user.user.id && profile.role !== 'admin' && profile.role !== 'teacher') {
      throw new Error("Not authorized to delete this reply");
    }
    
    const { error } = await supabase
      .from('replies')
      .delete()
      .eq('id', replyId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting reply:", error);
    throw error;
  }
};
