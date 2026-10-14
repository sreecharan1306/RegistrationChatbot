'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'bot' | 'system';
  message: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
  initialMessage?: { role: string; message: string } | null;
  showFormMessage?: boolean;
  backendOnline?: boolean;
  backendUrl?: string;
}

const QUERY_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_QUERY_TIMEOUT_MS) || 90000; // 90s default for Colab/Llama 2 inference

const DEMO_RESPONSES = [
  "I can help you with property registration. What would you like to know?",
  "For stamp duty calculations, I need to know the property value. What's the estimated value?",
  "The registration process typically involves document verification and official signing.",
  "Stamp duty is calculated based on property value and location. Would you like a quote?",
  "I can guide you through the entire process. What's your first question?",
  "Yes, we can help with all registration requirements. What can I assist with?",
];

export function ChatInterface({ onClose, initialMessage, showFormMessage, backendOnline, backendUrl }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(!backendUrl || !backendOnline);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeControllerRef = useRef<AbortController | null>(null);

  // Sync offline mode if backend props change
  useEffect(() => {
    setIsOfflineMode(!backendUrl || !backendOnline);
  }, [backendUrl, backendOnline]);

  // Abort any ongoing request on unmount
  useEffect(() => {
    return () => {
      if (activeControllerRef.current) {
        activeControllerRef.current.abort('unmounted');
      }
    };
  }, []);

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
      if (!backendOnline || isOfflineMode) {
        initialMessages.push({
          role: 'system',
          message: '⚠️ The backend is currently offline. You can still explore the assistant using demo responses.',
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

    // Cancel any previous in-flight request
    if (activeControllerRef.current) {
      activeControllerRef.current.abort('superseded');
    }

    const controller = new AbortController();
    activeControllerRef.current = controller;
    let isTimedOut = false;

    try {
      if (backendUrl && !isOfflineMode) {
        const timeoutId = setTimeout(() => {
          isTimedOut = true;
          controller.abort(new DOMException('Query request timed out', 'TimeoutError'));
        }, QUERY_TIMEOUT_MS);

        const res = await fetch(`${backendUrl}/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            question: userMessage.message,
            query: userMessage.message,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            const botReply =
              data.response || data.answer || data.message || data.text || JSON.stringify(data);
            setMessages((prev) => [...prev, { role: 'bot', message: botReply }]);
          } else {
            const text = await res.text();
            setMessages((prev) => [...prev, { role: 'bot', message: text || 'Received empty response from backend.' }]);
          }
        } else {
          let errDetail = `Status ${res.status}`;
          try {
            const errText = await res.text();
            if (errText && !errText.includes('<!DOCTYPE html>')) {
              errDetail = errText.slice(0, 100);
            }
          } catch {
            // ignore
          }
          throw new Error(`Backend responded with ${errDetail}`);
        }
      } else {
        // Offline / demo mode — simulate responsive typing delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        const randomResponse =
          DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
        setMessages((prev) => [...prev, { role: 'bot', message: randomResponse }]);
      }
    } catch (error: any) {
      if (controller.signal.reason === 'unmounted' || controller.signal.reason === 'superseded') {
        return;
      }

      // Automatically switch to offline mode so subsequent messages respond instantly
      setIsOfflineMode(true);

      const isTimeout =
        isTimedOut ||
        error?.name === 'TimeoutError' ||
        error?.name === 'AbortError' ||
        controller.signal.aborted;

      if (isTimeout) {
        console.warn(`Chat query timed out after ${QUERY_TIMEOUT_MS / 1000}s`);
      } else {
        console.warn('Backend unavailable, switched to offline demo mode:', error?.message || error);
      }

      const errorPrefix = isTimeout
        ? '⏱️ Request timed out (backend is busy or offline).'
        : '⚠️ Backend is offline.';
      const randomResponse =
        DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      setMessages((prev) => [
        ...prev,
        { role: 'bot', message: `${errorPrefix} Switched to demo mode: ${randomResponse}` },
      ]);
    } finally {
      if (activeControllerRef.current === controller) {
        activeControllerRef.current = null;
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background rounded-t-2xl">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="font-semibold text-foreground text-sm">RegInfo Assistant</h3>
          <p className="text-xs text-muted-foreground">{!isOfflineMode ? 'Ready' : 'Offline Mode (Demo)'}</p>
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
