
import { supabase } from "@/integrations/supabase/client";

// Function to execute code (mock implementation)
export const executeCode = async (code: string, language: string) => {
  try {
    // In a real implementation, this would send the code to a backend service
    // for execution. For now, we'll simulate a response.
    await new Promise(resolve => setTimeout(resolve, 500));

    if (code.trim() === "") {
      return { output: "", error: "No code to execute" };
    }

    // Simple output simulation based on language
    const outputs: Record<string, string> = {
      javascript: `// JavaScript Output\n${eval(`(function() { try { ${code} } catch(e) { return e.toString(); } })()`)}`,
      python: `# Python Output\nExecuted Python code successfully\n(This is a simulation)`,
      java: `// Java Output\nCompiled and executed Java code successfully\n(This is a simulation)`,
      cpp: `// C++ Output\nCompiled and executed C++ code successfully\n(This is a simulation)`,
    };

    return { output: outputs[language] || "Code executed successfully", error: null };
  } catch (error) {
    console.error("Error executing code:", error);
    return { output: "", error: String(error) };
  }
};

// Function to save code for a challenge
export const saveCode = async (challengeId: string, code: string, language: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from("saved_codes").upsert({
      challenge_id: challengeId,
      code,
      language,
      user_id: user?.id
    }, {
      onConflict: "user_id, challenge_id, language"
    }).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving code:", error);
    return null;
  }
};

// Function to load saved code - this was missing and causing the error
export const getSavedCode = async (challengeId: string, language: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("saved_codes")
      .select("*")
      .eq("challenge_id", challengeId)
      .eq("language", language)
      .eq("user_id", user?.id)
      .maybeSingle();

    if (error) throw error;
    return data?.code || "";
  } catch (error) {
    console.error("Error loading saved code:", error);
    return "";
  }
};

// Function to get coding challenges
export const getCodingChallenges = async (filters?: { difficulty?: string; category?: string }) => {
  try {
    let query = supabase.from("coding_challenges").select("*");

    if (filters?.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting coding challenges:", error);
    return [];
  }
};

// Function to get a specific coding challenge
export const getChallengeById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("coding_challenges")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting challenge:", error);
    return null;
  }
};
