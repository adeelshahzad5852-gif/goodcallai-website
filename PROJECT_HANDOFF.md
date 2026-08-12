# GoodcallAI project handoff

## Business

- Brand/domain: GoodcallAI / goodcallai.org. A trademark review is still needed before launch because Goodcall is an existing competitor name.
- Audience: US HVAC first, then plumbing and electrical.
- Offer: custom managed AI receptionists and modern home-service websites. This is a lead-generation site, not a self-service SaaS product.
- Do not use fake reviews, client logos, price claims, or unverified integration claims.

## Current site

- Source folder: `C:\Users\it\Documents\ChatGPT\Website\goodcallai-website`
- Build command: `npm.cmd run build` (passes).
- Homepage, HVAC, Plumbing, Electrical, AI Receptionist, Websites, How It Works, and Contact routes exist.
- User wants a light premium design with dark-blue animated call panels.
- The new homepage removes trade photos from Home. Trade photos stay on the industry pages.
- New original home images are in `public/images/home-call-desk.png`, `home-field-call.png`, and `home-booking-desk.png`.
- Homepage now uses subtle CSS motion: image pan/zoom, floating call cards, waveforms, blue glow, and an animated GoodcallAI mark. Do not make the logo play football on the normal site; seasonal variants can be considered later.
- User likes: the AI receptionist handles section, after-every-call section, three-step process, website section, and form visual.

## Contact / calendar

- Email: hello@goodcallai.org
- WhatsApp: +923116465485 (`wa.me/923116465485`)
- Google Calendar schedule: Discovery Call, 15 minutes, 15-minute buffer, every day, 10 AM–6 PM America/Chicago, Google Meet, confirmation email.
- Booking URL is in `app/components/Site.tsx` as `bookingScheduleUrl`.
- Main Request Demo buttons now open that calendar booking page.
- The visual website form also opens the calendar, but does not store typed form entries yet. User wants to connect it to n8n later; do not start n8n work without a new instruction.

## Publishing

- A private preview site was created but the user cannot access it. Do not send that preview link again.
- Do not publish publicly unless the user explicitly says: “make it public.”
- The purchased domain is not connected yet.

## Next likely task

Let the user review the updated homepage. Then make requested design/content changes. Later, connect the form to an n8n webhook, publish, and connect goodcallai.org.
