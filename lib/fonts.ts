import { Archivo, Geist_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const editorialNew = localFont({
  src: [
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-Regular-BF644b214ff145f.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-Ultrabold-BF644b21500840c.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/editorial-new-font-family/PPEditorialNew-UltraboldItalic-BF644b214faef01.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-family-editorial-new",
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
