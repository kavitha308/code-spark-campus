
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Send, Sparkles, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AiAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [conversation, setConversation] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m your AI coding assistant. How can I help you with your code today?'
    }
  ]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setIsGenerating(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response = '';
      
      if (prompt.toLowerCase().includes('sort')) {
        response = "Here's a simple implementation of quick sort in Python:\n\n```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n```\n\nYou can call it like this: `sorted_array = quick_sort(your_array)`";
      } else if (prompt.toLowerCase().includes('error') || prompt.toLowerCase().includes('bug')) {
        response = "It looks like you might be encountering an issue with your code. Common causes for this type of error include:\n\n1. Incorrect variable scope\n2. Missing return statement\n3. Improper syntax in conditional statements\n\nCould you share the specific error message you're seeing?";
      } else {
        response = "I'd be happy to help with your coding question. Could you provide more details or share the specific code snippet you're working with? This will help me give you more targeted assistance.";
      }
      
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

export default AiAssistant;
