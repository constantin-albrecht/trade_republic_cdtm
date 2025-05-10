
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
import { Send, Bot } from 'lucide-react';
import { sendMessageToChatGPT } from '@/hooks/gpt';
import { toast } from "@/hooks/use-toast";

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

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setLoading(true);

    // Prepare messages for OpenAI format
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add the new user message
    formattedMessages.push({
      role: 'user',
      content: userMessage.content
    });

    // Add system message to guide the AI
    formattedMessages.unshift({
      role: 'system',
      content: 'You are a helpful financial assistant. Provide concise, clear advice on financial matters. Do not make up information or give financial advice that could be harmful.'
    });

    try {
      // Send to ChatGPT API
      const botResponse = await sendMessageToChatGPT(formattedMessages);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the financial assistant.",
        variant: "destructive",
      });
      setMessages(prevMessages => [
        ...prevMessages, 
        { id: `error-${Date.now()}`, content: 'Sorry, I had trouble processing that request. Please try again.', sender: 'bot', timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          Financial Assistant
        </CardTitle>
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
          {loading && (
            <div className="bg-secondary self-start max-w-[75%] rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
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
            disabled={loading}
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
