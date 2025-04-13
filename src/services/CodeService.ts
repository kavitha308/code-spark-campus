
import { supabase } from "@/integrations/supabase/client";

// Function to save code for a specific challenge
export const saveCode = async (
  challengeId: string,
  code: string,
  language: string = "javascript"
) => {
  try {
    // Check if a saved code already exists for this user and challenge
    const { data: existingCode } = await supabase
      .from("saved_codes")
      .select("*")
      .eq("challenge_id", challengeId)
      .eq("language", language)
      .single();

    if (existingCode) {
      // Update existing saved code
      const { error } = await supabase
        .from("saved_codes")
        .update({ code, updated_at: new Date().toISOString() })
        .eq("id", existingCode.id);

      if (error) throw error;
    } else {
      // Insert new saved code
      const { error } = await supabase.from("saved_codes").insert({
        challenge_id: challengeId,
        code,
        language,
      });

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error("Error saving code:", error);
    return false;
  }
};

// Function to get saved code for a specific challenge
export const getSavedCode = async (
  challengeId: string,
  language: string = "javascript"
) => {
  try {
    const { data, error } = await supabase
      .from("saved_codes")
      .select("code")
      .eq("challenge_id", challengeId)
      .eq("language", language)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No saved code found
        return null;
      }
      throw error;
    }

    return data?.code || null;
  } catch (error) {
    console.error("Error getting saved code:", error);
    return null;
  }
};

// Function to execute code and return the result
export const executeCode = async (code: string, language: string = "javascript") => {
  try {
    // This is a simplified implementation that only handles JavaScript
    // In a real application, you would use a secure sandboxed environment or a code execution API
    if (language === "javascript" || language === "js") {
      // Create a safe evaluation function
      const safeEval = (code: string) => {
        try {
          // Create a sandbox with console.log captured
          let output = "";
          const sandbox = {
            console: {
              log: (...args: any[]) => {
                output += args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(" ") + "\n";
              },
              error: (...args: any[]) => {
                output += "ERROR: " + args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(" ") + "\n";
              },
              info: (...args: any[]) => {
                output += "INFO: " + args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(" ") + "\n";
              },
              warn: (...args: any[]) => {
                output += "WARNING: " + args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(" ") + "\n";
              }
            },
            setTimeout: (callback: Function, timeout: number) => {
              // Implement a safe version of setTimeout if needed
              return 0;
            },
            clearTimeout: (id: number) => {
              // Implement a safe version of clearTimeout if needed
            }
          };

          // Add sandbox variables to the function scope
          const sandboxVars = Object.keys(sandbox).map(key => key);
          const sandboxValues = Object.values(sandbox);

          // Create a new function with the sandbox
          const fn = new Function(...sandboxVars, `
            "use strict";
            try {
              ${code}
              return { success: true, output: {} };
            } catch (error) {
              return { success: false, error: error.message };
            }
          `);

          // Execute the function with sandbox
          const result = fn(...sandboxValues);
          
          // Return the result and console output
          return {
            success: result.success,
            output: output || "No output",
            error: result.error || null
          };
        } catch (error: any) {
          return {
            success: false,
            output: "",
            error: error.message
          };
        }
      };

      // Execute the code
      return safeEval(code);
    } else if (language === "python") {
      // For Python, we would typically use a backend service
      return {
        success: false,
        output: "",
        error: "Python execution is not available in the browser. In a real application, this would be processed by a backend service."
      };
    } else {
      return {
        success: false,
        output: "",
        error: `Execution of ${language} code is not supported in this environment.`
      };
    }
  } catch (error: any) {
    console.error("Error executing code:", error);
    return {
      success: false,
      output: "",
      error: error.message || "An error occurred while executing the code."
    };
  }
};
