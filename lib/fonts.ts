import { Archivo, Geist_Mono, Instrument_Serif, Manrope } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  variable: "--font-family-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const archivo = Archivo({
  variable: "--font-family-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const geistMono = Geist_Mono({
  variable: "--font-family-geist-mono",
  subsets: ["latin"],
});

export const manrope = Manrope({
  variable: "--font-family-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
