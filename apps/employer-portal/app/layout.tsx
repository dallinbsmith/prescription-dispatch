import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";

import { SkipLink, Toaster } from "@rx/ui";

import { Nav } from "@/components/nav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Employer Portal | Prescription Dispatch",
  description: "Employee benefits management",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Auth0Provider>
          <SkipLink />
          <Nav />
          <main id="main-content">{children}</main>
          <Toaster />
        </Auth0Provider>
      </body>
    </html>
  );
};

export default RootLayout;
