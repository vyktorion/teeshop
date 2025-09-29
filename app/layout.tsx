import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TeeShop - Premium T-Shirts Online Store',
  description: 'Discover premium quality t-shirts with unique designs. Fast shipping, great prices, and exceptional quality.',
  keywords: 't-shirts, fashion, clothing, premium, quality, online store',
  authors: [{ name: 'TeeShop Team' }],
  creator: 'TeeShop',
  metadataBase: new URL('https://teeshop.ro'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://teeshop.ro',
    siteName: 'TeeShop',
    title: 'TeeShop - Premium T-Shirts Online Store',
    description: 'Discover premium quality t-shirts with unique designs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TeeShop - Premium T-Shirts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeeShop - Premium T-Shirts Online Store',
    description: 'Discover premium quality t-shirts with unique designs.',
    images: ['/og-image.jpg'],
    creator: '@teeshop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}