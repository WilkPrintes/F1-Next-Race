import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F1 Next Race ",
  description: "Fique sempre por dentro do calendário da F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={(inter.className, poppins.variable)}>{children}</body>
    </html>
  );
}
