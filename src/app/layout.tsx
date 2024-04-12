import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/bars/sidebar";
import Header from "@/components/bars/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controle Estoque",
  description: "Aplicativo para controle de estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          {children}
        </div>
      </body>
    </html>
  );
}
