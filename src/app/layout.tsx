import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
import { AppWrapper } from "@/components/context";
import { ToastContainer } from "react-toastify";

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
          <AppWrapper>
            {children}
            <ToastContainer />
          </AppWrapper>
        </div>
      </body>
    </html>
  );
}
