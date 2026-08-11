"use client";

import Link from "next/link";
import { FormEvent } from "react";

type IndustryKey = "hvac" | "plumbers" | "electricians";

const bookingScheduleUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3qZrBQ6S-W782JUygtFJiwdV_SInvA6hmJd0nJ0hTcNmm8LUTF-afjVY8-STyi_hiJ7_RGQVJf";

const industries = [
  { slug: "hvac", name: "HVAC", eyebrow: "AI receptionist for HVAC teams", image: "/images/hvac-technician.png", call: "My AC stopped working and it's 92 degrees inside.", outcome: "Emergency HVAC request captured.", title: "Your technicians fix systems. Your AI receptionist handles the calls.", issue: "no-cool and no-heat calls" },
  { slug: "plumbers", name: "Plumbing", eyebrow: "AI receptionist for plumbing teams", image: "/images/plumber-technician.png", call: "I have a burst pipe and water is coming through the ceiling.", outcome: "Urgent plumbing request captured.", title: "Your plumbers solve the emergency. Your AI receptionist catches the call.", issue: "leaks, clogs, and burst-pipe calls" },
  { slug: "electricians", name: "Electrical", eyebrow: "AI receptionist for electrical teams", image: "/images/electrician-technician.png", call: "My breaker keeps tripping and half the house has no power.", outcome: "Urgent electrical request captured.", title: "Keep your electricians on the job. Keep every caller answered.", issue: "urgent electrical and power-loss calls" },
];

function mark(label: string) {
  return <span className="mark" aria-hidden="true">{label}</span>;
}

function Nav() {
  return <header className="nav-shell">
    <nav className="nav">
      <Link className="brand" href="/" aria-label="GoodcallAI home"><span className="brand-mark">G</span>Goodcall<span>AI</span></Link>
      <div className="nav-links">
        <details className="industry-menu"><summary>Industries <span>⌄</span></summary><div className="drop"><Link href="/hvac">HVAC</Link><Link href="/plumbers">Plumbing</Link><Link href="/electricians">Electrical</Link></div></details>
        <Link href="/ai-receptionist">AI Receptionist</Link>
        <Link href="/websites">Websites</Link>
        <Link href="/how-it-works">How It Works</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <Link className="button button-small" href="/contact">Request a free demo</Link>
    </nav>
  </header>;
}

function CallVisual({ industry = "HVAC", call = "My AC stopped working and it's 92 degrees inside.", outcome = "Emergency HVAC request captured." }: { industry?: string; call?: string; outcome?: string }) {
  return <div className="call-visual" aria-label="Example AI receptionist call flow">
    <div className="visual-glow" />
    <div className="call-top"><span className="live-dot" /> Live call <span className="answered">Answered in 3s</span></div>
    <div className="call-card"><div className="call-icon">⌁</div><div><strong>Incoming Call</strong><small>{industry} AI receptionist</small></div><div className="bars"><i /><i /><i /><i /><i /><i /></div></div>
    <div className="bubble caller">{call}</div>
    <div className="bubble ai">I can help. What's the service address?</div>
    <div className="outcome"><span>✓</span>{outcome}</div>
    <div className="wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
  </div>;
}

function DemoForm({ compact = false }: { compact?: boolean }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const details = [
      `Business name: ${values.get("business")}`,
      `Trade: ${values.get("trade")}`,
      `Website or Google Business Profile: ${values.get("website") || "Not provided"}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone")}`,
    ].join("\n");
    window.location.href = `mailto:hello@goodcallai.org?subject=${encodeURIComponent("New GoodcallAI demo request")}&body=${encodeURIComponent(details)}`;
  }
  return <form className={`demo-form ${compact ? "compact" : ""}`} onSubmit={submit}>
    <div className="form-grid"><label>Business name<input required name="business" placeholder="Your company" /></label><label>Trade<select name="trade" defaultValue=""><option value="" disabled>Select a trade</option><option>HVAC</option><option>Plumbing</option><option>Electrical</option></select></label></div>
    <label>Website or Google Business Profile<input name="website" placeholder="www.yourwebsite.com" /></label>
    <div className="form-grid"><label>Email address<input required name="email" type="email" placeholder="you@company.com" /></label><label>Phone number<input required name="phone" type="tel" placeholder="(555) 123-4567" /></label></div>
    <button className="button button-wide" type="submit">Request my AI call demo <span>→</span></button>
    <p className="form-note">No obligation. Your email app will open with your request ready to send.</p>
    <a className="calendar-link" href={bookingScheduleUrl} target="_blank" rel="noreferrer">Prefer to talk first? <b>Book a 15-minute discovery call</b> <span>→</span></a>
    <a className="whatsapp-link" href="https://wa.me/923116465485?text=Hi%20GoodcallAI%2C%20I%27d%20like%20a%20custom%20AI%20call%20demo." target="_blank" rel="noreferrer">Need a faster response? <b>Message us on WhatsApp</b> <span>↗</span></a>
  </form>;
}

