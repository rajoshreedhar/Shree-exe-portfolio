import type { Metadata } from "next";
import {
  Manrope,
  Playfair_Display,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajoshree Dhar — Shree.exe | Digital World & Portfolio",
  description:
    "A curious mind. An unreasonable number of interests. Explore Rajoshree Dhar's Pixel Chic digital world: AI/ML, Software, Data, SKYTXT, lab notes, and interactive companion Shree.exe.",
  openGraph: {
    title: "Rajoshree Dhar — Shree.exe",
    description:
      "A personal digital world uniting editorial craft, technical depth, and an interactive pixel companion.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${pressStart.variable} ${vt323.variable}`}
    >
      <body className="min-h-screen bg-porcelain text-ink antialiased selection:bg-powder-pink/70 selection:text-ink">
        <a href="#main-content" className="skip-link font-pixel text-[10px]">
          SKIP TO CONTENT
        </a>
        {children}
      </body>
    </html>
  );
}
