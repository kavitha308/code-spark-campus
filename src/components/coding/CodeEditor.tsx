
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, Loader2, Save, Download, Copy, Check, X, AlertCircle, Info, HelpCircle, LightbulbIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultCode?: string;
}

// Sample suggestions for the smart review feature
const suggestionsDatabase = {
  python: [
    {
      pattern: /for\s+\w+\s+in\s+range\(\w+\):/,
      suggestion: "Consider using list comprehension for more concise code",
      replacement: "# Example: [x for x in range(n)]",
      type: "performance"
    },
    {
      pattern: /if\s+\w+\s+==\s+True:/,
      suggestion: "Simplify your condition by directly using the variable",
      replacement: "if variable:",
      type: "style"
    },
    {
      pattern: /print\(/,
      suggestion: "Remember to use f-strings for string formatting in Python 3.6+",
      replacement: "print(f\"Example: {variable}\")",
      type: "style"
    },
    {
      pattern: /for\s+i\s+in\s+range\(len\(\w+\)\):/,
      suggestion: "Consider using enumerate() for cleaner iteration with index",
      replacement: "for i, value in enumerate(array):",
      type: "style"
    },
    {
      pattern: /^\s*except:/m,
      suggestion: "Avoid bare except clauses. Specify the exceptions you're catching",
      replacement: "except (ExceptionType1, ExceptionType2):",
      type: "warning"
    }
  ],
  javascript: [
    {
      pattern: /var\s+\w+/,
      suggestion: "Use let or const instead of var for better scoping",
      replacement: "const variableName = value;",
      type: "style"
    },
    {
      pattern: /for\s*\(\s*let\s+i\s*=\s*0;\s*i\s*<\s*\w+\.length;\s*i\+\+\s*\)/,
      suggestion: "Consider using forEach, map, or for...of for array iteration",
      replacement: "array.forEach((item, index) => { /* code */ })",
      type: "style"
    },
    {
      pattern: /\w+\s*==\s*\w+/,
      suggestion: "Use === instead of == for strict equality comparison",
      replacement: "a === b",
      type: "warning"
    },
    {
      pattern: /setTimeout\(\s*function\s*\(\)/,
      suggestion: "Consider using arrow functions for cleaner syntax",
      replacement: "setTimeout(() => { /* code */ }, delay)",
      type: "style"
    },
    {
      pattern: /console\.log\(/,
      suggestion: "Remember to remove console.log statements before production",
      replacement: null,
      type: "info"
    }
  ],
  java: [
    {
      pattern: /for\s*\(\s*int\s+i\s*=\s*0;\s*i\s*<\s*\w+\.length;\s*i\+\+\s*\)/,
      suggestion: "Consider using enhanced for loop for array/collection iteration",
      replacement: "for (Type item : collection) { /* code */ }",
      type: "style"
    },
    {
      pattern: /if\s*\(\s*\w+\s*==\s*null\s*\)/,
      suggestion: "Use Objects.isNull() or direct null check for readability",
      replacement: "if (Objects.isNull(object)) or if (object == null)",
      type: "style"
    },
    {
      pattern: /new\s+ArrayList\s*\(\s*\)/,
      suggestion: "Consider using diamond operator <> for clearer generic instantiation",
      replacement: "new ArrayList<>()",
      type: "style"
    },
    {
      pattern: /catch\s*\(\s*Exception\s+\w+\s*\)/,
      suggestion: "Catch specific exceptions rather than generic Exception",
      replacement: "catch (SpecificException e) { /* code */ }",
      type: "warning"
    },
    {
      pattern: /String\s+\w+\s*\+=/,
      suggestion: "Consider using StringBuilder for string concatenation in loops",
      replacement: "StringBuilder sb = new StringBuilder(); sb.append(string);",
      type: "performance"
    }
  ],
  cpp: [
    {
      pattern: /using\s+namespace\s+std;/,
      suggestion: "Avoid 'using namespace std;' to prevent namespace pollution",
      replacement: "Use std:: prefix instead, e.g., std::cout, std::vector",
      type: "style"
    },
    {
      pattern: /for\s*\(\s*int\s+i\s*=\s*0;\s*i\s*<\s*\w+\.size\(\);\s*i\+\+\s*\)/,
      suggestion: "Consider using range-based for loop for cleaner iteration",
      replacement: "for (const auto& element : container) { /* code */ }",
      type: "style"
    },
    {
      pattern: /new\s+\w+/,
      suggestion: "Consider using smart pointers instead of raw pointers",
      replacement: "std::unique_ptr<Type> ptr = std::make_unique<Type>();",
      type: "warning"
    },
    {
      pattern: /std::cout\s*<<\s*/,
      suggestion: "Remember to use std::endl or '\\n' at the end of output statements",
      replacement: "std::cout << \"Output\" << std::endl;",
      type: "info"
    },
    {
      pattern: /char\s+\w+\[\d+\]/,
      suggestion: "Consider using std::string instead of C-style character arrays",
      replacement: "std::string str;",
      type: "style"
    }
  ]
};

interface Suggestion {
  index: number;
  line: number;
  suggestion: string;
  replacement: string | null;
  type: string;
  accepted: boolean | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  defaultLanguage = 'python', 
  defaultCode = '# Write your code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()' 
}) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];

  const languageDefaults = {
    python: '# Write your code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
    javascript: '// Write your code here\n\nfunction main() {\n    console.log("Hello, World!");\n}\n\nmain();',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(languageDefaults[value as keyof typeof languageDefaults]);
    setSuggestions([]);
  };

  // Function to analyze code and generate suggestions
  useEffect(() => {
    if (!code || !showSuggestions) return;
    
    const timer = setTimeout(() => {
      const currentLanguageSuggestions = suggestionsDatabase[language as keyof typeof suggestionsDatabase] || [];
      const lines = code.split('\n');
      const newSuggestions: Suggestion[] = [];
      
      lines.forEach((line, lineIndex) => {
        currentLanguageSuggestions.forEach(suggestion => {
          if (suggestion.pattern.test(line)) {
            // Check if this suggestion is already in the list for this line
            if (!newSuggestions.some(s => s.line === lineIndex && s.suggestion === suggestion.suggestion)) {
              newSuggestions.push({
                index: newSuggestions.length,
                line: lineIndex,
                suggestion: suggestion.suggestion,
                replacement: suggestion.replacement,
                type: suggestion.type,
                accepted: null
              });
            }
          }
        });
      });
      
      setSuggestions(newSuggestions);
    }, 1000); // Delay analysis to avoid too frequent updates
    
    return () => clearTimeout(timer);
  }, [code, language, showSuggestions]);

  const handleAcceptSuggestion = (suggestionIndex: number) => {
    const suggestion = suggestions[suggestionIndex];
    if (suggestion.replacement) {
      const lines = code.split('\n');
      // We're not actually replacing the code, just showing that we accepted the suggestion
      setSuggestions(suggestions.map((s, i) => 
        i === suggestionIndex ? { ...s, accepted: true } : s
      ));
      toast.success("Suggestion accepted!");
    }
  };

  const handleRejectSuggestion = (suggestionIndex: number) => {
    setSuggestions(suggestions.map((s, i) => 
      i === suggestionIndex ? { ...s, accepted: false } : s
    ));
    toast.info("Suggestion rejected");
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution with a delay
    setTimeout(() => {
      if (language === 'python') {
        setOutput('Hello, World!\n\nProgram executed successfully.');
      } else if (language === 'java') {
        setOutput('Hello, World!\n\nProgram executed successfully.');
      } else if (language === 'cpp') {
        setOutput('Hello, World!\n\nProgram executed successfully.');
      } else if (language === 'javascript') {
        setOutput('Hello, World!\n\nProgram executed successfully.');
      }
      setIsRunning(false);
      toast.success('Code executed successfully');
    }, 1500);
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

  // Get suggestion type icon
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'performance':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'style':
        return <Info className="h-4 w-4 text-purple-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  // Filter out rejected suggestions
  const activeSuggestions = suggestions.filter(s => s.accepted !== false);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  <LightbulbIcon className={`mr-2 h-4 w-4 ${showSuggestions ? 'text-yellow-500' : 'text-gray-400'}`} />
                  Smart Suggestions
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showSuggestions ? 'Disable real-time code suggestions' : 'Enable real-time code suggestions'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
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
        <div className="p-0 relative">
          <textarea
            className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none outline-none border-0 focus:ring-0"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
          
          {/* Smart suggestions overlay */}
          {showSuggestions && activeSuggestions.length > 0 && (
            <div className="absolute right-4 top-4 w-72 bg-white rounded-lg shadow-lg border p-3 z-10">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-sm">Smart Suggestions</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activeSuggestions.length} {activeSuggestions.length === 1 ? 'suggestion' : 'suggestions'}
                </Badge>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {activeSuggestions.map((s, i) => (
                  <div 
                    key={i} 
                    className={`p-2 rounded-md text-sm ${
                      s.accepted === true ? 'bg-green-50 border border-green-200' : 
                      'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {getSuggestionIcon(s.type)}
                      <div className="flex-1">
                        <div className="font-medium text-xs mb-1">Line {s.line + 1}</div>
                        <p className="text-xs">{s.suggestion}</p>
                        {s.replacement && !s.accepted && (
                          <div className="mt-1 p-1 bg-gray-100 rounded text-xs font-mono">
                            {s.replacement}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {s.accepted === null && (
                      <div className="flex justify-end gap-1 mt-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleRejectSuggestion(s.index)}
                        >
                          <X className="h-3 w-3 mr-1" /> Reject
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs bg-green-50 hover:bg-green-100 text-green-700"
                          onClick={() => handleAcceptSuggestion(s.index)}
                        >
                          <Check className="h-3 w-3 mr-1" /> Apply
                        </Button>
                      </div>
                    )}
                    
                    {s.accepted === true && (
                      <div className="flex justify-end mt-1 text-green-600 text-xs">
                        <Check className="h-3 w-3 mr-1" /> Applied
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-0">
          <div className="h-[400px] p-4 font-mono text-sm bg-gray-900 text-gray-100 overflow-auto whitespace-pre-wrap">
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
      </div>
    </div>
  );
};

export default CodeEditor;
