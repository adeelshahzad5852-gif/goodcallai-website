"use client";

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";

type IndustryKey = "hvac" | "plumbers" | "electricians";

const bookingScheduleUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3qZrBQ6S-W782JUygtFJiwdV_SInvA6hmJd0nJ0hTcNmm8LUTF-afjVY8-STyi_hiJ7_RGQVJf";

// ── Contact details ───────────────────────────────────────────────────────────
const phoneDisplay = "(747) 236-2546";
const whatsappHref = "https://wa.me/17472362546?text=Hi%20GoodcallAI%2C%20I%27d%20like%20a%20custom%20AI%20call%20demo.";
const linkedInUrl = "https://www.linkedin.com/company/goodcallai";

// Drop MP3s into public/audio/ and list them here. Empty array hides the section.
// Recommended three: (1) HVAC no-cool after hours, (2) burst pipe at 2am,
// (3) estimate request that ends in a booked appointment.
// Each entry needs a captions .vtt alongside the audio (accessibility + it lets
// prospects skim the transcript on mute, which is how most people browse).
const callRecordings: { label: string; description: string; src: string; captions: string }[] = [];


const industries = [
  { slug: "hvac", name: "HVAC", eyebrow: "AI receptionist for HVAC teams", image: "/images/hvac-technician.png", call: "My AC stopped working, and it's 92 degrees inside.", aiReply: "We've got you. Can I get your name and service address?", callerReply: "James Carter, 214 West Elm Street.", followUp: "Thanks, James. When did it stop cooling?", callerReplyTwo: "About two hours ago.", thirdQuestion: "Is the system still running, or has it shut down completely?", callerReplyThree: "It's running, but it's blowing warm air.", outcome: "No-cooling call sent to dispatch.", title: "Your technicians fix systems. Your AI receptionist answers every call.", issue: "no-cool and no-heat calls", photoEyebrow: "When systems fail, calls come fast", photoTitle: "Your technicians diagnose the system. GoodcallAI handles the next caller.", photoText: "No-cool and no-heat calls often arrive while your crew is already on a job. GoodcallAI captures the symptoms, service address, and urgency so dispatch has the details." },
  { slug: "plumbers", name: "Plumbing", eyebrow: "AI receptionist for plumbing teams", image: "/images/plumber-technician.png", call: "A pipe burst, and water is coming through the ceiling.", aiReply: "We've got you. What's the service address?", callerReply: "214 West Elm Street.", followUp: "Is the water still running?", callerReplyTwo: "Yes, it's still coming through.", thirdQuestion: "Have you shut off the main water?", callerReplyThree: "I'm at the valve now. The water is off.", outcome: "Active leak details sent to the on-call plumber.", title: "Your plumbers stop the leak. Your AI receptionist answers every call.", issue: "leaks, clogs, and burst-pipe calls", photoEyebrow: "Leaks do not wait for a callback", photoTitle: "Capture the shutoff status before your plumber heads out.", photoText: "While your plumbers are under sinks, in crawl spaces, or handling another emergency, GoodcallAI asks where the water is coming from, whether it is still running, and whether the main valve is off." },
  { slug: "electricians", name: "Electrical", eyebrow: "AI receptionist for electrical teams", image: "/images/electrician-technician.png", call: "My breaker keeps tripping, and I smell something burning.", aiReply: "We've got you. Please stay away from the panel. Do you see smoke or sparks?", callerReply: "No, neither.", followUp: "Is the burning smell strongest near the panel?", callerReplyTwo: "Yes, right by the panel.", thirdQuestion: "Got it. What's the service address?", callerReplyThree: "214 West Elm Street.", outcome: "Urgent call transferred to the on-call electrician.", title: "Keep your electricians on the job. Make sure every call gets answered.", issue: "urgent electrical and power-loss calls", photoEyebrow: "Safety-related calls need a clear response", photoTitle: "Recognize warning signs and route urgent calls quickly.", photoText: "GoodcallAI asks about smoke, sparks, burning smells, and power loss, collects the service address, and follows your rules to notify the team or transfer the call." },
];

