'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/chat-interface';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function ChatbotPage() {
  const [hasUserData, setHasUserData] = useState(false);
  const backendOnline = !!BACKEND_URL;
  const router = useRouter();

  useEffect(() => {
    // Check if user has submitted form data (support both for backwards compatibility)
    const userData = sessionStorage.getItem('reginfo_current_user') || localStorage.getItem('reginfo_current_user');
    setHasUserData(!!userData);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-white/50 backdrop-blur-md sticky top-0 z-10 px-4 h-16 flex items-center">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2 hover:bg-black/5">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            RegInfo Assistant
          </span>
          <div className="w-[100px]" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <div className="w-full max-w-4xl h-[calc(100vh-8rem)] min-h-[500px] border border-primary/20 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {hasUserData && !backendOnline && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-3 text-center">
              <p className="text-sm font-semibold text-yellow-800">Note: Backend is currently offline</p>
              <p className="text-xs text-yellow-700">The assistant may just use demo responses right now.</p>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <ChatInterface 
              onClose={() => router.push('/')} 
              showFormMessage={!hasUserData}
              backendOnline={backendOnline}
              backendUrl={BACKEND_URL}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
