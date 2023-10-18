import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiting Platform",
  description: "hackathon assignement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          {children}</body>
      </html>
  );
}