const homeCall = {
  name: "Home Services",
  call: "I'd like a quote to replace our old AC and furnace.",
  aiReply: "We can set up an in-home estimate. Can I get your name and service address?",
  callerReply: "Daniel Brooks, 214 West Elm Street.",
  followUp: "Thanks, Daniel. Is the current system still working, and about how old is it?",
  callerReplyTwo: "It's still working, but it's about 18 years old.",
  thirdQuestion: "I have Tuesday at 10 AM or 2 PM available. Which works better?",
  callerReplyThree: "Let's do 2 PM.",
  outcome: "In-home estimate booked",
  outcomeDetail: "Tuesday at 2:00 PM · Added to calendar · Team notified",
};

function mark(label: string) {
  return <span className="mark" aria-hidden="true">{label}</span>;
}

function Nav() {
  return <header className="nav-shell">
    <nav className="nav">
      <a className="brand" href="/" aria-label="GoodcallAI home"><span className="brand-mark">G</span>Goodcall<span>AI</span></a>
      <div className="nav-links">
        <details className="industry-menu"><summary>Industries <span>⌄</span></summary><div className="drop"><a href="/hvac">HVAC</a><a href="/plumbers">Plumbing</a><a href="/electricians">Electrical</a></div></details>
        <a href="/ai-receptionist">AI Receptionist</a>
        <a href="/websites">Websites</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/contact">Contact</a>
      </div>
      <details className="mobile-menu"><summary aria-label="Open navigation menu">Menu</summary><div className="mobile-menu-panel"><strong>Explore GoodcallAI</strong><a href="/">Home</a><a href="/hvac">HVAC</a><a href="/plumbers">Plumbing</a><a href="/electricians">Electrical</a><a href="/ai-receptionist">AI Receptionist</a><a href="/websites">Websites</a><a href="/how-it-works">How It Works</a><a href="/contact">Contact</a><a className="mobile-demo-link" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Book your free demo →</a></div></details>
      <a className="nav-phone" href={whatsappHref} target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> WhatsApp us</a><a className="button button-small" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Book a free demo</a>
    </nav>
  </header>;
}

function CallVisual({ industry = homeCall.name, call = homeCall.call, aiReply = homeCall.aiReply, callerReply = homeCall.callerReply, followUp = homeCall.followUp, callerReplyTwo = homeCall.callerReplyTwo, thirdQuestion = homeCall.thirdQuestion, callerReplyThree = homeCall.callerReplyThree, outcome = homeCall.outcome, outcomeDetail = homeCall.outcomeDetail }: { industry?: string; call?: string; aiReply?: string; callerReply?: string; followUp?: string; callerReplyTwo?: string; thirdQuestion?: string; callerReplyThree?: string; outcome?: string; outcomeDetail?: string | null }) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setCycle((current) => current + 1), 16000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleOutcomeDetail = industry === homeCall.name ? outcomeDetail : null;

  return <div className="call-visual" aria-label={`Animated example of a ${industry} AI receptionist call`} key={cycle}>
    <div className="visual-glow" />
    <div className="call-top"><span className="live-dot" /> <span className="call-state"><span>Incoming call</span><span>AI answered</span></span><span className="answered">Answered in 3s</span></div>
    <div className="call-card"><div className="call-icon">⌁</div><div><strong>Incoming Call</strong><small>{industry} AI receptionist</small></div><div className="bars"><i /><i /><i /><i /><i /><i /></div></div>
    <div className="call-transcript">
      <div className="transcript-track">
        <div className="bubble caller message-one">{call}</div>
        <div className="bubble ai message-two">{aiReply}</div>
        <div className="bubble caller message-three">{callerReply}</div>
        <div className="bubble ai message-four">{followUp}</div>
        <div className="bubble caller message-five">{callerReplyTwo}</div>
        <div className="bubble ai message-six">{thirdQuestion}</div>
        <div className="bubble caller message-seven">{callerReplyThree}</div>
      </div>
    </div>
    <div className="outcome"><span>✓</span><div><strong>{outcome}</strong>{visibleOutcomeDetail && <small>{visibleOutcomeDetail}</small>}</div></div>
    <div className="wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
  </div>;
}

