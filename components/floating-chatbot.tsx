'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, AlertCircle } from 'lucide-react';
import { ChatInterface } from './chat-interface';
import { Button } from './ui/button';

interface ChatMessage {
  role: 'system' | 'user' | 'bot';
  message: string;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUserData, setHasUserData] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline'>('offline');
  const [initialMessage, setInitialMessage] = useState<ChatMessage | null>(null);

  useEffect(() => {
    // Check if user has submitted form data
    const userData = localStorage.getItem('reginfo_current_user');
    setHasUserData(!!userData);

    // Check backend status
    const checkBackend = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
          method: 'GET',
          timeout: 5000,
        }).catch(() => null);
        setBackendStatus(response?.ok ? 'online' : 'offline');
      } catch {
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  const handleOpenClick = () => {
    if (!hasUserData) {
      // Open chat and show form requirement message
      setInitialMessage({
        role: 'system',
        message: 'Please fill out the "Get Started" form below to start using the chatbot. This helps us collect your data and provide better assistance.',
      });
      setIsOpen(true);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpenClick}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-[float_3s_ease-in-out_infinite] cursor-pointer"
        aria-label="Open chat"
        title={hasUserData ? 'Chat with RegInfo' : 'Fill form to chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[500px] rounded-2xl shadow-2xl overflow-hidden bg-card border border-border flex flex-col">
          {/* Backend Status Warning - Only when form is submitted */}
          {hasUserData && backendStatus === 'offline' && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-3 flex items-gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">Backend Offline</p>
                <p className="text-xs text-yellow-700">
                  The assistant is currently offline. Check out our{' '}
                  <a
                    href="#demo-video"
                    className="underline hover:no-underline"
                  >
                    demo video
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-auto">
            <ChatInterface 
              onClose={() => setIsOpen(false)} 
              initialMessage={initialMessage}
              showFormMessage={!hasUserData}
              backendOnline={backendStatus === 'online'}
            />
          </div>
        </div>
      )}
    </>
  );
}
