
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { executeCode, saveCode, getSavedCode } from "@/services/CodeService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Play, Save, Clock, Code as CodeIcon } from "lucide-react";

// Mock code editor styles - in a real app this would be Monaco Editor or CodeMirror
const CodeEditor = ({ challengeId = "55555555-5555-5555-5555-555555555555" }) => {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load saved code on component mount
  useEffect(() => {
    const loadSavedCode = async () => {
      if (!user) return;
      
      try {
        const savedCode = await getSavedCode(challengeId, language);
        if (savedCode) {
          setCode(savedCode);
          setLastSaved(new Date());
        } else {
          // Default code for different languages
          let defaultCode = "";
          
          if (language === "javascript") {
            defaultCode = `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.

function twoSum(nums, target) {
  // Your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Test the function
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Expected output: [0, 1]
`;
          } else if (language === "python") {
            defaultCode = `# Two Sum Problem
# Given an array of integers nums and an integer target,
# return indices of the two numbers such that they add up to target.

def two_sum(nums, target):
    # Your solution here
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []

# Test the function
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # Expected output: [0, 1]
`;
          }
          
          setCode(defaultCode);
        }
      } catch (error) {
        console.error("Error loading saved code:", error);
        toast.error("Failed to load your saved code");
      }
    };
    
    loadSavedCode();
  }, [user, challengeId, language]);
  
  const handleExecuteCode = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }
    
    setIsExecuting(true);
    setOutput("");
    
    try {
      const result = await executeCode(code, language);
      
      if (result.error === null) {
        setOutput(result.output);
      } else {
        setOutput(`Error: ${result.error}\n\n${result.output}`);
      }
    } catch (error: any) {
      console.error("Error executing code:", error);
      setOutput(`Error: ${error.message || "An unknown error occurred"}`);
    } finally {
      setIsExecuting(false);
    }
  };
  
  const handleSaveCode = async () => {
    if (!user) {
      toast.error("Please log in to save your code");
      return;
    }
    
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }
    
    setIsSaving(true);
    
    try {
      const saved = await saveCode(challengeId, code, language);
      
      if (saved) {
        setLastSaved(new Date());
        toast.success("Code saved successfully");
      } else {
        toast.error("Failed to save code");
      }
    } catch (error) {
      console.error("Error saving code:", error);
      toast.error("Failed to save code");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <CodeIcon className="mr-2 h-5 w-5 text-campus-purple" />
            Code Editor
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {lastSaved && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[300px] font-mono text-sm p-4 bg-[#1e1e1e] text-white rounded-md"
            placeholder="Write your code here..."
          />
        </div>
        
        <div className="bg-gray-900 text-white p-4 rounded-md min-h-[100px] font-mono text-sm whitespace-pre-wrap">
          <div className="text-gray-400 text-xs mb-2">Output:</div>
          {isExecuting ? (
            <div className="flex items-center text-gray-400">
              <div className="animate-spin mr-2">⏳</div>
              Executing code...
            </div>
          ) : output ? (
            output
          ) : (
            <span className="text-gray-400">Code execution results will appear here</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            onClick={handleSaveCode} 
            variant="outline" 
            disabled={isSaving}
            className="flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
        <Button 
          onClick={handleExecuteCode} 
          disabled={isExecuting}
          className="bg-campus-purple hover:bg-campus-purple/90"
        >
          <Play className="h-4 w-4 mr-2" />
          {isExecuting ? "Executing..." : "Run Code"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeEditor;
