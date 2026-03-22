'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container px-4 max-w-7xl py-12 md:py-20">
        <div className="space-y-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <a href="#" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold text-xs">
                  <span className="leading-none">RI</span>
                  <span className="text-xs leading-none">LLM</span>
                </div>
                <span className="font-bold text-foreground">RegInfo</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Your AI-powered assistant for understanding property registration, stamp duties, and documentation requirements.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Get In Touch</h4>
              <p className="text-sm text-muted-foreground">
                Questions or feedback? Reach out to us.
              </p>
              <a
                href="mailto:hello@reginfo.dev"
                className="inline-block text-sm text-primary hover:underline"
              >
                hello@reginfo.dev
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Bottom */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {currentYear} RegInfo by Sree Charan. All rights reserved.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-background border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> This AI Assistant provides general information about property registration and related processes. For official guidance and legal matters, please consult with authorized registration officials or legal professionals. The information provided is for educational purposes only and should not be considered as legal or official advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
