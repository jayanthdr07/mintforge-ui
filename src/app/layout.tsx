import type { Metadata } from "next";
import "@/styles/design-tokens.css";
import "./globals.css";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: "Mintforge UI — Build Consistently. Customize Freely.",
  description:
    "An open-source UI ecosystem by NEXYOUTH for React, Next.js, and React Native. Explore reusable components, blocks, and templates.",
  applicationName: "Mintforge UI",
  keywords: [
    "Mintforge UI",
    "React components",
    "Next.js UI library",
    "React Native components",
    "open-source design system",
    "NEXYOUTH",
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("mintforge-theme");if(!t){t="dark";}document.documentElement.setAttribute("data-theme",t);document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.css"
        />
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="mf-page-shell mf-site">
            <SiteHeader />
            <main className="mf-main-content">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
