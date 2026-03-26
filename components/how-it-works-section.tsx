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
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 md:mb-24 translate-x-28">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced RAG technology with Llama 2 to deliver accurate, contextual answers
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-22 md:gap-22">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative translate-x-12">
                {/* Connection arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-33 top-[45%] z-0 scale-150 scale-x-200">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}

                {/* Card with glassmorphism */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-gray-250 rounded-2xl p-10 md:p-6 h-full hover:bg-white/15 hover:border-primary/60 transition-all duration-300 group translate-x-20 shadow-lg">
                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold mb-4 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 md:mt-32 p-8 md:p-12 rounded-2xl bg-white/10 backdrop-blur-md border border-grey-20 translate-x-25 shadow-sm">
          <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Technology Stack</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">LLM Model</p>
              <p className="font-semibold text-foreground text-lg">Llama 2</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Retrieval Method</p>
              <p className="font-semibold text-foreground text-lg">RAG + Embeddings</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Frontend</p>
              <p className="font-semibold text-foreground text-lg">Next.js</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Backend</p>
              <p className="font-semibold text-foreground text-lg">Flask + Google Colab</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
