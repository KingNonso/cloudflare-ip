import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP Details App",
  description: "View your IP and location details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
