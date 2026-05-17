import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/widgets/Providers";

const baseUrl = "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Classified — Доска объявлений",
    template: "%s | Classified",
  },
  description:
    "Здесь находят спрос и предложение друг друга. Площадка для размещения объявлений и услуг.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Classified — Доска объявлений",
    description:
      "Здесь находят спрос и предложение друг друга. Площадка для размещения объявлений и услуг.",
    url: baseUrl,
    siteName: "Classified",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
