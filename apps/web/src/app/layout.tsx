import './globals.css';
import { geistMono, geistSans } from '@/assets/fonts';
import { ResourcePreloader } from '@/components/performance/resource-preloader';
import '@/components/performance/critical.css';
import { MetaTags } from '@/components/seo/meta-tags';
import { metadata } from '@/lib/metadata';
import { OrganizationJsonLd, WebSiteJsonLd, SoftwareApplicationJsonLd } from '@/components/seo/json-ld';
import ClientShell from '@/components/performance/client-shell';
import { Providers } from '@/components/providers';
import Script from 'next/script';

export { metadata };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <MetaTags />
        <meta name="google-site-verification" content="A4XbFNsC1916zjxsmhpEfyc1VYQsV33iFDki7EcCA4o" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3B6SP4PBXQ" strategy="afterInteractive" />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3B6SP4PBXQ');
          `}
        </Script>
        <ResourcePreloader />
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} ${geistSans.variable} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-normal`}
      >
        <Providers>
          {children}
          <ClientShell />
        </Providers>


        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SoftwareApplicationJsonLd />
      </body>
    </html>
  );
}
