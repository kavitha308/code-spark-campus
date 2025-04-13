
import { supabase } from "@/integrations/supabase/client";

// Function to save a chat message to the database
export const saveAssistantChat = async (
  prompt: string,
  challengeId?: string
) => {
  try {
    const { error } = await supabase.from("assistant_chats").insert({
      prompt,
      challenge_id: challengeId,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving assistant chat:", error);
    return false;
  }
};

// Function to get contextual response for code-related questions
export const getAssistantResponse = async (prompt: string, code?: string, language?: string) => {
  try {
    // The implementation below is a mock version that simulates AI responses
    // In a production environment, this would call an actual AI API (OpenAI, etc.)
    const responses: { [key: string]: string } = {
      "how to reverse a string": "To reverse a string in JavaScript, you can use:\n```js\nfunction reverseString(str) {\n  return str.split('').reverse().join('');\n}\n```",
      "explain recursion": "Recursion is when a function calls itself until it reaches a base case. It's useful for problems that can be broken down into smaller, similar sub-problems.",
      "what is big o notation": "Big O notation is used to describe the time complexity of an algorithm. It helps understand how runtime grows as input size increases.",
      "help with arrays": "Arrays are ordered collections of items. Common operations include:\n- push() - add to end\n- pop() - remove from end\n- shift() - remove from start\n- unshift() - add to start\n- slice() - create a sub-array",
      "javascript loops": "JavaScript has several types of loops:\n- for loop\n- while loop\n- do...while loop\n- for...of loop (for iterables)\n- for...in loop (for object properties)",
    };

    // Check for specific keywords in the prompt
    const lowerPrompt = prompt.toLowerCase();
    let response = "";

    // Try to find a direct match in our predefined responses
    for (const key in responses) {
      if (lowerPrompt.includes(key)) {
        response = responses[key];
        break;
      }
    }

    // If no direct match, provide a generic response based on code context
    if (!response) {
      if (code) {
        if (language === "javascript" || language === "js") {
          response = "I see you're working with JavaScript. Can you tell me more specifically what you need help with? I can help with syntax, debugging, or optimizing your code.";
        } else if (language === "python") {
          response = "I see you're working with Python. Is there a specific part of your code you need help with? I can explain Python concepts or help troubleshoot issues.";
        } else {
          response = `I see you're working with code. What specific aspect of your ${language || "code"} would you like help with?`;
        }
      } else {
        response = "How can I assist you with your coding question? Please provide more details or a specific programming concept you'd like me to explain.";
      }
    }

    // Save the response to the database
    await supabase.from("assistant_chats").update({
      response
    }).eq("prompt", prompt);

    return response;
  } catch (error) {
    console.error("Error getting assistant response:", error);
    return "I'm sorry, I encountered an error processing your request. Please try again.";
  }
};

// Function to get previous chats for a user and challenge
export const getPreviousChats = async (challengeId?: string) => {
  try {
    const { data, error } = await supabase
      .from("assistant_chats")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching previous chats:", error);
    return [];
  }
};
