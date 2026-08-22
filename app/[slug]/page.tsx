import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DallasPage, IndustryPage, PolicyPage, PricingPage, SimplePage } from "../components/Site";

type PageProps = { params: Promise<{ slug: string }> };

const pageMetadata: Record<string, { title: string; description: string }> = {
  dallas: { title: "AI Receptionist for Dallas\u2013Fort Worth Contractors | GoodcallAI", description: "24/7 AI call answering for HVAC, plumbing, and electrical companies across Dallas, Fort Worth, Plano, Arlington, and the wider Metroplex. Call the AI yourself before you book anything." },
  pricing: { title: "Pricing | GoodcallAI AI Receptionist", description: "Transparent pricing for a managed AI receptionist. Founding-client rate, no setup fee, 14-day pilot, cancel any time." },
  hvac: { title: "AI Receptionist for HVAC Teams | GoodcallAI", description: "Answer HVAC calls 24/7, capture urgent requests, qualify leads, and keep technicians focused." },
  plumbers: { title: "AI Receptionist for Plumbing Teams | GoodcallAI", description: "Answer plumbing calls 24/7, capture leak and burst-pipe details, and keep plumbers focused on the job." },
  electricians: { title: "AI Receptionist for Electrical Teams | GoodcallAI", description: "Answer electrical calls 24/7, identify urgent requests, and transfer critical calls quickly." },
  "ai-receptionist": { title: "Managed AI Receptionist | GoodcallAI", description: "Custom AI call handling built around your business, callers, and team." },
  websites: { title: "Websites for Home-Service Teams | GoodcallAI", description: "Fast, clear websites designed to turn local interest into real calls and service requests." },
  "how-it-works": { title: "How GoodcallAI Works", description: "See how GoodcallAI turns your business details into a custom AI receptionist and call demo." },
  contact: { title: "Contact GoodcallAI | Book a Free Demo", description: "Email us, message us on WhatsApp, or book a free 15-minute GoodcallAI discovery call." },
  privacy: { title: "Privacy Policy | GoodcallAI", description: "How GoodcallAI collects, uses, retains, and protects information from website visitors and demo inquiries." },
  terms: { title: "Terms of Use | GoodcallAI", description: "Terms that apply to the GoodcallAI website, discovery calls, and service discussions." },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata[slug] ?? { title: "Page Not Found | GoodcallAI" };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "dallas") {
    return <DallasPage />;
  }
  if (slug === "pricing") {
    return <PricingPage />;
  }
  if (slug === "hvac" || slug === "plumbers" || slug === "electricians") {
    return <IndustryPage kind={slug} />;
  }
  if (slug === "ai-receptionist" || slug === "websites" || slug === "how-it-works" || slug === "contact") {
    return <SimplePage slug={slug} />;
  }
  if (slug === "privacy" || slug === "terms") {
    return <PolicyPage type={slug} />;
  }
  notFound();
}
