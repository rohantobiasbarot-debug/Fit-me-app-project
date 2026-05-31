import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fit-me — Train Smarter, Live Better",
  description: "Your AI-powered fitness companion. Track workouts, monitor progress, and reach your goals faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
