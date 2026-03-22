'use client';

import { MessageSquare, Zap, Brain, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Ask a Question',
    description: 'Simply type your question about property registration or stamp duty',
  },
  {
    icon: Zap,
    title: 'Get Instant Answer',
    description: 'Our AI analyzes your query and retrieves relevant information',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Advanced NLP understands context and provides accurate responses',
  },
  {
    icon: CheckCircle2,
    title: 'Take Action',
    description: 'Use the guidance to proceed with your property registration',
  },
];

const techStack = [
  'Next.js',
  'React',
  'AI/ML',
  'Government Database',
  'Telangana IGRS',
];

export function HowItWorks() {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4 max-w-7xl">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple, fast, and efficient
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="space-y-4">
                  {/* Connection line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-1/4 w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent transform -translate-y-1/2" />
                  )}
                  
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <Icon className="w-10 h-10" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stack */}
          <div className="mt-12 p-8 rounded-lg border border-border bg-card">
            <p className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              Built With
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
