
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  challenge_id: string | null;
  created_at: string;
}

// Save chat message to database
export const saveChatMessage = async (prompt: string, response: string, challengeId?: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('assistant_chats')
      .insert({
        user_id: user.user.id,
        message: prompt,
        prompt,
        response,
        challenge_id: challengeId || null
      } as any)
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};

// Get chat history
export const getChatHistory = async (challengeId?: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    let query = supabase
      .from('assistant_chats')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: true });
      
    if (challengeId) {
      query = query.eq('challenge_id', challengeId);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting chat history:", error);
    return [];
  }
};

// Generate AI response
export const generateResponse = async (prompt: string) => {
  try {
    // This is a mock implementation - replace with actual AI service
    console.log("Generating response for:", prompt);
    
    // Simulate AI processing with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a mock response based on the prompt
    let response = "";
    
    if (prompt.toLowerCase().includes("error")) {
      response = "It looks like you're encountering an error. Check your syntax and make sure all variables are properly declared.";
    } else if (prompt.toLowerCase().includes("help")) {
      response = "I'm here to help! What specific programming concept or issue are you looking for assistance with?";
    } else if (prompt.toLowerCase().includes("example")) {
      response = "Here's an example of how to declare a function in JavaScript:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```";
    } else {
      response = "Based on your query, I'd recommend reviewing the documentation or trying to break down the problem into smaller parts. If you need specific help, please provide more details about what you're trying to accomplish.";
    }
    
    return { response, error: null };
  } catch (error) {
    console.error("Error generating AI response:", error);
    return { response: null, error: error.message };
  }
};
