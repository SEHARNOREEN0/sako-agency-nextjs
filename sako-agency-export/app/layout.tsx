import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "SAKO — Future-Forward Digital Agency",
  description: "Bespoke digital experiences — Web, UI/UX, SEO, AR & AI — for brands that refuse to be average.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <div className="noise-overlay" />
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
