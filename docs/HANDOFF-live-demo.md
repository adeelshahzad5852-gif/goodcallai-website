# GoodcallAI — handoff for a new chat

Paste this whole file as your first message in the new chat.

---

## How to work with me

- I am Adeel Shahzad, solo operator, based in Taunsa Sharif, Punjab, Pakistan (UTC+5).
- **Be direct. Correct me when I'm wrong.** Do not be agreeable for the sake of it. You are a coach and an expert, not an assistant that flatters.
- **Keep messages short. One thing at a time.** Long walls of text lose me and I will stop reading.
- **Ask instead of guessing.** If you need a value, a login, a screenshot or a decision, ask for it in one line and stop. Do not build on an assumption and do not send me three options when you have a recommendation.
- Tell me what you actually verified versus what you assume.
- Do not touch anything outside what I asked for without telling me first.

## Business facts

- **GoodcallAI** — managed, custom-built AI receptionists for HVAC, plumbing and electrical contractors.
- **Market: Greater Houston, Texas.** (Switched from Dallas: Houston has ~2,238 HVAC contractors vs Dallas ~1,322, and its humidity drives failures year-round rather than in seasonal bursts.)
- **Zero clients. Zero demos run with a real contractor.** The demo line itself is built and tested; it has never been put in front of a Houston owner. Full time on this. Budget is nearly exhausted — assume every recurring cost matters.
- Positioning: managed service, not software. Nothing for the owner to log into.
- Pricing is **never published**. Every build is custom-quoted after hearing how their calls work, plus a monthly management fee. The number is given on the demo call.
- Contact: hello@goodcallai.org · WhatsApp +1 747 236 2546 · goodcallai.org

## Never do these

- No invented testimonials, client logos, case studies, results or statistics. I have none and cannot evidence any.
- No unverifiable claims like "answers in 3 seconds" or "most callers can't tell".
- No published prices.
- **US spelling.** I sell to Americans. Not "enquiry", "colour", "realise", "programme".

## The website — done, live, do not rebuild

- **goodcallai.org**, live on Vercel, auto-deploys on every push to `main`.
- Repo `adeelshahzad5852-gif/goodcallai-website`. **The site is in the `web/` folder**, not the repo root. Vercel's Root Directory is set to `web`.
- Plain HTML and CSS. No framework, no build step, nothing to install.
- Pages: one long `index.html`, plus `privacy.html` and `terms.html`.
- Brand: ink `#141210`, rust `#D9531E` (orange on light), ember `#FF6A28` (orange on dark), paper `#FAF7F3`. Fonts Archivo + Public Sans, self-hosted. All colors are tokens at the top of `web/assets/styles.css`.
- Deliberately orange because every competitor — Goodcall, Retell, Smith.ai, Rosie — is white-and-blue.
- DNS is on **Cloudflare**. A record → `76.76.21.21`, proxy set to **DNS only**. Namecheap's Advanced DNS tab does nothing while nameservers point at Cloudflare.
- **Email lives in those same DNS records** (`mx1`/`mx2.privateemail.com`, SPF, DKIM, DMARC). **Never touch MX or TXT records.**

### The hidden section

`web/index.html` contains a **"Hear it" recordings section that is commented out** — look for the block marked `CUT BELOW` / `CUT ABOVE`. It is not public and never has been. It was built for three pre-recorded MP3 demos.

**That approach is abandoned.** Nothing gets uploaded there — no MP3s, no video. The live demo line below replaces it, so the block becomes text plus one phone number, roughly 40 lines, no new files.

A laptop-and-phone mockup of the replacement has been designed and approved in
principle. **Nothing has been committed to `main`.** Do not push it until Adeel
says so, and not before the demo number has been called and works — a dead
number on the homepage is worse than no section.

Decision on the number itself: **it goes on the page.** An earlier call to keep
it off the site was wrong. The caller ID of anyone who dials it is a lead with a
callback number attached, and Adeel has none of those. Cold calls stay the main
way he hands it out; the site is a second catch. Revisit only if the call log
shows strangers burning the plan.

---

## THE DEMO LINE — built and working

