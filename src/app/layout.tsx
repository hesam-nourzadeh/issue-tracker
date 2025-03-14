import Navbar from "@/components/Navbar";
import "./globals.css";
// import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Navbar />
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
