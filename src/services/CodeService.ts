
import { supabase } from "@/integrations/supabase/client";

export interface SavedCode {
  id: string;
  code: string;
  language: string;
  user_id: string;
  challenge_id: string;
  updated_at: string;
}

// Save code to database
export const saveCode = async (code: string, language: string, challengeId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('saved_codes')
      .upsert({
        user_id: user.user.id,
        challenge_id: challengeId,
        code,
        language
      }, {
        onConflict: 'user_id, challenge_id, language'
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving code:", error);
    throw error;
  }
};

// Get saved code
export const getUserSavedCode = async (challengeId: string, language: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('saved_codes')
      .select('*')
      .eq('user_id', user.user.id)
      .eq('challenge_id', challengeId)
      .eq('language', language)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error("Error getting saved code:", error);
    return null;
  }
};

// Execute code
export const executeCode = async (code: string, language: string, input?: string) => {
  try {
    // This is a mock implementation - replace with actual code execution service
    // In a real application, you would call an API to execute the code
    console.log("Executing code:", code, language, input);
    
    // Simulate code execution with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock output based on language and code
    let output = "";
    
    if (language === "javascript" || language === "typescript") {
      try {
        // Simple evaluation for demo purposes - NEVER do this in production
        // Use a sandboxed environment for real code execution
        if (code.includes("console.log")) {
          output = code.match(/console\.log\(['"](.+)['"]\)/)?.[1] || "Hello, world!";
        } else {
          output = "Output would appear here";
        }
      } catch (e) {
        output = `Error: ${e.message}`;
      }
    } else if (language === "python") {
      if (code.includes("print")) {
        output = code.match(/print\(['"](.+)['"]\)/)?.[1] || "Hello, world!";
      } else {
        output = "Output would appear here";
      }
    } else {
      output = "Language not supported for execution";
    }
    
    return { output, error: null };
  } catch (error) {
    console.error("Error executing code:", error);
    return { output: null, error: error.message };
  }
};

// Get user's code submissions
export const getUserCodeSubmissions = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('saved_codes')
      .select('*')
      .eq('user_id', user.user.id)
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching code submissions:", error);
    throw error;
  }
};
