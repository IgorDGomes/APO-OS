import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APO'S",
  description:
    "Experience a virtual operating system with interactive features and customizations. Dive into a creative, futuristic digital environment today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-hidden`}>{children}</body>
    </html>
  );
}
