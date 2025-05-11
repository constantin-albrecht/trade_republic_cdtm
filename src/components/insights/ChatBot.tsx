
import React, { useState, useRef, useEffect } from 'react';
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
    content: "Hello, Thomas! I'm your TradeX Assitant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Modified to only scroll when messages change after user interaction
  useEffect(() => {
    // Only scroll on new messages after the initial load
    if (messages.length > initialMessages.length) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      content: `You are a helpful financial assistant for your client named Thomas. Provide very concise advice on financial matters. It should be maximum 3 sentences. Do not make up information or give financial advice that could be harmful. Do not use any markup, so do not use * or ** for bold or italics for example. Never tell the user a specific stock or asset to buy or sell. Rather help them understand the pros and cons, but always make it clear that the choice is up to them and that you cannot give financial adivce. This is the data about the user's banking transactions, who has a total of 86 transactions between the 1st of April 2024 to the 30th of June 2024. 14 of these are credits, and 72 are debits. Most of them are card transactions, and the second most frequent transactions are of type PAYIN. All of the transactions are in Euros. Most of the transactions are of type money orders, variety stores, and drug stores & pharmacies. The largest credit was of 699.44 Euros done through PAYIN on the 27th of May 2025, and the largest debit was of 392.17 Euros done through CARD on the 25th of May 2024.
      Do not use any markup at all!!! This is very important. You have to always include at least one of the pieces of information about the user's transactions.`
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
          Personal TradeX Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-44 mb-4">
          <div className="flex flex-col space-y-4 p-2">
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
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
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
