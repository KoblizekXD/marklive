import type { Metadata } from "next";
import "./globals.css";
import '@fontsource-variable/jetbrains-mono'

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
