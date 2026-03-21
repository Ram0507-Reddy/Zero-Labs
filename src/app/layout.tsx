import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ReloadBoundary } from '@/components/global/ReloadBoundary';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Zero Labs | Systems Engineering',
  description: 'We build brutalist, hyper-optimized software infrastructure for sovereign individuals and elite development teams. Not every problem needs a solution, but if yours does — we build it.',
  metadataBase: new URL('https://zero-s.tech'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Zero Labs | Systems Engineering',
    description: 'We build brutalist, hyper-optimized software infrastructure.',
    url: 'https://zero-s.tech',
    siteName: 'Zero Labs',
    images: [
      {
        url: '/og-image.png', // Placeholder URL for when you generate an OG Image
        width: 1200,
        height: 630,
        alt: 'Zero Labs Terminal Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-black text-white overflow-x-hidden`}>
        <ReloadBoundary />
        <CustomCursor />
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
