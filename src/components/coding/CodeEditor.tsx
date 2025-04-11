
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Loader2, Save, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultCode?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  defaultLanguage = 'python', 
  defaultCode = '# Write your code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()' 
}) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

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

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(languageDefaults[value as keyof typeof languageDefaults]);
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
        <div className="p-0">
          <textarea
            className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none outline-none border-0 focus:ring-0"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
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
