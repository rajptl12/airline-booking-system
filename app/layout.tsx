import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileNav from "./components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "AeroBooking | Premium Flight Booking",
  description: "Book your next premium flight and hotel easily.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AeroBooking",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50`}>
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
