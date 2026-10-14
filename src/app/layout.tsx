import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/layout/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

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

const themeScript = `(function(){try{var t=localStorage.getItem("mintforge-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);document.documentElement.dataset.theme=t;if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="mf-page-shell">
            <SiteHeader />
            <main className="mf-main-content">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
