import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Baking School - Master the Art of Baking",
  description: "Transform your passion for baking into a rewarding career with our comprehensive courses. Learn from expert chefs and create delicious memories.",
  keywords: "the baking school, pastry courses, bread making, cake decorating, culinary education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
