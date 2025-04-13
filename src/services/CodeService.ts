
import { supabase } from "@/integrations/supabase/client";

export interface SavedCode {
  id: string;
  user_id: string;
  challenge_id: string;
  code: string;
  language: string;
  updated_at: string;
}

// Save code for a challenge
export const saveCode = async (
  challengeId: string,
  code: string,
  language: string
): Promise<SavedCode | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // Check if a saved code already exists for this user and challenge
    const { data: existingCode } = await supabase
      .from('saved_codes')
      .select('*')
      .eq('user_id', user.user.id)
      .eq('challenge_id', challengeId)
      .single();
      
    let result;
      
    if (existingCode) {
      // Update existing code
      const { data, error } = await supabase
        .from('saved_codes')
        .update({
          code,
          language,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingCode.id)
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    } else {
      // Insert new code
      const { data, error } = await supabase
        .from('saved_codes')
        .insert({
          user_id: user.user.id,
          challenge_id: challengeId,
          code,
          language
        })
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    }
    
    return result;
  } catch (error) {
    console.error("Error saving code:", error);
    return null;
  }
};

// Get saved code for a challenge
export const getSavedCode = async (
  challengeId: string
): Promise<SavedCode | null> => {
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
      .single();
      
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned"
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching saved code:", error);
    return null;
  }
};

// Get all saved codes for a user
export const getAllSavedCodes = async (): Promise<SavedCode[]> => {
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
    
    return data || [];
  } catch (error) {
    console.error("Error fetching all saved codes:", error);
    return [];
  }
};

// Execute code (mock implementation)
export const executeCode = async (
  code: string,
  language: string
): Promise<{ output: string; error: string | null }> => {
  try {
    // Mock execution for now - in a real implementation, this would call a code execution service
    console.log(`Executing ${language} code:`, code);
    
    // Simple code execution for JavaScript
    if (language.toLowerCase() === 'javascript') {
      try {
        // For safety, this is a mock execution
        // In a real implementation, you'd use a sandboxed environment
        let output = '';
        const mockConsoleLog = (...args: any[]) => {
          output += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ') + '\n';
        };
        
        // Very basic execution simulation
        if (code.includes('console.log')) {
          // Extract content inside console.log
          const matches = code.match(/console\.log\((.*?)\)/g);
          if (matches) {
            matches.forEach(match => {
              const content = match.replace('console.log(', '').replace(')', '');
              // Simple evaluation for demonstration purposes only
              try {
                mockConsoleLog(eval(content));
              } catch (e) {
                output += `Error evaluating expression: ${e.message}\n`;
              }
            });
          }
        } else {
          output = "Code executed but no output was produced. Use console.log() to see results.";
        }
        
        return { output, error: null };
      } catch (error) {
        return { output: '', error: `Execution error: ${error.message}` };
      }
    }
    
    // Default response for other languages
    return {
      output: `Simulated ${language} execution result:\nHello, World! Your code was processed.`,
      error: null
    };
  } catch (error) {
    console.error("Error executing code:", error);
    return { output: '', error: `Execution error: ${error.message}` };
  }
};
