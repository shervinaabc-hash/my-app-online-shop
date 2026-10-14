import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Layout from "@/src/components/layout"
import ShopingCartItemProvider from "@/src/context/ShopingCartItemPro";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "آفتاب انرژی | پنل خورشیدی، اینورتر و باتری",
  description: "نمونه‌کار فروشگاه تجهیزات انرژی خورشیدی با Next.js و Tailwind CSS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ShopingCartItemProvider>
          <Layout>{children}</Layout>
        </ShopingCartItemProvider>
      </body>
    </html>
  );
}
