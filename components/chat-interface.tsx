'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'bot' | 'system';
  message: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
  initialMessage?: { role: string; message: string } | null;
  showFormMessage?: boolean;
  backendOnline?: boolean;
}

const DEMO_RESPONSES = [
  "I can help you with property registration. What would you like to know?",
  "For stamp duty calculations, I need to know the property value. What's the estimated value?",
  "The registration process typically involves document verification and official signing.",
  "Stamp duty is calculated based on property value and location. Would you like a quote?",
  "I can guide you through the entire process. What's your first question?",
  "Yes, we can help with all registration requirements. What can I assist with?",
];

export function ChatInterface({ onClose, initialMessage, showFormMessage, backendOnline }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    const initialMessages: Message[] = [];

    if (showFormMessage) {
      // User hasn't filled form yet
      initialMessages.push({
        role: 'system',
        message: '📋 Please fill out the "Get Started" form below to start chatting. This helps us collect your data.',
      });
    } else if (initialMessage) {
      // Backend might be offline
      initialMessages.push({
        role: 'system',
        message: initialMessage.message,
      });
      if (!backendOnline) {
        initialMessages.push({
          role: 'system',
          message: '⚠️ The backend is currently offline. Check out the demo video to see how it works. You can still explore the UI.',
        });
      }
    } else {
      // Normal chat greeting
      initialMessages.push({
        role: 'bot',
        message: 'Hello! How can I help you with property registration questions?',
      });
    }

    setMessages(initialMessages);
  }, [showFormMessage, initialMessage, backendOnline]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      message: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const randomResponse =
        DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      const botMessage: Message = {
        role: 'bot',
        message: randomResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col bg-background rounded-t-2xl">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="font-semibold text-foreground text-sm">RegInfo Assistant</h3>
          <p className="text-xs text-muted-foreground">{backendOnline ? 'Ready' : 'Offline Mode'}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-0 h-6 w-6"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : msg.role === 'system'
                  ? 'bg-blue-50 text-blue-900 border border-blue-200 rounded-bl-none'
                  : 'bg-muted text-foreground border border-border rounded-bl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.message}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted px-3 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      {!showFormMessage && (
        <div className="border-t border-border px-4 py-3 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || showFormMessage}
              className="flex-1 text-sm h-8"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim() || showFormMessage}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-8"
            >
              <Send className="w-3 h-3" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
