'use client';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onTryDemo: () => void;
  onBookDemo: () => void;
}

export function HeroSection({
  onTryDemo,
  onBookDemo,
}: HeroSectionProps) {

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-40 lg:py-48">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container px-4 max-w-7xl">
        <div className="mx-auto max-w-4xl text-center space-y-8 md:space-y-10">
          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-balance text-primary leading-tight">
            Your AI Assistant for Property Registration & Stamps
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Get instant answers about property registration, stamp duty calculations, required documents, and more from the Telangana Registration & Stamps Department.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-6 md:pt-8">
            <Button
              onClick={onTryDemo}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-12 h-12 md:h-14 text-base md:text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Try Live Demo
            </Button>
            <Button
              onClick={onBookDemo}
              variant="outline"
              size="lg"
              className="px-8 md:px-12 h-12 md:h-14 text-base md:text-lg font-semibold hover:bg-background hover:border-primary/50 transition-all"
            >
              Book a Demo Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
