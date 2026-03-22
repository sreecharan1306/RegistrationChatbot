'use client';

import { useState, useEffect } from 'react';
import { Footer } from '@/components/footer';
import { FloatingChatbot } from '@/components/floating-chatbot';
import { ContactForm } from '@/components/contact-form';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { Button } from '@/components/ui/button';
import { Code2, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  const [hasUserData, setHasUserData] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('reginfo_current_user');
    setHasUserData(!!userData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Animated background with glassmorphism */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-screen">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite] opacity-30" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite_1s] opacity-30" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_2s] opacity-20" />
            </div>
          </div>

          <div className="container px-4 max-w-7xl relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                    Ask About Registration
                  </span>
                  <br />
                  <span className="text-foreground">Get Instant Answers</span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Get instant answers about property registration, stamp duties, required documents, and everything you need to know about the registration process.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-semibold h-12 md:h-14 px-6 md:px-8 transition-all duration-300 cursor-pointer"
                >
                  Start Chatting <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-primary/50 text-foreground font-semibold h-12 md:h-14 px-6 md:px-8 transition-all duration-300 cursor-pointer"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold">Why Choose RegInfo</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features designed for your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Instant Answers',
                  description: 'Get quick, accurate responses to your registration questions anytime.',
                },
                {
                  icon: Shield,
                  title: 'Accurate & Reliable',
                  description: 'Powered by advanced RAG technology and Llama 2 AI.',
                },
                {
                  icon: Code2,
                  title: '24/7 Available',
                  description: 'Always accessible registration guidance whenever you need it.',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Lead Capture Section */}
        {!hasUserData && (
          <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 via-transparent to-transparent" data-form-section>
            <div className="container px-4 w-full">
              <div className="max-w-2xl mx-auto">
                <div className="text-center space-y-4 mb-12 md:mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold">Get Started</h2>
                  <p className="text-muted-foreground text-base md:text-lg">
                    Join us today and get instant access to property registration assistance
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
                  <LeadCaptureForm onSuccess={() => setHasUserData(true)} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 w-full">
            <div className="max-w-2xl mx-auto">
              <div className="text-center space-y-4 mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-bold">Have Questions?</h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Drop us a message and we'll get back to you as soon as possible
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section id="demo-video" className="py-20 md:py-32 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container px-4 w-full">
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">See It In Action</h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Watch a demo of RegInfo in action to understand how it works
                </p>
              </div>

              <div className="relative w-full aspect-video bg-black/10 rounded-2xl border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Demo Video Coming Soon</p>
                      <p className="text-white/60 text-sm">Check back later for a full walkthrough</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 md:p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <span className="font-semibold">Note:</span> The backend is not always running. It's a side project that runs on Google Colab with ngrok. It will be turned on upon request from users. For demo purposes, you can explore the UI and submit the form to see how data collection works.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