function DemoForm({ compact = false, offer = "free demo" }: { compact?: boolean; offer?: string }) {
  return <div className={`demo-form booking-card ${compact ? "compact" : ""}`}>
    <div className="booking-card-title"><span>15</span><div><small>15-minute discovery call</small><strong>Choose a time that works for you.</strong></div></div>
    <div className="booking-benefits"><span>✓ Times shown in your timezone</span><span>✓ Google Meet link included</span><span>✓ Enter your details once</span></div>
    <a className="button button-wide" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Choose a time for your {offer} <span>→</span></a>
    <p className="form-note">You’ll enter your contact and business details—including your website and trade—once on the secure booking page.</p>
    <a className="whatsapp-link" href="https://wa.me/17472362546?text=Hi%20GoodcallAI%2C%20I%27d%20like%20a%20custom%20AI%20call%20demo." target="_blank" rel="noreferrer">Need a faster response? <b>Message us on WhatsApp</b> <span>↗</span></a>
  </div>;
}

function Footer() {
  return <footer className="footer"><div><a className="brand footer-brand" href="/"><span className="brand-mark">G</span>Goodcall<span>AI</span></a><p>Custom AI receptionists for home-service teams.</p><a className="footer-email" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp {phoneDisplay}</a><a className="footer-email" href="mailto:hello@goodcallai.org">hello@goodcallai.org</a><p className="footer-area">Serving HVAC, plumbing, and electrical contractors across the Dallas\u2013Fort Worth Metroplex.</p><div className="footer-social"><a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="GoodcallAI on LinkedIn">LinkedIn</a><a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="GoodcallAI on WhatsApp">WhatsApp</a></div></div><div className="footer-links"><a href="/dallas">Dallas\u2013Fort Worth</a><a href="/hvac">HVAC</a><a href="/plumbers">Plumbing</a><a href="/electricians">Electrical</a><a href="/websites">Websites</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><p className="copyright">\u00a9 2026 GoodcallAI. All rights reserved.</p></footer>;
}

function Hero({ industry }: { industry?: (typeof industries)[number] }) {
  const isHome = !industry;
  const industryName = industry?.slug === "hvac" ? "HVAC" : industry?.name.toLowerCase();
  const title = isHome ? <>Every missed call could be your next <em>booked job.</em></> : industry.title;
  return <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />{industry?.eyebrow ?? "Custom AI receptionists for home-service teams"}</p><h1>{title}</h1><p className="hero-text">{isHome ? "We build AI receptionists that answer calls, handle urgent requests, qualify leads, and turn more callers into booked jobs—24/7." : `GoodcallAI answers ${industryName} calls 24/7, handles urgent requests, qualifies new leads, and gives your team the details needed to respond quickly.`}</p><div className="hero-actions"><a className="button" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Book your free AI call demo <span>→</span></a><a className="button button-quiet" href="/how-it-works">How it works</a></div><p className="hero-note">Built around your calls. Managed for you. No software to learn.</p></div><div className={`hero-art ${isHome ? "hero-art-home" : ""}`}><div className="orbit orbit-one" /><div className="orbit orbit-two" />{isHome && <img className="hero-desk-image" src="/images/home-call-desk.png" alt="Phone receiving a call on a modern desk" />}<CallVisual industry={industry?.name} call={industry?.call} aiReply={industry?.aiReply} callerReply={industry?.callerReply} followUp={industry?.followUp} callerReplyTwo={industry?.callerReplyTwo} thirdQuestion={industry?.thirdQuestion} callerReplyThree={industry?.callerReplyThree} outcome={industry?.outcome} /></div></section>;
}

