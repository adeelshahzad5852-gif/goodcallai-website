# GoodcallAI project handoff

## Business

- Brand/domain: GoodcallAI / goodcallai.org. A trademark review is still needed before launch because Goodcall is an existing competitor name.
- Operator: Adeel Shahzad, Taunsa Sharif, District Dera Ghazi Khan, Punjab, Pakistan.
- Audience: US HVAC first, then plumbing and electrical.
- Offer: custom managed AI receptionists and modern home-service websites. This is a lead-generation site, not a self-service SaaS product.
- Do not use fake reviews, client logos, price claims, or unverified integration claims.

## Current site

- Source folder: `C:\Users\it\Documents\ChatGPT\Website\goodcallai-website`
- Build command: `npm.cmd run build` (passes).
- Homepage, HVAC, Plumbing, Electrical, AI Receptionist, Websites, How It Works, and Contact routes exist.
- Privacy and Terms pages now exist at `/privacy` and `/terms`; their footer links appear throughout the site.
- User wants a light premium design with dark-blue animated call panels.
- The new homepage removes trade photos from Home. Trade photos stay on the industry pages.
- New original home images are in `public/images/home-call-desk.png`, `home-field-call.png`, and `home-booking-desk.png`.
- Homepage now uses subtle CSS motion: image pan/zoom, floating call cards, waveforms, blue glow, and an animated GoodcallAI mark. Do not make the logo play football on the normal site; seasonal variants can be considered later.
- User likes: the AI receptionist handles section, after-every-call section, three-step process, website section, and form visual.
- Industry pages use separate, trade-specific conversations. The homepage is an in-home-estimate booking conversation ending: “In-home estimate booked · Tuesday at 2:00 PM · Added to calendar · Team notified.”
- LinkedIn logo asset: `public/images/goodcallai-linkedin-logo.png` (300 × 300).

## Contact / calendar

- Email: hello@goodcallai.org
- WhatsApp: +1 747 236 2546 (`wa.me/17472362546`)
- Google Calendar schedule: Discovery Call, 15 minutes, 15-minute buffer, every day, 10 AM–6 PM America/Chicago, Google Meet, confirmation email.
- Booking URL is in `app/components/Site.tsx` as `bookingScheduleUrl`.
- Main Request Demo buttons now open that calendar booking page.
- The visual website form also opens the calendar, but does not store typed form entries yet. User wants to connect it to n8n later; do not start n8n work without a new instruction.
- Current lead data is stored in the Google Calendar booking system and booking-confirmation email. There is no CRM, database, Google Sheet, or n8n automation yet.

## Legal

- Privacy Policy: demo-inquiry data retained for up to 12 months after last contact; discovery calls are not recorded by default; future AI voice/data settings require a separate notice.
- Terms: business is operated by Adeel Shahzad; Pakistan law is named as governing law. These are practical draft pages, not legal advice; obtain legal review before material client volume or payments.

## GitHub / hosting

- GitHub repository: `https://github.com/adeelshahzad5852-gif/goodcallai-website`
- Branch: `main`; remote `origin` is configured and current changes have been pushed.
- Latest upload includes the new WhatsApp number and LinkedIn logo. Do not rewrite or reset unrelated existing work.
- The user will give a trusted friend GitHub Write access to host the site. The friend should connect the repo, publish the `main` branch, connect `goodcallai.org`, enable HTTPS, and send the live URL/DNS records if needed.
- Do not publish or connect the domain yourself unless the user explicitly asks. The old private preview is inaccessible; do not send it.

## Publishing

- A private preview site was created but the user cannot access it. Do not send that preview link again.
- Do not publish publicly unless the user explicitly says: “make it public.”
- The purchased domain is not connected yet.

## Deferred ideas / next likely task

- Do not build website-theme galleries or the ElevenLabs roleplay feature yet; the user wants to prioritize getting clients first.
- After hosting is live, test the real booking journey, email/WhatsApp links, all navigation, mobile layout, and domain/HTTPS.
- Later, connect the calendar/form workflow to n8n and a CRM or Google Sheet so every lead is captured and the user receives an automatic notification.
