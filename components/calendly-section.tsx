'use client';

export function CalendlySection() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section id="calendly-section" className="w-full py-20 md:py-32 bg-card">
      <div className="container px-4 max-w-7xl">
        <div className="space-y-8 md:space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Schedule a Demo
            </h2>
            <p className="text-muted-foreground text-lg">
              Book a personalized demo with our team to see the full capabilities
            </p>
          </div>

          {/* Calendly Placeholder */}
          <div className="rounded-lg overflow-hidden border border-border bg-background shadow-md">
            {calendlyUrl ? (
              <iframe
                title="Calendly"
                src={calendlyUrl}
                width="100%"
                height="600"
                frameBorder="0"
                className="w-full"
              />
            ) : (
              <div className="h-96 flex items-center justify-center bg-muted">
                <p className="text-muted-foreground text-center px-4">
                  Calendly scheduling will be available once configured
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
