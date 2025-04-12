
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Loader2, 
  Save, 
  Download, 
  Copy, 
  CheckCircle2, 
  XCircle,
  Zap,
  RotateCcw,
  MessageSquare,
  Users,
  MoveRight,
  Bot,
  AlertCircle,
  CheckSquare,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

interface SmartCodeEditorProps {
  defaultLanguage?: string;
  defaultCode?: string;
  collaborative?: boolean;
}

const SmartCodeEditor: React.FC<SmartCodeEditorProps> = ({ 
  defaultLanguage = 'python', 
  defaultCode = '# Write your code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
  collaborative = false,
}) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [showingSuggestion, setShowingSuggestion] = useState(false);
  const [codeReview, setCodeReview] = useState<Array<{type: string, message: string, line: number}>>([]);
  const [showCodeReview, setShowCodeReview] = useState(false);
  const [collaborators, setCollaborators] = useState(collaborative ? 2 : 0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'javascript', label: 'JavaScript' },
  ];

  const languageDefaults = {
    python: '# Write your code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
    javascript: '// Write your code here\n\nfunction main() {\n    console.log("Hello, World!");\n}\n\nmain();',
  };

  // Python code suggestions based on what the user is typing
  const pythonSuggestions = {
    'for': 'for i in range(10):\n    print(i)',
    'def': 'def function_name(parameters):\n    """Docstring"""\n    # Function body\n    return',
    'class': 'class ClassName:\n    """Class docstring"""\n    \n    def __init__(self, parameters):\n        # Initialize attributes\n        pass\n    \n    def method_name(self, parameters):\n        # Method body\n        pass',
    'if': 'if condition:\n    # if block\nelif condition:\n    # elif block\nelse:\n    # else block',
    'import': 'import module_name\nfrom module_name import function, Class, variable',
    'try': 'try:\n    # code that might raise an exception\nexcept ExceptionType as e:\n    # handle the exception\nfinally:\n    # code that will run no matter what',
    'with': 'with open("filename.txt", "r") as file:\n    content = file.read()',
    'list': 'my_list = [1, 2, 3, 4, 5]\nfor item in my_list:\n    print(item)',
  };

  // JavaScript code suggestions
  const javascriptSuggestions = {
    'function': 'function functionName(parameters) {\n    // Function body\n    return;\n}',
    'const': 'const variableName = value;',
    'let': 'let variableName = value;',
    'for': 'for (let i = 0; i < array.length; i++) {\n    console.log(array[i]);\n}',
    'if': 'if (condition) {\n    // if block\n} else if (condition) {\n    // else if block\n} else {\n    // else block\n}',
    'try': 'try {\n    // code that might throw an error\n} catch (error) {\n    // handle the error\n} finally {\n    // code that will run no matter what\n}',
    'class': 'class ClassName {\n    constructor(parameters) {\n        // Initialize properties\n    }\n    \n    methodName(parameters) {\n        // Method body\n    }\n}',
    'import': 'import { named } from "module-name";\nimport defaultExport from "module-name";',
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(languageDefaults[value as keyof typeof languageDefaults]);
    setSuggestion(null);
    setShowingSuggestion(false);
    setCodeReview([]);
    setShowCodeReview(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    if (textareaRef.current) {
      const cursorPos = textareaRef.current.selectionStart;
      setCursorPosition(cursorPos);
      
      // Get the current line and word the cursor is on
      const beforeCursor = newCode.substring(0, cursorPos);
      const lines = beforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      const words = currentLine.trim().split(' ');
      const currentWord = words[words.length - 1];
      
      // Check if there's a suggestion for this word
      if (language === 'python' && pythonSuggestions[currentWord]) {
        setSuggestion(pythonSuggestions[currentWord]);
      } else if (language === 'javascript' && javascriptSuggestions[currentWord]) {
        setSuggestion(javascriptSuggestions[currentWord]);
      } else {
        setSuggestion(null);
      }
    }
  };

  const handleAcceptSuggestion = () => {
    if (suggestion && textareaRef.current) {
      const beforeCursor = code.substring(0, cursorPosition);
      const afterCursor = code.substring(cursorPosition);
      
      const lines = beforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      const lastWord = currentLine.trim().split(' ').pop() || '';
      
      // Remove the trigger word and replace with the suggestion
      const beforeWithoutTrigger = beforeCursor.substring(0, beforeCursor.length - lastWord.length);
      const newCode = beforeWithoutTrigger + suggestion + afterCursor;
      
      setCode(newCode);
      setSuggestion(null);
      toast.success("Suggestion applied!");
    }
  };

  const handleRejectSuggestion = () => {
    setSuggestion(null);
    toast("Suggestion dismissed", { 
      description: "Continue coding as you were" 
    });
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution with a delay
    setTimeout(() => {
      if (code.includes('print') || code.includes('System.out') || code.includes('console.log') || code.includes('cout')) {
        setOutput('Hello, World!\n\nProgram executed successfully.');
      } else {
        setOutput('Program executed, but no output was generated. Did you forget to include a print statement?');
      }
      setIsRunning(false);
      toast.success('Code executed successfully');
      
      // Trigger code review after execution
      handleCodeReview();
    }, 1500);
  };

  const handleCodeReview = () => {
    setShowCodeReview(true);
    
    // Simulate AI code review with sample feedback
    const reviews = [];
    
    const lines = code.split('\n');
    
    // Check for missing docstrings in Python
    if (language === 'python' && code.includes('def ') && !code.includes('"""')) {
      const defLineIndex = lines.findIndex(line => line.trim().startsWith('def ')) + 1;
      reviews.push({
        type: 'suggestion',
        message: 'Consider adding docstrings to your functions for better documentation',
        line: defLineIndex
      });
    }
    
    // Check for unused variables or imports
    if (language === 'python' && code.includes('import ')) {
      const importLineIndex = lines.findIndex(line => line.trim().startsWith('import ')) + 1;
      if (!code.includes('pandas') && code.includes('import pandas')) {
        reviews.push({
          type: 'warning',
          message: 'Unused import: pandas is imported but never used',
          line: importLineIndex
        });
      }
    }
    
    // Check for code style
    if (language === 'python' && code.includes('  ') && code.includes('    ')) {
      reviews.push({
        type: 'warning',
        message: 'Inconsistent indentation: mix of 2 and 4 spaces detected',
        line: 2
      });
    }
    
    // Check for best practices
    if (language === 'javascript' && code.includes('var ')) {
      const varLineIndex = lines.findIndex(line => line.trim().includes('var ')) + 1;
      reviews.push({
        type: 'suggestion',
        message: 'Consider using "let" or "const" instead of "var" for better scoping',
        line: varLineIndex
      });
    }
    
    // Generic positive feedback
    reviews.push({
      type: 'positive',
      message: 'Good job on code organization and readability!',
      line: 1
    });
    
    setCodeReview(reviews);
  };

  const handleSaveCode = () => {
    // Simulate saving code
    setTimeout(() => {
      toast.success('Code saved successfully');
    }, 500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Code downloaded');
  };

  const handleCollaborative = () => {
    toast({
      title: "Collaborative Mode",
      description: collaborative ? "You're already in a collaborative session" : "This would initiate a collaborative coding session in a real implementation",
    });
  };

  // Simulate someone joining/leaving the collaborative session
  useEffect(() => {
    if (collaborative) {
      const timer = setInterval(() => {
        setCollaborators(prev => {
          const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          const newValue = Math.max(1, prev + change); // Always at least 1 collaborator (the user)
          
          if (newValue !== prev) {
            if (change > 0) {
              toast.info("A new collaborator has joined the session");
            } else if (change < 0) {
              toast.info("A collaborator has left the session");
            }
          }
          
          return newValue;
        });
      }, 15000); // Check every 15 seconds
      
      return () => clearInterval(timer);
    }
  }, [collaborative]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {collaborative && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-green-100 text-green-700 flex items-center gap-1 px-2 py-1 h-7">
                    <Users className="h-3 w-3" />
                    <span>{collaborators} online</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Collaborative mode active</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveCode}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadCode}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          
          {!collaborative && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCollaborative}
              className="gradient-blue text-white border-none"
            >
              <Users className="mr-2 h-4 w-4" />
              Collaborate
            </Button>
          )}
          
          <Button 
            size="sm" 
            onClick={handleRunCode} 
            disabled={isRunning}
            className="gradient-purple"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
        <div className="relative p-0">
          <textarea
            ref={textareaRef}
            className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none outline-none border-0 focus:ring-0"
            value={code}
            onChange={handleCodeChange}
            spellCheck="false"
          />
          
          {suggestion && (
            <div className="absolute bottom-4 right-4 max-w-xs animate-fade-in">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm flex items-center">
                    <Bot className="h-4 w-4 mr-2 text-campus-blue" />
                    <span>AI Suggestion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <pre className="text-xs whitespace-pre-wrap text-blue-700 font-mono">
                    {suggestion}
                  </pre>
                </CardContent>
                <CardFooter className="flex justify-end py-2 px-4 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 px-2 text-red-500 hover:text-red-700"
                    onClick={handleRejectSuggestion}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Dismiss
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 bg-campus-blue hover:bg-campus-blue/90"
                    onClick={handleAcceptSuggestion}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {showCodeReview && (
            <div className="absolute top-4 right-4 max-w-xs z-10 animate-fade-in">
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="py-2 px-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-campus-purple" />
                    <span>Code Review</span>
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0" 
                    onClick={() => setShowCodeReview(false)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="py-2 px-4 max-h-[250px] overflow-y-auto">
                  {codeReview.length > 0 ? (
                    <div className="space-y-2">
                      {codeReview.map((review, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          {review.type === 'warning' && (
                            <AlertCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                          )}
                          {review.type === 'suggestion' && (
                            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                          )}
                          {review.type === 'positive' && (
                            <CheckSquare className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={
                              review.type === 'warning' ? 'text-orange-700' : 
                              review.type === 'suggestion' ? 'text-blue-700' : 
                              'text-green-700'
                            }>
                              {review.message}
                            </p>
                            <p className="text-gray-500">Line {review.line}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No issues found in your code!</p>
                  )}
                </CardContent>
                <CardFooter className="py-2 px-4">
                  <Button 
                    size="sm" 
                    className="w-full h-7 bg-campus-purple hover:bg-campus-purple/90"
                    onClick={handleCodeReview}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Refresh Review
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
        
        <div className="p-0 relative">
          <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white p-2 flex justify-between items-center">
            <span className="text-xs">Program Output</span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 text-xs text-gray-300 hover:text-white"
              onClick={() => setShowCodeReview(!showCodeReview)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              {showCodeReview ? 'Hide' : 'Show'} Code Review
            </Button>
          </div>
          
          <div className="h-[400px] pt-10 font-mono text-sm bg-gray-900 text-gray-100 overflow-auto whitespace-pre-wrap">
            <div className="p-4">
              {isRunning ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-campus-purple" />
                  <span className="ml-2">Running code...</span>
                </div>
              ) : output ? (
                output
              ) : (
                <div className="text-gray-500 h-full flex items-center justify-center">
                  <span>Output will appear here after running the code</span>
                </div>
              )}
            </div>
          </div>
          
          {collaborative && (
            <div className="absolute bottom-4 right-4 left-4 bg-blue-900/70 backdrop-blur-sm rounded-md p-3 text-white animate-fade-in flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-200" />
                <span className="text-sm">Live Collaborative Session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <Avatar className="w-6 h-6 border-2 border-blue-900 rounded-full bg-red-500">JD</Avatar>
                  <Avatar className="w-6 h-6 border-2 border-blue-900 rounded-full bg-green-500">AS</Avatar>
                  {collaborators > 2 && (
                    <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-blue-900 flex items-center justify-center text-xs">
                      +{collaborators - 2}
                    </div>
                  )}
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-blue-200 hover:text-white">
                  <MessageSquare className="h-3 w-3 mr-1" /> Chat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for Avatar since we didn't import it
const Avatar = ({ children, className }) => (
  <div className={`flex items-center justify-center text-white font-semibold ${className}`}>
    {children}
  </div>
);

export default SmartCodeEditor;
