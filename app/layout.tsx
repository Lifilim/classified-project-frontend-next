import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { Providers } from "@/widgets/Providers";

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const metadata: Metadata = {
  title: {
    default: "Classified — Доска объявлений",
    template: "%s | Classified",
  },
  description:
    "Здесь спрос и предложение находят друг друга. Площадка для размещения объявлений и услуг.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Classified — Доска объявлений",
    description:
      "Здесь спрос и предложение находят друг друга. Площадка для размещения объявлений и услуг.",
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
