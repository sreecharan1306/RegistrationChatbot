'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function FloatingChatbot() {
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    // Check if user has submitted form data (now using sessionStorage per our update)
    const userData = sessionStorage.getItem('reginfo_current_user') || localStorage.getItem('reginfo_current_user');
    setHasUserData(!!userData);
  }, []);

  return (
    <Link href="/chatbot">
      <button
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-[float_3s_ease-in-out_infinite] cursor-pointer"
        aria-label="Open chat"
        title={hasUserData ? 'Chat with RegInfo' : 'Fill form to chat'}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </Link>
  );
}

