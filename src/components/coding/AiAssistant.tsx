
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send } from "lucide-react";
import { getAssistantResponse, saveAssistantChat } from "@/services/AIAssistantService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AiAssistant = ({ code = "", language = "javascript" }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your coding assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user" as const,
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Save message to database
      await saveAssistantChat(input);
      
      // Get response from AI with code context
      const response = await getAssistantResponse(input, code, language);
      
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant" as const,
        content: response,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in AI Assistant:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Brain className="mr-2 h-5 w-5 text-campus-purple" />
          AI Coding Assistant
        </CardTitle>
        <CardDescription>
          Get help with your code and programming concepts
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-0">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "assistant" ? "" : "flex-row-reverse"}`}>
                  <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-campus-purple" : "bg-gray-500"}`}>
                    {message.role === "assistant" ? (
                      <Brain className="h-4 w-4 text-white" />
                    ) : (
                      <AvatarFallback>U</AvatarFallback>
                    )}
                  </Avatar>
                  <div className={`rounded-lg p-3 text-sm ${
                    message.role === "assistant" ? "bg-muted" : "bg-campus-purple text-white"
                  }`}>
                    <div dangerouslySetInnerHTML={{ 
                      __html: message.content.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-100 p-2 rounded my-2 overflow-x-auto">$1</pre>')
                    }} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-campus-purple">
                    <Brain className="h-4 w-4 text-white" />
                  </Avatar>
                  <div className="rounded-lg p-3 text-sm bg-muted flex items-center">
                    <div className="dot-flashing"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiAssistant;
