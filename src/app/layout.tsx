import type { Metadata } from "next";
import { Inter, Hind_Siliguri, Fraunces } from "next/font/google";
import "./globals.css";
import "./brand.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const hind = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
  variable: "--font-hind",
});

/* Editorial high-contrast display serif for English headlines — paired with
   Inter for body and Hind Siliguri for Bengali, so the type system reads as a
   deliberate pairing rather than a single default sans. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Jahangirnagar Air International (JAI) | Premium International Travel & Visa Services",
  description: "Premium Hajj & Umrah packages, student visa consultancy, immigration guidance, work permit assistance and international air tickets. Your gateway to global opportunities.",
  keywords: ["Hajj Umrah Bangladesh", "Student Visa Consultant", "Immigration Consultant Dhaka", "Work Permit Bangladesh", "International Air Ticket", "Jahangirnagar Air International", "JAI"],
  authors: [{ name: "Jahangirnagar Air International" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jahangirnagar Air International (JAI)",
    description: "Premium International Travel & Overseas Services",
    siteName: "JAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jahangirnagar Air International (JAI)",
    description: "Your Gateway to Global Opportunities",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${hind.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
