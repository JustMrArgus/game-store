import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { QueryProvider } from '@/components/providers/query-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/providers/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Game Store',
  description: 'Best Game Store in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#101014] text-white`}
      >
        <QueryProvider>
          <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-55">{children}</main>
            <Footer />
          </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
