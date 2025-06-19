import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { PageTrackingProvider } from "./components/PageTrackingProvider";
//import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CountDown } from "./components/CountDown";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Forum de Cancérologie",
    template: "%s | Forum de Cancérologie"
  },
  description: "Forum de discussion et d'échange sur la cancérologie. Rejoignez notre communauté de professionnels de santé pour partager vos expériences et connaissances.",
  keywords: ["cancérologie", "forum", "santé", "médecine", "oncologie", "professionnels de santé"],
  authors: [{ name: "Forum de Cancérologie" }],
  creator: "Forum de Cancérologie",
  publisher: "Forum de Cancérologie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Forum de Cancérologie",
    description: "Forum de discussion et d'échange sur la cancérologie",
    siteName: "Forum de Cancérologie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forum de Cancérologie",
    description: "Forum de discussion et d'échange sur la cancérologie",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <PageTrackingProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow">
                {children}
              </main>
              <CountDown />
              <Footer />
            </div>
          </PageTrackingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
