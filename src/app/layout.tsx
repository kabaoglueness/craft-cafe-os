import type { Metadata } from "next";
import { 
  Playfair_Display, 
  Cormorant_Garamond,
  Lora,
  Plus_Jakarta_Sans, 
  Inter 
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier & Brew | Atölye Kafe Sipariş Sistemi",
  description: "Heykel, seramik, tuval boyama ve nitelikli kahve sipariş deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="tr" 
      className={`${cormorant.variable} ${playfair.variable} ${lora.variable} ${plusJakarta.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#211D1A] antialiased selection:bg-[#B3542E] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
