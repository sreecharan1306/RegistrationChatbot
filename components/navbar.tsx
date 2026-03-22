'use client';

import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 max-w-7xl flex h-16 md:h-20 items-center justify-between">
        {/* Logo and Brand */}
        <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex flex-col items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg">
            <span className="text-sm md:text-base leading-none">RI</span>
            <span className="text-xs leading-none">LLM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-base md:text-lg">RegInfo</span>
            <span className="text-xs text-muted-foreground leading-none">Registration Assistant</span>
          </div>
        </a>

        {/* Right side - Contact CTA */}
        <Button
          size="sm"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
        >
          Contact
        </Button>
      </div>
    </nav>
  );
}
