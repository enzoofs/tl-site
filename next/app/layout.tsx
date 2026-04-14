import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gloock = localFont({
  src: "../fonts/Gloock-Regular.ttf",
  variable: "--font-gloock",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ibmPlexSerif = localFont({
  src: [
    { path: "../fonts/IBMPlexSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexSerif-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/IBMPlexSerif-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TimeLabs — automação empresarial que devolve tempo",
  description:
    "TimeLabs — automação empresarial. Devolvemos tempo ao seu negócio automatizando processos, integrando sistemas e transformando dados em decisão.",
  metadataBase: new URL("https://timelabsbr.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "TimeLabs — automação empresarial que devolve tempo",
    description:
      "Devolvemos tempo ao seu negócio automatizando processos, integrando sistemas e transformando dados em decisão.",
    url: "https://timelabsbr.com",
    siteName: "TimeLabs",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeLabs — automação empresarial que devolve tempo",
    description:
      "Devolvemos tempo ao seu negócio automatizando processos, integrando sistemas e transformando dados em decisão.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${gloock.variable} ${instrumentSerif.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#EFE9DA" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('timelabs-theme');
                if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
              })();
            `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TimeLabs",
              url: "https://timelabsbr.com",
              logo: "https://timelabsbr.com/assets/selo.svg",
              description:
                "Automação empresarial. Devolvemos tempo ao seu negócio automatizando processos, integrando sistemas e transformando dados em decisão.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressCountry: "BR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "contato@timelabsbr.com",
                contactType: "customer service",
                availableLanguage: "Portuguese",
              },
              sameAs: [
                "https://linkedin.com/company/timelabs",
                "https://instagram.com/timelabs",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