A Houston contractor calls a number. The agent interviews him briefly about his
business, then **role-plays as his own receptionist** so he can hear it handling
his calls.

**Status: live and tested end to end. Never yet used on a real contractor.**

Demo number: **+1 928 843 3748**

**Flow:**
1. Cartesia answers on that number and plays the opening line.
2. The agent asks four questions: company name, trade, service area, and what
   counts as an emergency after hours.
3. It announces it is now his receptionist.
4. **Owner plays the customer.** He calls in with whatever his real customers
   ask. The agent answers as his business, screens against his own emergency
   rule, offers a booking window, and reads the details back before hanging up.
5. When he steps out of the role-play, it closes once and stops selling.

This replaces both the recordings idea and, largely, the discovery call. It
becomes the cold-call ask: *"call this number, it'll show you in three minutes"*
— a far easier yes than "book fifteen minutes with me".

### Stack — Cartesia. Changed 29 August 2026.

| Piece | Choice |
|---|---|
| Voice agent | **Cartesia**, built and edited in the Cartesia Playground |
| Phone number | **Cartesia-provisioned**, free on the plan |
| Automation | **none yet** |

**ElevenLabs, Twilio and n8n are all out.** What changed and why:

- **Cartesia replaced ElevenLabs.** Cheaper — Pro is roughly $4–5/month against
  ElevenLabs Creator at roughly $22 — faster to first audio, and it saves the
  audio and transcript of every call automatically, which is what weeks 3–4 of
  the playbook run on. The voice-realism edge ElevenLabs holds shows up on long
  expressive speech, which a receptionist never does.
- **Twilio dropped entirely.** Cartesia hands out a free US number on the plan,
  so there is no number to buy and no balance to keep topped up. The Twilio
  account still exists — Pay-as-you-go, about $1.97 on it — and is not needed.
  Do not spend money there.
- **n8n is not built and is not blocking.** Lead capture and follow-up can come
  later. Demos run fine without it.

The old plan — Twilio answering, a press-1 gate, then handing off to ElevenLabs,
with n8n around the call — is dead. Do not rebuild it.

### The agent prompt

The prompt lives in the Cartesia Playground on the agent attached to the number,
not in this repo. Two halves: the interview, then the role-play. Tested twice.

Each of these was added after a test run exposed the problem:

- One question per turn. Joining two with "or" confused the caller and cost 25
  seconds of the demo.
- The agent does not decide when the role-play ends. The owner does.
- Close once, then stop selling. It used to deliver the closing three times.
- Offer a booking window, never an exact arrival time, and read the details back
  before hanging up. Refusing to book at all made it sound like voicemail.
- Never quote a GoodcallAI price, never claim customers or results, and answer
  honestly that Adeel is in Pakistan if asked.

### Still open

1. **The press-1 gate is gone.** Calls go straight to the agent, because
   Cartesia answers the number directly and there is no Twilio flow in front of
   it. Fine while the number only travels by mouth on cold calls. **Must be
   answered before the number goes on the website.**
2. **928 is an Arizona area code, not Houston.** Cosmetic, but worth swapping to
   713, 281, 832 or 346 if Cartesia allows choosing one.
3. **One demo per caller, a concurrency cap, a call-length cap** — all were
   going to be n8n's job and none of them exist. Check what the Cartesia plan
   already enforces before building anything.
4. **The website section is designed but nothing is committed.** See "The hidden
   section" above.

---

## Also true, not urgent

- The name collides with **goodcall.com** — a funded company, same product, same buyer. I will not rank for my own brand. I've decided to revisit after 5 paying clients. Don't reopen it before then.
- Terms now put disputes in Harris County, Texas (was Punjab, Pakistan). Operator details still list me in Pakistan, which is accurate.
- My Cloudflare account is in someone else's name. Known, not urgent.
- A full Houston go-to-market playbook — scripts, objections, lead sources, follow-up sequences — lives in `adeelshahzad5852-gif/cloude`, branch `claude/goodcallai-social-presence-d1yb2h`.
- **The real bottleneck is not the website and not this demo. It is that I have made zero calls that ended in a demo.** If I start drifting into building instead of selling, say so.
