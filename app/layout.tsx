import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Transition from "./components/Transition";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forum de Cancérologie",
  description: "Forum de Cancérologie 2025",
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
          <Navbar />
          <Transition>
            <main>{children}</main>
          </Transition>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
