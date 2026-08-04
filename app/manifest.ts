import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KYIRA ENERGIES",
    short_name: "KYIRA",
    description:
      "Récupération de chaleur pour bâtiments tertiaires : valorisez la chaleur perdue de vos installations frigorifiques.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#152e4b",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
