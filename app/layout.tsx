import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { getLandingContent } from '@/lib/content';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingContent();
  
  return {
    title: content.metadata?.title || content.title,
    description: content.metadata?.description || content.subtitle,
    keywords: content.metadata?.keywords?.join(', '),
    authors: [{ name: 'Auto Landing Page Builder' }],
    creator: 'Auto Landing Page Builder',
    publisher: 'Vercel',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      title: content.metadata?.title || content.title,
      description: content.metadata?.description || content.subtitle,
      url: '/',
      siteName: content.title,
      images: content.metadata?.ogImage ? [
        {
          url: content.metadata.ogImage,
          width: 1200,
          height: 630,
          alt: content.title,
        }
      ] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: content.metadata?.twitterCard || 'summary_large_image',
      title: content.metadata?.title || content.title,
      description: content.metadata?.description || content.subtitle,
      images: content.metadata?.ogImage ? [content.metadata.ogImage] : [],
      creator: '@autolandingpage',
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
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
