import type { Metadata } from "next";
import "./globals.css";
import "./site-fixes.css";

export const metadata: Metadata = {
  title: "GoodcallAI | Every missed call could be your next booked job",
  description:
    "Custom AI receptionists for HVAC, plumbing, and electrical teams in Dallas–Fort Worth. Answer every call 24/7, capture urgent jobs, and book more work.",
  metadataBase: new URL("https://goodcallai.org"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Every missed call could be your next booked job | GoodcallAI",
    description: "Custom AI receptionists for home-service teams.",
    images: ["/og.png"],
    type: "website",
    siteName: "GoodcallAI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Every missed call could be your next booked job | GoodcallAI",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://goodcallai.org/#website",
      url: "https://goodcallai.org",
      name: "GoodcallAI",
      publisher: { "@id": "https://goodcallai.org/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://goodcallai.org/#organization",
      name: "GoodcallAI",
      url: "https://goodcallai.org",
      logo: "https://goodcallai.org/images/goodcallai-linkedin-logo.png",
      image: "https://goodcallai.org/og.png",
      description:
        "GoodcallAI builds and manages custom AI receptionists for HVAC, plumbing, and electrical contractors, answering calls 24/7 and capturing booked jobs.",
      email: "hello@goodcallai.org",
      telephone: "+1-747-236-2546",
      priceRange: "$$",
      areaServed: [
        { "@type": "City", name: "Dallas", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
        { "@type": "City", name: "Fort Worth", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
        { "@type": "AdministrativeArea", name: "Dallas–Fort Worth Metroplex" },
      ],
      knowsAbout: ["AI receptionist", "Virtual receptionist", "Call answering", "HVAC", "Plumbing", "Electrical contracting"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "GoodcallAI services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed AI receptionist", serviceType: "AI call answering for home-service contractors" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home-service website design", serviceType: "Website design and build" } },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