function ContactList() {
  return <section className="contact-list" aria-label="Contact GoodcallAI">
    <a href="mailto:hello@goodcallai.org"><span className="contact-list-icon">@</span><span><small>1 · Email</small><strong>hello@goodcallai.org</strong><em>Send us your questions or business details.</em></span><b>Write to us →</b></a>
    <a href="https://wa.me/17472362546?text=Hi%20GoodcallAI%2C%20I%27d%20like%20to%20talk%20about%20an%20AI%20receptionist." target="_blank" rel="noreferrer"><span className="contact-list-icon whatsapp">◉</span><span><small>2 · WhatsApp</small><strong>Message GoodcallAI</strong><em>Best for a quick conversation with our team.</em></span><b>Start a chat ↗</b></a>
  </section>;
}

function BadOptions() {
  return <section className="section bad-options"><div className="section-head"><p className="eyebrow">The old way costs opportunities</p><h2>Three ways calls slip through the cracks.</h2><p>None of these should be the front door to your business.</p></div><div className="option-grid"><article><span>×</span><h3>Pull technicians off the job</h3><p>Every call interrupts the work your customer already paid you to do.</p></article><article><span>×</span><h3>Send urgent callers to voicemail</h3><p>When the problem feels urgent, most callers simply choose the next company.</p></article><article><span>×</span><h3>Use an answering service that sounds generic</h3><p>Your callers deserve a response that follows your rules and reflects your business.</p></article></div></section>;
}

function MotionStories() {
  return <section className="section motion-stories"><div className="section-head"><p className="eyebrow">A better call experience</p><h2>Keep working. Your front line keeps answering.</h2></div><div className="story-grid"><article className="motion-story"><img src="/images/home-field-call.png" alt="Home-service owner seeing a call while in the field" /><div className="story-call-card"><span className="live-dot" /> Incoming call <b>Handled in seconds</b></div><div className="story-copy"><p className="eyebrow">When the team is busy</p><h3>Every call gets a professional first response.</h3><p>Your AI receptionist captures the reason for the call while your team stays focused on the job.</p></div></article><article className="motion-story reverse"><img src="/images/home-booking-desk.png" alt="Calendar and phone on a modern desk" /><div className="story-booking-card"><span>✓</span><div><small>Appointment requested</small><b>Details ready for your team</b></div></div><div className="story-copy"><p className="eyebrow">When a job needs booking</p><h3>Every caller gets a clear next step.</h3><p>Service needs, preferred timing, and contact details are collected before your team follows up.</p></div></article></div></section>;
}

function CostSection() {
  return <section className="section cost-section"><div className="cost-copy"><p className="eyebrow">The cost of a missed call</p><h2>When the phone goes unanswered, the job usually goes elsewhere.</h2><p>Busy teams should not have to choose between serving the customer in front of them and answering the next caller.</p></div><div className="problem-list"><article>{mark("01")}<h3>Your team is in the field</h3><p>Calls arrive while technicians are working, driving, or handling an emergency.</p></article><article>{mark("02")}<h3>Voicemail loses urgency</h3><p>Customers with an urgent problem rarely wait around for a callback.</p></article><article>{mark("03")}<h3>After-hours calls still matter</h3><p>Your next high-value customer can call at any time.</p></article></div></section>;
}

function HandlesSection({ industry }: { industry?: (typeof industries)[number] }) {
  const specific = industry ? [`Urgent ${industry.name.toLowerCase()} requests`, `New repair requests`, `Maintenance and inspection bookings`, `Estimate requests and service-area questions`] : ["Urgent service requests", "New service and estimate requests", "Booking and rescheduling", "Service-area and frequently asked questions"];
  return <section className="section handles"><div className="section-head left"><p className="eyebrow">What your AI receptionist handles</p><h2>Every call gets the right next step.</h2></div><div className="handle-grid">{specific.map((title, i) => <article key={title}><span className="handle-icon">{["⌁", "↗", "□", "◌"][i]}</span><h3>{title}</h3><p>{i === 0 ? "Captures the important details while following your call rules." : i === 1 ? "Collects what your team needs before the next conversation." : i === 2 ? "Books the right appointment or guides the caller to the next step." : "Answers common questions without taking your team off the job."}</p></article>)}</div><div className="summary-strip"><div><p className="eyebrow">After every call</p><h3>Useful details. Not another voicemail.</h3></div><div className="summary-lines"><span>Caller and contact details</span><span>Service need and urgency</span><span>Address and preferred timing</span></div></div></section>;
}

