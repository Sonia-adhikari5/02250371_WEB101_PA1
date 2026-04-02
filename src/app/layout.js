// app/layout.js
// Root Next.js layout – sets up global fonts, CSS variables, and page metadata.

import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

// Display font for headings – bold and characterful
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body font – clean and readable
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Spotify – Web Player: Music for everyone",
  description:
    "React/Next.js recreation of the Spotify web player home page. Built for WEB101 Practical Assignment 1.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
