import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Nav } from "@/components/nav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pharmacy Portal | Prescription Dispatch",
  description: "Compound pharmacy management system",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
