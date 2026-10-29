import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar/TopBar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { getSite } from "@/services/api";

// Reference site uses a Cormorant-style serif for headings and a Manrope-style sans for UI/body.
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mobile Mall Darbhanga — Smartphones & Accessories Store",
  description:
    "Mobile Mall Darbhanga is a complete mobile store — smartphones from 20+ brands, accessories, smart watches, exchange offers and easy EMI. Bhagat Singh Chowk Tower, Darbhanga. Call 8271916118.",
  openGraph: { siteName: "Mobile Mall Darbhanga", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", site: "@mobile_mall_darbhanga" },
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false" ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const themeScript = `try{if(localStorage.getItem('mm-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <TopBar settings={site.settings} />
          <Header />
          <main>{children}</main>
          <Footer settings={site.settings} />
          <CartDrawer />
          {site.settings.chatEnabled && <Chatbot settings={site.settings} />}
        </CartProvider>
      </body>
    </html>
  );
}
