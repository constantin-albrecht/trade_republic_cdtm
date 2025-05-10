
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your financial assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you analyze your spending patterns.",
        "Would you like some advice on how to optimize your budget?",
        "Based on your recent transactions, you might want to consider reducing your entertainment expenses.",
        "I notice your savings rate is below your target. Would you like some tips to improve it?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Financial Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 h-60 overflow-y-auto mb-4 p-2">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "max-w-[75%] rounded-lg p-3",
                message.sender === 'user' 
                  ? "bg-primary text-white self-end"
                  : "bg-secondary self-start"
              )}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your finances..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;
