import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/shared/Navbar.component";
import { Providers } from "./providers";
import Breakpoint from "@/shared/Breakpoint.component";
import Footer from "@/shared/Footer.component";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  variable: "--font-clash-display",
});

// const clashDisplay = localFont({
//   src: [
//     {
//       path: '../../public/fonts/ClashDisplay-Regular.otf',
//       weight: '400',
//       variable: "--font-clash-display",
//     },
//     {
//       path: './Roboto-Italic.woff2',
//       weight: '400',
//     },
//     {
//       path: './Roboto-Bold.woff2',
//       weight: '700',
//     },
//     {
//       path: './Roboto-BoldItalic.woff2',
//       weight: '700',
//     },
//   ],
// })

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