function Footer() {
  return <footer className="footer"><div><Link className="brand footer-brand" href="/"><span className="brand-mark">G</span>Goodcall<span>AI</span></Link><p>Custom AI receptionists for home-service teams.</p><a className="footer-email" href="mailto:hello@goodcallai.org">hello@goodcallai.org</a></div><div className="footer-links"><Link href="/hvac">HVAC</Link><Link href="/plumbers">Plumbing</Link><Link href="/electricians">Electrical</Link><Link href="/websites">Websites</Link><Link href="/contact">Contact</Link></div><p className="copyright">© 2026 GoodcallAI. All rights reserved.</p></footer>;
}

function Hero({ industry }: { industry?: (typeof industries)[number] }) {
  const isHome = !industry;
  const title = isHome ? <>Every missed call could be your next <em>booked job.</em></> : industry.title;
  return <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />{industry?.eyebrow ?? "Custom AI receptionists for home-service teams"}</p><h1>{title}</h1><p className="hero-text">{isHome ? "We build AI receptionists that answer calls, handle urgent requests, qualify leads, and give your team every opportunity—24/7." : `GoodcallAI answers ${industry.name.toLowerCase()} calls 24/7, captures emergency requests, qualifies new leads, and gives your team the details needed to respond fast.`}</p><div className="hero-actions"><Link className="button" href="/contact">Request your free AI call demo <span>→</span></Link><Link className="button button-quiet" href="/how-it-works">How it works</Link></div><p className="hero-note">Built around your calls. Managed for you. No software to learn.</p></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><CallVisual industry={industry?.name ?? "HVAC"} call={industry?.call} outcome={industry?.outcome} /></div></section>;
}

function TradeCards() {
  return <section className="section industries"><div className="section-head"><p className="eyebrow">Built for the trades</p><h2>Different calls. One dependable front line.</h2><p>Every team has its own emergencies, questions, and booking rules. Your receptionist should too.</p></div><div className="trade-grid">{industries.map((item) => <Link href={`/${item.slug}`} className="trade-card" key={item.slug}><img src={item.image} alt={`${item.name} technician in the field`} /><div className="trade-shade" /><div className="trade-copy"><span>{item.name}</span><h3>Never let a busy day become a missed opportunity.</h3><b>Explore {item.name} <i>→</i></b></div><div className="call-chip">Incoming call <span>• answered</span></div></Link>)}</div></section>;
}

function CostSection({ name = "home-service" }: { name?: string }) {
  return <section className="section cost-section"><div className="cost-copy"><p className="eyebrow">The cost of a missed call</p><h2>When the phone goes unanswered, the job usually goes elsewhere.</h2><p>Busy teams should not have to choose between serving the customer in front of them and answering the next one.</p></div><div className="problem-list"><article>{mark("01")}<h3>Your team is in the field</h3><p>Calls arrive while technicians are working, driving, or handling an emergency.</p></article><article>{mark("02")}<h3>Voicemail loses urgency</h3><p>Customers with a real problem rarely wait around for a callback.</p></article><article>{mark("03")}<h3>After-hours is still business</h3><p>Your next high-value {name} job can call at any time.</p></article></div></section>;
}

function HandlesSection({ industry }: { industry?: (typeof industries)[number] }) {
  const specific = industry ? [`Urgent ${industry.name.toLowerCase()} requests`, `New repair requests`, `Maintenance and tune-up bookings`, `Estimate requests and service-area questions`] : ["Urgent service requests", "New jobs and estimate calls", "Booking and rescheduling", "Service-area and FAQ questions"];
  return <section className="section handles"><div className="section-head left"><p className="eyebrow">What your AI receptionist handles</p><h2>Every call gets the right next step.</h2></div><div className="handle-grid">{specific.map((title, i) => <article key={title}><span className="handle-icon">{["⌁", "↗", "□", "◌"][i]}</span><h3>{title}</h3><p>{i === 0 ? "Captures the important details while following your call rules." : i === 1 ? "Collects what your team needs before the next conversation." : i === 2 ? "Helps callers reach the right appointment or next action." : "Answers common questions without taking your team off the job."}</p></article>)}</div><div className="summary-strip"><div><p className="eyebrow">After every call</p><h3>Useful details. Not another voicemail.</h3></div><div className="summary-lines"><span>Caller and contact details</span><span>Service need and urgency</span><span>Address and preferred timing</span></div></div></section>;
}

