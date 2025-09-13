import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Proply - Your OS for Property Managers | Property Management Software",
  description: "Streamline your property management operations with Proply - the comprehensive operating system designed specifically for property managers. Join our waitlist today.",
  keywords: ["property management", "property manager software", "real estate management", "property OS", "rental management", "property management system"],
  authors: [{ name: "Proply" }],
  creator: "Proply",
  publisher: "Proply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://proply.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Proply - Your OS for Property Managers",
    description: "Streamline your property management operations with Proply - the comprehensive operating system designed specifically for property managers.",
    url: 'https://proply.com',
    siteName: 'Proply',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Proply - Property Management OS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Proply - Your OS for Property Managers",
    description: "Streamline your property management operations with Proply - the comprehensive operating system designed specifically for property managers.",
    images: ['/og-image.png'],
    creator: '@proply',
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0EA5E9' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Proply",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Your OS for Property Managers - Streamline your property management operations with Proply's comprehensive operating system designed specifically for property managers.",
              "url": "https://proply.com",
              "author": {
                "@type": "Organization",
                "name": "Proply"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
