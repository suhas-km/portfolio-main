import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suhas | Personal Portfolio",
  description: "Suhas is a software engineer specializing in AI/ML and cloud solutions.",
  icons: {
    icon: '/s-favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth overflow-x-hidden">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%232d1a45'/><text x='50' y='65' font-family='Arial' font-size='60' font-weight='bold' text-anchor='middle' fill='white'>S</text></svg>"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${inter.className} dark:bg-gray-950 dark:text-gray-100 bg-[#f2f2f5] text-gray-800 relative pt-28 sm:pt-36 overflow-x-hidden`}
      >
        {/* Dark mode background gradients */}
        <div className="absolute inset-0 -z-20 dark:bg-[linear-gradient(to_bottom,#0f172a,#1e1b4b)] dark:opacity-95 bg-[linear-gradient(to_bottom,#e6e6ec,#e0e0ea)] opacity-90"></div>
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2),transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.1),transparent_70%)] bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(1000px_circle_at_70%_30%,rgba(16,185,129,0.05),transparent)] bg-[radial-gradient(1000px_circle_at_70%_30%,rgba(16,185,129,0.1),transparent)] pointer-events-none"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
