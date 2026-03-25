'use client';

import { Building2, FileText, CheckCircle } from 'lucide-react';
import { features } from './reg-cons';


export function FeaturesSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-card">
      <div className="container px-4 max-w-7xl">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              What You Can Do
            </h2>
            <p className="text-muted-foreground text-lg">
              Get instant assistance with all your property registration needs
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 md:p-10 rounded-lg border border-border bg-background hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
