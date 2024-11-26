import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import '@fontsource-variable/jetbrains-mono'

const inter = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: "MarkLive",
  description: "Edit markdown files in real-time and share them with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
