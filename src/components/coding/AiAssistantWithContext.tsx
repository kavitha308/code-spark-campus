
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Send, Sparkles, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AiAssistantWithContext = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m your AI coding assistant. How can I help you with your code today?'
    }
  ]);

  // Function to generate contextual responses based on user prompts
  const generateContextualResponse = (userPrompt: string): string => {
    const lowerPrompt = userPrompt.toLowerCase();
    
    // Check for different categories of questions
    if (lowerPrompt.includes('sort') || lowerPrompt.includes('sorting algorithm')) {
      return "Here's a simple implementation of quick sort in Python:\n\n```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n```\n\nYou can call it like this: `sorted_array = quick_sort(your_array)`";
    } 
    else if (lowerPrompt.includes('array') || lowerPrompt.includes('list')) {
      return "Arrays are fundamental data structures that store elements in contiguous memory locations. In most programming languages, you can perform operations like adding elements, removing elements, sorting, and searching.\n\nHere's a common array operation example in Python:\n\n```python\n# Creating an array\narray = [1, 2, 3, 4, 5]\n\n# Accessing elements\nfirst_element = array[0]  # 1\n\n# Adding elements\narray.append(6)  # [1, 2, 3, 4, 5, 6]\n\n# Removing elements\narray.pop()  # Removes the last element\n```";
    }
    else if (lowerPrompt.includes('error') || lowerPrompt.includes('bug') || lowerPrompt.includes('fix')) {
      return "Without seeing your specific code, I can suggest some common debugging strategies:\n\n1. Check for syntax errors (missing parentheses, semicolons, etc.)\n2. Verify variable scopes and declarations\n3. Add print/console.log statements to trace execution flow\n4. Use a debugger to step through your code\n5. Look for off-by-one errors in loops\n\nCould you share the specific error message or code snippet you're having trouble with?";
    }
    else if (lowerPrompt.includes('function') || lowerPrompt.includes('method')) {
      return "Functions are reusable blocks of code that perform specific tasks. Here's how you can define and use functions in different languages:\n\n```python\n# Python function\ndef greet(name):\n    return f\"Hello, {name}!\"\n\n# Call the function\ngreeting = greet(\"World\")\n```\n\n```javascript\n// JavaScript function\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\n// Call the function\nlet greeting = greet(\"World\");\n```";
    }
    else if (lowerPrompt.includes('recursion')) {
      return "Recursion is when a function calls itself to solve a problem. It's useful for problems that can be broken down into smaller, similar subproblems.\n\nHere's a classic example using factorial calculation:\n\n```python\ndef factorial(n):\n    # Base case\n    if n <= 1:\n        return 1\n    # Recursive case\n    return n * factorial(n-1)\n\n# Example: 5! = 5 * 4 * 3 * 2 * 1 = 120\nprint(factorial(5))  # Output: 120\n```\n\nAlways remember to include a base case to prevent infinite recursion!";
    }
    else if (lowerPrompt.includes('optimize') || lowerPrompt.includes('performance')) {
      return "Here are some general code optimization tips:\n\n1. Use appropriate data structures (e.g., hashmaps for lookup operations)\n2. Minimize unnecessary calculations inside loops\n3. Consider time and space complexity of algorithms\n4. Use built-in functions which are often optimized\n5. Profile your code to identify bottlenecks\n\nFor specific optimizations, I'd need to see your code context.";
    }
    else if (lowerPrompt.includes('challenge') || lowerPrompt.includes('problem')) {
      return "Here's a coding challenge for you to practice:\n\nFind the two numbers in an array that sum to a specific target.\n\n```python\ndef two_sum(nums, target):\n    # Create a dictionary to store numbers and their indices\n    num_dict = {}\n    \n    for i, num in enumerate(nums):\n        # Calculate the complement\n        complement = target - num\n        \n        # Check if complement exists in dictionary\n        if complement in num_dict:\n            return [num_dict[complement], i]\n        \n        # Add current number to dictionary\n        num_dict[num] = i\n    \n    return None\n\n# Example\nnums = [2, 7, 11, 15]\ntarget = 9\nprint(two_sum(nums, target))  # Output: [0, 1] because nums[0] + nums[1] = 2 + 7 = 9\n```\n\nTry modifying this to solve similar problems!";
    }
    else if (lowerPrompt.includes('python') || lowerPrompt.includes('java') || 
             lowerPrompt.includes('javascript') || lowerPrompt.includes('cpp')) {
      return "I see you're interested in programming languages! Each language has its strengths:\n\n- Python: Great for data science, AI, scripting, and rapid development\n- Java: Excellent for enterprise applications, Android development\n- JavaScript: Essential for web development, both frontend and backend\n- C++: Powerful for system programming, game development, and performance-critical applications\n\nDo you have a specific question about any of these languages?";
    }
    else if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi ') || lowerPrompt === 'hi') {
      return "Hello there! I'm your AI coding assistant. I can help you with programming concepts, debugging code, optimizing algorithms, and more. What would you like to work on today?";
    }
    else if (lowerPrompt.includes('thank')) {
      return "You're welcome! I'm glad I could help. Feel free to ask if you have any other questions about your code or programming concepts!";
    }
    else {
      return "That's an interesting question about coding! To give you the best assistance, could you provide more details or context about what you're working on? I can help with algorithm explanations, debugging code, suggesting optimizations, or discussing programming concepts.";
    }
  };

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setIsGenerating(true);
    
    // Generate contextual response after a delay
    setTimeout(() => {
      const response = generateContextualResponse(prompt);
      setConversation(prev => [...prev, { role: 'ai', content: response }]);
      setIsGenerating(false);
      setPrompt('');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 pt-4 px-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-campus-purple" />
            <CardTitle className="text-lg">AI Coding Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {conversation.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      {message.role === 'ai' ? (
                        <>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-campus-purple text-white">
                            <Sparkles className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            <Code className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div 
                      className={`rounded-lg px-4 py-2 text-sm ${
                        message.role === 'user' 
                          ? 'bg-campus-purple text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: message.content.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-200 p-2 rounded mt-2 mb-2 overflow-x-auto">$1</pre>') }} />
                    </div>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-campus-purple text-white">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-900">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-campus-purple rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-campus-purple rounded-full animate-bounce delay-75"></div>
                        <div className="h-2 w-2 bg-campus-purple rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <Separator />
          
          <div className="p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask the AI for coding help..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[40px] resize-none"
                rows={1}
              />
              <Button 
                size="icon" 
                onClick={handleSendPrompt} 
                disabled={isGenerating || !prompt.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              AI can help with debugging, code optimization, and learning new concepts.
            </p>
          </div>
        </>
      )}
    </Card>
  );
};

export default AiAssistantWithContext;