function WebsiteFeatures() {
  const features = [
    ["Clear service pages", "Help visitors quickly understand what you do and where you work."],
    ["Trust at first glance", "Show reviews, credentials, clear information, and a professional brand."],
    ["Fast on every screen", "Give customers a smooth experience on phones, tablets, and desktops."],
    ["Easy ways to get in touch", "Make it simple to call, request service, or book the next step."],
  ];

  return <section className="section handles"><div className="section-head left"><p className="eyebrow">What your website should do</p><h2>Turn local searches into clear next steps.</h2></div><div className="handle-grid">{features.map(([title, text], i) => <article key={title}><span className="handle-icon">{["⌁", "↗", "□", "◌"][i]}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="summary-strip"><div><p className="eyebrow">On every visit</p><h3>A clear path from search to service.</h3></div><div className="summary-lines"><span>Services and areas covered</span><span>Reviews and credentials</span><span>Clear ways to get in touch</span></div></div></section>;
}

function Process() {
  return <section className="process"><div className="section-head"><p className="eyebrow eyebrow-light">Simple by design</p><h2>Your custom demo, in three steps.</h2><p>We use your actual business details so you can hear how it would work for your callers.</p></div><div className="steps"><article><b>1</b><h3>Share your details</h3><p>Send us your website or Google Business Profile.</p></article><article><b>2</b><h3>We build your demo</h3><p>We tailor the conversation to your call flow.</p></article><article><b>3</b><h3>Review and launch</h3><p>Hear it, refine it, and go live with our support.</p></article></div></section>;
}

function WebsiteProcess() {
  return <section className="process"><div className="section-head"><p className="eyebrow eyebrow-light">Simple by design</p><h2>Your new website, in three steps.</h2><p>We use your business details to create a clear website built for local customers.</p></div><div className="steps"><article><b>1</b><h3>Share your business details</h3><p>Send us your current website or Google Business Profile.</p></article><article><b>2</b><h3>We design it</h3><p>We organize your services, reviews, and contact options.</p></article><article><b>3</b><h3>Review and launch</h3><p>Refine the details and launch with our support.</p></article></div></section>;
}

export function HomePage() {
  return <main><Nav /><Hero /><div className="signal-bar"><span>AI answers in seconds</span><i /><span>Urgent requests captured</span><i /><span>Custom built for your business</span></div><CostSection /><BadOptions /><MotionStories /><HandlesSection /><section className="website-promo section"><div><p className="eyebrow">Also available</p><h2>A better phone experience starts with a better website.</h2><p>We also create modern, conversion-focused websites that help home-service customers trust your business, get in touch, and book service.</p><a href="/websites" className="text-link">Explore our website service <span>→</span></a></div><div className="site-stack"><div className="site-window back"><span /><span /><span /></div><div className="site-window front"><span /><span /><span /><strong>Your next customer is already looking.</strong><small>Make it easy to call.</small></div></div></section><CustomDemoStrip /><AudioDemos /><Process /><FaqSection /><section className="final-cta"><div><p className="eyebrow">A custom demo for your business</p><h2>Hear what your business sounds like when every call gets answered.</h2><p>Choose a time, and we’ll take it from there.</p></div><DemoForm compact /></section><Footer /></main>;
}

export function IndustryPage({ kind }: { kind: IndustryKey }) {
  const industry = industries.find((item) => item.slug === kind)!;
  const industryLabel = kind === "hvac" ? "HVAC" : industry.name.toLowerCase();
  return <main><Nav /><Hero industry={industry} /><section className="industry-photo section"><img src={industry.image} alt={`${industry.name} technician working in the field`} /><div><p className="eyebrow">{industry.photoEyebrow}</p><h2>{industry.photoTitle}</h2><p>{industry.photoText}</p><div className="photo-call"><span>Incoming call</span><b>{industry.issue}</b><i>Answered by AI in 3 seconds</i></div></div></section><CostSection /><HandlesSection industry={industry} /><CustomDemoStrip /><AudioDemos /><Process /><FaqSection /><section className="final-cta"><div><p className="eyebrow">Your {industryLabel} call demo</p><h2>Find out what missed {industryLabel} calls could be costing your business.</h2><p>Choose a time to hear a demo tailored to your business.</p></div><DemoForm compact /></section><Footer /></main>;
}

export function SimplePage({ slug }: { slug: string }) {
  const content: Record<string, { eyebrow: string; title: string; text: string }> = {
    "ai-receptionist": { eyebrow: "A managed AI receptionist", title: "A better answer for every incoming call.", text: "Custom call handling built around your business, your callers, and the way your team works." },
    websites: { eyebrow: "Modern websites for home-service teams", title: "Your website should make it easy to choose you.", text: "We build fast, clear websites that turn local interest into real calls and service requests." },
    "how-it-works": { eyebrow: "A simpler way to get started", title: "Turn your business details into a custom AI call demo.", text: "No software to learn. No generic chatbot. Just a managed setup built around your calls." },
    contact: { eyebrow: "Book your free demo", title: "Let’s talk about your business.", text: "Choose a time for a 15-minute discovery call. You’ll enter your contact and business details once on the secure booking page." },
  };
  const page = content[slug] ?? content.contact;
  const isWebsitePage = slug === "websites";
  return <main><Nav />{slug === "contact" && <ContactList />}<section className={`simple-hero ${slug === "contact" ? "contact-hero" : ""}`}><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.text}</p></section>{slug === "contact" ? <section className="contact-form"><DemoForm /></section> : <>{isWebsitePage ? <WebsiteFeatures /> : <HandlesSection />}{isWebsitePage ? <WebsiteProcess /> : <Process />}<section className="final-cta"><div><p className="eyebrow">{isWebsitePage ? "Your website consultation" : "Your custom demo"}</p><h2>{isWebsitePage ? "See what a faster, clearer website could do for your business." : "Hear how a better call experience could work for your business."}</h2></div><DemoForm compact offer={isWebsitePage ? "free website consultation" : "free demo"} /></section></>}<Footer /></main>;
}

const policyContent = {
  privacy: {
    eyebrow: "Privacy policy",
    title: "Your information, handled clearly.",
    intro: "Effective 13 August 2026. This policy explains how GoodcallAI collects and uses information when you visit our website, contact us, or book a discovery call.",
    sections: [
      ["Who we are", "GoodcallAI is operated by Adeel Shahzad and is based in Taunsa Sharif, District Dera Ghazi Khan, Punjab, Pakistan. You can contact us at hello@goodcallai.org."],
      ["Information we collect", "When you book a discovery call, contact us by email, or message us on WhatsApp, we may receive your name, email address, phone number, business name, website or business profile, trade or industry, and the information you choose to share with us."],
      ["How we use it", "We use this information to respond to you, arrange and prepare for your discovery call, understand your business needs, and follow up about GoodcallAI. We do not sell personal information."],
      ["Services we use", "Booking is provided through Google Calendar and may include a Google Meet link. Email and WhatsApp messages are handled by their respective providers. Those services have their own privacy policies and terms."],
      ["Retention and deletion", "We keep demo-inquiry information for up to 12 months after our last communication, unless a longer period is needed to provide an agreed service or meet a legal obligation. You may ask us to access, correct, or delete your information by emailing hello@goodcallai.org."],
      ["Calls and recordings", "Discovery calls are not recorded by default. If we plan to record a call, we will tell participants before recording begins. Future AI call-handling services may have separate data and recording settings; we will provide the relevant notice before collecting or processing that information."],
      ["Changes to this policy", "We may update this policy when our services or data practices change. The effective date at the top of this page shows when it was last updated."],
    ],
  },
  terms: {
    eyebrow: "Terms of use",
    title: "Clear terms for using GoodcallAI.",
    intro: "Effective 13 August 2026. These terms apply when you visit the GoodcallAI website, contact us, book a demo, or use material we provide during a discovery process.",
    sections: [
      ["About GoodcallAI", "GoodcallAI is operated by Adeel Shahzad in Taunsa Sharif, District Dera Ghazi Khan, Punjab, Pakistan. We provide information, discovery calls, and managed AI receptionist and website services for businesses."],
      ["Using this website", "You may use this website for lawful business purposes. Do not misuse the website, interfere with its operation, attempt to access systems or data without permission, or use its content to build or promote a competing service without our written permission."],
      ["Demos and service discussions", "A demo is an illustration of how a service may work for your business. It is not a guarantee of particular revenue, bookings, technical results, availability, or suitability. The scope, price, timeline, and any ongoing service terms will be agreed separately in writing before paid work begins."],
      ["Third-party services", "The website may link to or use third-party services, including Google Calendar, Google Meet, WhatsApp, and future service providers. Their availability and terms are controlled by those providers. We are not responsible for third-party services outside our control."],
      ["Our content", "The GoodcallAI name, website design, text, graphics, and other site content belong to GoodcallAI or its licensors unless stated otherwise. You may not copy, reproduce, or distribute them without permission."],
      ["Liability", "To the extent permitted by applicable law, GoodcallAI is not liable for indirect, incidental, special, or consequential losses arising from use of this website or a free demo. Nothing in these terms limits liability that cannot legally be limited."],
      ["Governing law", "These terms are governed by the laws of Pakistan. Any dispute will be handled by a court with competent jurisdiction in Punjab, Pakistan, subject to any mandatory rights that apply to you."],
      ["Contact and changes", "For questions about these terms, email hello@goodcallai.org. We may update these terms from time to time; the effective date above will show the latest version."],
    ],
  },
} as const;

export function PolicyPage({ type }: { type: keyof typeof policyContent }) {
  const policy = policyContent[type];
  return <main><Nav /><section className="simple-hero policy-hero"><p className="eyebrow">{policy.eyebrow}</p><h1>{policy.title}</h1><p>{policy.intro}</p></section><article className="policy-content">{policy.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</article><Footer /></main>;
}

// ── Custom demo offer ────────────────────────────────────────────
function CustomDemoStrip() {
  return <section className="live-demo-strip"><div><p className="eyebrow">Hear it on your own business first</p><h2>We&rsquo;ll build the demo before you commit to anything.</h2><p>Send us your company name and we&rsquo;ll build a short recording of the receptionist answering a real call for your business &mdash; your name, your trade, your service area. Listen to it in your own time. If it isn&rsquo;t right for you, nothing happens next.</p></div><div className="live-demo-actions"><a className="button button-lg" href={whatsappHref} target="_blank" rel="noreferrer">Get my demo on WhatsApp</a><a className="button button-quiet" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Or book a 15-min call &rarr;</a></div></section>;
}

function AudioDemos() {
  if (callRecordings.length === 0) return null;
  return <section className="section audio-demos"><div className="section-head"><p className="eyebrow">Real call recordings</p><h2>Hear it handle the calls you actually get.</h2></div><div className="audio-grid">{callRecordings.map((clip) => <article key={clip.src}><h3>{clip.label}</h3><p>{clip.description}</p><audio controls preload="none" src={clip.src}><track kind="captions" srcLang="en" label="English transcript" src={clip.captions} default />Your browser does not support audio playback.</audio></article>)}</div></section>;
}

// ── FAQ (with FAQPage structured data) ────────────────────────────────────────
const faqs = [
  ["Does it sound like a robot?", "No. It uses natural voice and answers in about three seconds. Most callers do not realise it is not a person. Call our number and judge it yourself before you talk to us."],
  ["What happens on a real emergency?", "You set the rules. A burst pipe or a burning smell can ring your on-call tech straight away, or send a text with the address and the details while the AI keeps the caller calm."],
  ["Do I have to change my phone number?", "No. You keep your number and forward it to us, either all the time or only when nobody picks up within a few rings. You can turn it off whenever you want."],
  ["What if it does not know the answer?", "It says so and takes a message, or transfers to you. We build it from your website, your service area, and your pricing rules, so it will not invent answers about your business."],
  ["How long does setup take?", "Usually two to three days from the time you send us your details. There is nothing for you to install and nothing for your team to learn."],
  ["Is this software I have to sign up for?", "No. There is nothing for you to log into and nothing for your team to learn. We build the receptionist for your business, we run it, and we make changes for you when your services or hours change."],
  ["What does it cost?", "It depends on what we build. A single after-hours line is a very different job from a full call flow with booking, transfers and service-area rules, so we quote the build after we have heard how your calls actually work. There is a monthly management fee on top. We will give you the number on the demo call, before you commit to anything."],
];

function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return <section className="section faq"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><div className="section-head"><p className="eyebrow">Common questions</p><h2>What contractors ask us first.</h2></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>;
}

// ── Dallas–Fort Worth local landing page ──────────────────────────────────────
const dfwCities = ["Dallas", "Fort Worth", "Plano", "Arlington", "Irving", "Garland", "Frisco", "McKinney", "Grand Prairie", "Mesquite", "Carrollton", "Richardson", "Lewisville", "Denton", "Allen", "Rowlett"];

export function DallasPage() {
  return <main><Nav />
    <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />AI receptionist for Dallas&ndash;Fort Worth contractors</p><h1>The call you miss at 7pm is the job your competitor books at 7:05.</h1><p className="hero-text">GoodcallAI answers the phone for HVAC, plumbing, and electrical companies across the Metroplex &mdash; nights, weekends, and every time your crew is already on a job. Real voice, your rules, your calendar.</p><div className="hero-actions"><a className="button" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Book your free AI call demo <span>&rarr;</span></a><a className="button button-quiet" href={whatsappHref} target="_blank" rel="noreferrer">Message us on WhatsApp</a></div><p className="hero-note">Custom built around your calls. Managed for you. No software to learn.</p></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><CallVisual /></div></section>
    <div className="signal-bar"><span>Answers in ~3 seconds</span><i /><span>Nights, weekends, holidays</span><i /><span>Serving all of DFW</span></div>
    <section className="section local-why"><div className="section-head"><p className="eyebrow">Why this matters here</p><h2>DFW summers do not wait for a callback.</h2><p>When a system fails in a Texas August, homeowners call down the list until somebody picks up. Whoever answers first books the job. That is the whole competition.</p></div><div className="option-grid"><article><span>1</span><h3>Your crew is on a roof</h3><p>Between drive time across the Metroplex and the job itself, the phone rings when nobody can reach it.</p></article><article><span>2</span><h3>Peak season buries you</h3><p>The weeks you most need to capture every lead are the weeks you have the least capacity to answer.</p></article><article><span>3</span><h3>After-hours is where the margin is</h3><p>Emergency calls carry premium pricing. They also come in at the exact hours an office is closed.</p></article></div></section>
    <CustomDemoStrip />
    <AudioDemos />
    <HandlesSection />
    <section className="section service-area"><div className="section-head"><p className="eyebrow">Service area</p><h2>We work with contractors across the Metroplex.</h2></div><ul className="city-list">{dfwCities.map((city) => <li key={city}>{city}</li>)}</ul><p className="section-note">Not on the list? If you serve DFW, we can serve you.</p></section>
    <FaqSection />
    <Process />
    <section className="final-cta"><div><p className="eyebrow">Dallas&ndash;Fort Worth contractors</p><h2>Find out what your missed calls are worth.</h2><p>Fifteen minutes. We will build a demo on your actual business and you can hear it before deciding anything.</p></div><DemoForm compact /></section>
    <Footer />
  </main>;
}

export function NotFoundPage() {
  return <main><Nav /><section className="simple-hero not-found"><p className="eyebrow">Page not found</p><h1>That page isn’t here.</h1><p>The link may be outdated, or the page may have moved.</p><a className="button" href="/">Return to the homepage →</a></section><Footer /></main>;
}
