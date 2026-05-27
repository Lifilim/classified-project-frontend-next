import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { Providers } from "@/widgets/Providers";

// const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const siteConfig = {
  name: "Classified",
  title: 'Classified "--- доска бредовых и не очень объявлений',
  description:
    "Здесь спрос и предложение находят друг друга. Площадка для размещения объявлений и услуг.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ogImage: "/favicon.ico",
};

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: "%s | Classified" },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: `${siteConfig.url}${siteConfig.ogImage}` }], //, width: 1200, height: 630
    siteName: siteConfig.name,
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
