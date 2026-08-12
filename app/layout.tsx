import type { Metadata } from "next";
import "./globals.css";
import "./site-fixes.css";

export const metadata: Metadata = {
  title: "GoodcallAI | Every missed call could be your next booked job",
  description:
    "Custom AI receptionists for HVAC, plumbing, and electrical teams.",
  metadataBase: new URL("https://goodcallai.org"),
  openGraph: {
    title: "Every missed call could be your next booked job | GoodcallAI",
    description: "Custom AI receptionists for home-service teams.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Every missed call could be your next booked job | GoodcallAI",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
