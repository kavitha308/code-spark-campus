
import { supabase } from "@/integrations/supabase/client";

// Function to get AI assistant response (mock implementation)
export const getAIResponse = async (prompt: string, context?: string) => {
  try {
    // In a real implementation, this would call an AI API
    // For now, we'll simulate a response
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = [
      "Based on your code, I'd suggest optimizing the loop structure to improve performance.",
      "Your approach is good! However, consider handling edge cases for input validation.",
      "The algorithm you're using has O(n²) complexity. Consider using a hash map to reduce it to O(n).",
      "You might want to check line 5, there seems to be a potential null reference issue.",
      "Your solution is correct. For readability, consider adding more comments explaining your logic.",
      "Great work! The implementation is clean and efficient.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return { response: randomResponse, error: null };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return { response: null, error: String(error) };
  }
};

// Function to save chat message
export const saveChatMessage = async (prompt: string, challengeId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("assistant_chats").insert({
      prompt,
      challenge_id: challengeId,
      user_id: user?.id
    }).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving chat message:", error);
    return null;
  }
};

// Function to get chat history
export const getChatHistory = async (challengeId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("assistant_chats")
      .select("*")
      .eq("challenge_id", challengeId)
      .eq("user_id", user?.id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting chat history:", error);
    return [];
  }
};
