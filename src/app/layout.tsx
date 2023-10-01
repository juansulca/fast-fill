import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast fill",
  description: "Simple multiplayer game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen p-24">
            <div className="max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col mx-auto">
              <h1 className="text-3xl font-bold my-2">Fast Fill ⚡️</h1>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
