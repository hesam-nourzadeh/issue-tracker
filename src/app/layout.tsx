import Navbar from "@/components/Navbar";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/AuthProvider";
import QueryClientProvider from "@/services/QueryClientProvider";
import { getServerSession } from "next-auth";
import prisma from "../../prisma/client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "Issue Tracker | %s",
    default: "Issue Tracker",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session
    ? await prisma.user.findUnique({
        where: { email: session?.user?.email! },
      })
    : undefined;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <Theme>
          <AuthProvider>
            <QueryClientProvider>
              <Navbar isAdmin={user ? user.isAdmin : false} />
              {children}
            </QueryClientProvider>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
