'use client';

import { ArrowRight, FileText, Zap, Brain, MessageCircle } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: 'Ask Your Question',
      description: 'You ask anything about property registration, stamp duties, or documentation',
    },
    {
      number: 2,
      icon: FileText,
      title: 'Document Processing',
      description: 'Your question queries our document database and breaks them into embeddings',
    },
    {
      number: 3,
      icon: Zap,
      title: 'Chunk Creation',
      description: 'The documents are split into meaningful chunks for faster processing',
    },
    {
      number: 4,
      icon: Brain,
      title: 'AI Processing',
      description: 'Llama 2 reads these chunks and generates accurate answers to your question',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced RAG technology with Llama 2 to deliver accurate, contextual answers
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col h-full">
                {/* Connection arrow - rendered between cards in 4-column layout */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 lg:-right-6 lg:w-6 xl:-right-8 xl:w-8 z-20 pointer-events-none items-center justify-center text-primary/40">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Card with glassmorphism */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-7 h-full hover:bg-white/15 hover:border-primary/60 transition-all duration-300 group shadow-lg flex flex-col">
                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold mb-4 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all shrink-0">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Stack */}
        <div className="mt-16 md:mt-24 p-6 sm:p-8 md:p-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
          <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">LLM Model</p>
              <p className="font-semibold text-foreground text-base sm:text-lg">Llama 2</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Retrieval Method</p>
              <p className="font-semibold text-foreground text-base sm:text-lg">RAG + Embeddings</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Frontend</p>
              <p className="font-semibold text-foreground text-base sm:text-lg">Next.js</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Backend</p>
              <p className="font-semibold text-foreground text-base sm:text-lg">Flask + Google Colab</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
