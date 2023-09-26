import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/shared/layout/Navbar.layout";
import { Providers } from "./providers";
import Breakpoint from "@/shared/utils/Breakpoint.component";
import Footer from "@/shared/layout/Footer.layout";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  variable: "--font-clash-display",
});

export const metadata: Metadata = {
  title: "La Palme Verte",
  description:
    "Association étudiante de plongée sous-marine fondée en 2005 à l'UBS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${archivo.variable} ${clashDisplay.variable}`}>
      <body className="font-body">
        <Providers>
          <Navigation />
          {children}
          <Breakpoint />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