function Process() {
  return <section className="process"><div className="section-head"><p className="eyebrow eyebrow-light">Simple by design</p><h2>Your custom demo, in three steps.</h2><p>We use your actual business details so you can hear how the experience would work for your callers.</p></div><div className="steps"><article><b>1</b><h3>Share details</h3><p>Send your website or Google Business Profile.</p></article><article><b>2</b><h3>We build it</h3><p>We map a demo around your call flow.</p></article><article><b>3</b><h3>Review & go live</h3><p>Hear it, refine it, and launch with support.</p></article></div></section>;
}

export function HomePage() {
  return <main><Nav /><Hero /><div className="signal-bar"><span>AI answers in seconds</span><i /><span>Urgent jobs captured</span><i /><span>Built around your business</span></div><CostSection /><TradeCards /><HandlesSection /><section className="website-promo section"><div><p className="eyebrow">Also available</p><h2>A better phone experience starts with a better website.</h2><p>We also create modern, conversion-focused websites for home-service teams that make it easier for real customers to call, trust, and book.</p><Link href="/websites" className="text-link">Explore modern websites <span>→</span></Link></div><div className="site-stack"><div className="site-window back"><span /><span /><span /></div><div className="site-window front"><span /><span /><span /><strong>Your next customer is already looking.</strong><small>Make it easy to call.</small></div></div></section><Process /><section className="final-cta"><div><p className="eyebrow">A custom demo for your business</p><h2>Hear what your business sounds like when every call gets answered.</h2><p>Share a few details. We’ll take it from there.</p></div><DemoForm compact /></section><Footer /></main>;
}

export function IndustryPage({ kind }: { kind: IndustryKey }) {
  const industry = industries.find((item) => item.slug === kind)!;
  return <main><Nav /><Hero industry={industry} /><section className="industry-photo section"><img src={industry.image} alt={`${industry.name} technician working in the field`} /><div><p className="eyebrow">Calls do not wait for a quiet moment</p><h2>Keep your team focused on the work in front of them.</h2><p>GoodcallAI gives callers a fast, professional first response while your technicians keep doing what they were sent out to do.</p><div className="photo-call"><span>Incoming call</span><b>{industry.issue}</b><i>Answered by AI in 3 seconds</i></div></div></section><CostSection name={industry.name.toLowerCase()} /><HandlesSection industry={industry} /><Process /><section className="final-cta"><div><p className="eyebrow">Your {industry.name} call demo</p><h2>Let’s find out what your missed {industry.name.toLowerCase()} calls are costing you.</h2><p>Share your details and hear a demo tailored to your business.</p></div><DemoForm compact /></section><Footer /></main>;
}

export function SimplePage({ slug }: { slug: string }) {
  const content: Record<string, { eyebrow: string; title: string; text: string }> = {
    "ai-receptionist": { eyebrow: "A managed AI receptionist", title: "A better answer for every incoming call.", text: "Custom call handling built around your business, your callers, and the way your team works." },
    websites: { eyebrow: "Modern websites for the trades", title: "Your website should make it easy to choose you.", text: "We build fast, clear websites that turn local interest into real calls and requests." },
    "how-it-works": { eyebrow: "A simpler way to get started", title: "From your business details to a custom AI call demo.", text: "No software learning curve. No generic chatbot. Just a managed setup designed for your calls." },
    contact: { eyebrow: "Request your free demo", title: "Tell us a little about your business.", text: "Share your details and we’ll create a starting point for your custom AI receptionist demo." },
  };
  const page = content[slug] ?? content.contact;
  return <main><Nav /><section className="simple-hero"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.text}</p></section>{slug === "contact" ? <section className="contact-form"><DemoForm /></section> : <><HandlesSection /><Process /><section className="final-cta"><div><p className="eyebrow">Your custom demo</p><h2>See what a better call experience could look like for your business.</h2></div><DemoForm compact /></section></>}<Footer /></main>;
}
