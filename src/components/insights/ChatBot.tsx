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
import { sendMessageToChatGPT } from '@/hooks/gpt'; // Import the function

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
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add the user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setLoading(true);

    // Send to ChatGPT API
    const updatedMessages = [...messages, userMessage];
    try {
      const botResponse = await sendMessageToChatGPT(updatedMessages);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { id: 'error', content: 'Something went wrong!', sender: 'bot', timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
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
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? "bg-primary text-white self-end"
                  : "bg-secondary self-start"
              }`}
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
          <Button onClick={handleSendMessage} size="icon" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;
