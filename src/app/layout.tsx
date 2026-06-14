import type { Metadata } from "next";
import "./globals.css";
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "LvkkSyringa's Journey",
  description: "Not a portfolio website. A digital journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-black text-white antialiased overflow-hidden">
        <Background />
        {children}
      </body>
    </html>
  );
}
