# IGRS Telangana AI Chatbot - Setup Guide

This is a production-ready Next.js frontend for the IGRS (Registration & Stamps Department) AI Chatbot for Telangana. The application features lead capture, chat interface, email integration via Brevo, and reCAPTCHA validation.

## Prerequisites

- Node.js 18+ and npm/pnpm
- Brevo account (formerly Sendinblue) for email integration
- Google reCAPTCHA v2 setup
- Calendly account for demo scheduling
- Backend API running (endpoint: `/query`)

## Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables in `.env.local`:**
   - `NEXT_PUBLIC_BACKEND_URL`: Your ngrok tunnel or backend URL
   - `NEXT_PUBLIC_CALENDLY_URL`: Your Calendly scheduling link
   - `NEXT_PUBLIC_BREVO_API_KEY`: Your Brevo API key
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Your reCAPTCHA v2 site key
   - `NEXT_PUBLIC_DEV_EMAIL`: Email for recruitment notifications
   - Social links (resume, LinkedIn, GitHub)

## Critical Setup Steps

### 1. Brevo Email Integration

**Important:** The sender email in `lib/brevo.ts` must be verified in your Brevo account.

1. Go to https://app.brevo.com/
2. Navigate to **Settings > Sender identities**
3. Add and verify your email address
4. Update `BREVO_SENDER_EMAIL` in `lib/brevo.ts` with your verified email
5. Get your API key from **Settings > API Keys**

### 2. Google reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Create a new reCAPTCHA v2 (Checkbox) site
3. Add your domains:
   - `localhost` (for development)
   - Your Vercel domain (for production)
4. Copy the Site Key to `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

### 3. Backend API Configuration

Your backend should have:
- A `GET /` endpoint for health checks
- A `POST /query` endpoint that accepts:
  ```json
  {
    "query": "user's question"
  }
  ```
- Return format:
  ```json
  {
    "response": "ai generated answer"
  }
  ```
- All responses should include `ngrok-skip-browser-warning` header handling

**ngrok Setup (for local development):**
```bash
ngrok http 5000  # Adjust port to your backend
# Copy the URL: https://xxxx.ngrok-free.app
# Add to NEXT_PUBLIC_BACKEND_URL in .env.local
```

### 4. Calendly Integration

1. Go to https://calendly.com/
2. Create a calendar event for demos
3. Copy your scheduling link
4. Add to `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`

## Running the Application

### Development Server
```bash
pnpm dev
```
Open http://localhost:3000 in your browser.

### Build for Production
```bash
pnpm build
pnpm start
```

## Features Overview

### Lead Capture Dialog
- Appears automatically on first visit
- Collects: Name, Email, Phone (10 digits)
- Optional recruiter consent flow
- reCAPTCHA v2 validation
- Sends confirmation email to user
- Sends notification email to recruiter
- Stores contact in Brevo CRM

### Chat Interface
- Real-time chat with AI backend
- Backend health check with 5s timeout
- 10-second query timeout
- Chat history stored in sessionStorage
- User greeting with name personalization
- Feedback buttons (thumbs up/down)
- Clear chat and end session options

### Landing Page Sections
1. **Navbar** - Logo, brand name, book demo button
2. **Hero** - Main headline, status indicator, CTA buttons
3. **Features** - 3 feature cards with icons
4. **How It Works** - 4-step process visualization
5. **Calendly** - Inline booking widget
6. **Footer** - Links, contact info, disclaimer

## File Structure

```
app/
├── layout.tsx              # Root layout with fonts, Toaster
├── globals.css             # Design tokens, branding colors
└── page.tsx                # Main landing page

components/
├── navbar.tsx              # Navigation bar
├── hero-section.tsx        # Hero section with CTA
├── features-section.tsx    # Features grid
├── how-it-works.tsx        # Process steps
├── lead-capture-dialog.tsx # Lead capture form
├── chat-interface.tsx      # Chat UI
├── calendly-section.tsx    # Calendly widget
└── footer.tsx              # Footer with links

lib/
├── validation.ts           # Form validation utilities
├── session.ts              # SessionStorage management
├── backend-health.ts       # Backend API integration
└── brevo.ts                # Brevo email/CRM integration
```

## Design System

- **Primary Color**: `#1a3c6e` (Government Blue)
- **Accent Color**: `#f5a623` (Amber)
- **Background**: `#f8f9fc` (Off-white)
- **Fonts**: Lora (serif, headings), Inter (body)
- **Radius**: 0.625rem (rounded corners)

## Security Notes

1. **All API keys should be in `.env.local`** (never committed)
2. **ngrok header**: All backend fetch calls include `"ngrok-skip-browser-warning": "true"`
3. **reCAPTCHA**: Validation required for form submission
4. **SessionStorage**: Clears when browser closes (no persistent data)
5. **Brevo**: API key should only be used server-side (currently using public for demo)

## Troubleshooting

### Dialog doesn't appear
- Check if user already exists in sessionStorage
- Clear browser sessionStorage and refresh
- Check browser console for errors

### Chat not working
- Verify `NEXT_PUBLIC_BACKEND_URL` is correct
- Ensure backend is running and accessible
- Check ngrok connection if using local backend
- Check 10-second timeout and backend response format

### Emails not sending
- Verify Brevo API key in `.env.local`
- Confirm sender email is verified in Brevo account
- Check Brevo email logs for failure reasons
- Verify `NEXT_PUBLIC_DEV_EMAIL` is correct

### reCAPTCHA not loading
- Verify Site Key in environment variables
- Ensure domain is added to reCAPTCHA console
- Check browser console for reCAPTCHA errors

## Deployment

### To Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel project settings
4. Deploy

### Backend Deployment
- Deploy your backend to a public URL
- Update `NEXT_PUBLIC_BACKEND_URL` to production URL
- Remove ngrok header if backend is self-hosted (not behind ngrok)

## Post-Generation Checklist

- [ ] ngrok header included in all fetch calls
- [ ] Brevo sender email updated to verified email
- [ ] All environment variables configured in `.env.local`
- [ ] Form validation tested with various inputs
- [ ] Chat interface tested with mock backend
- [ ] reCAPTCHA integration verified
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] Dialog properly dismissible
- [ ] Session management working correctly
- [ ] Email notifications being sent successfully

## Support & Documentation

- Brevo Docs: https://developers.brevo.com/
- reCAPTCHA Docs: https://developers.google.com/recaptcha/docs
- Calendly Integration: https://calendly.com/integrations
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com

## License

This project is for the Government of Telangana - IGRS (Registration & Stamps Department).
