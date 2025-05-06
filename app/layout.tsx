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
        className={`${inter.className} dark:bg-gray-950 dark:text-gray-100 bg-gradient-to-b from-[#f9f8ff] to-[#fff2fa] text-gray-800 relative pt-28 sm:pt-36 overflow-x-hidden`}
      >
        {/* Enhanced background gradients */}
        <div className="absolute inset-0 -z-20 dark:bg-[linear-gradient(to_bottom,#0c0a20,#1a0c2e)] dark:opacity-95 bg-[linear-gradient(to_bottom,#f7f5ff,#fff1f9)] opacity-90"></div>
        
        {/* Top gradient bloom */}
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.25),transparent_60%)] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"></div>
        
        {/* Bottom left gradient bloom */}
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(219,39,119,0.18),transparent_70%)] bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,88,12,0.08),transparent_60%)] pointer-events-none"></div>
        
        {/* Bottom right accent */}
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.15),transparent_75%)] bg-[radial-gradient(circle_at_bottom_right,rgba(192,38,211,0.07),transparent_70%)] pointer-events-none"></div>
        
        {/* Center subtle glow */}
        <div className="absolute inset-0 -z-10 dark:bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.08),transparent_45%)] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06),transparent_50%)] pointer-events-none animate-pulse"></div>
        
        {/* Diagonal accent in light mode */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,rgba(217,70,239,0.12),rgba(79,70,229,0.08)_30%,transparent_60%)] dark:opacity-0 pointer-events-none"></div>
        
        {/* Light mode floating gradient particles */}
        <div className="absolute top-40 left-[20%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08),transparent_80%)] filter blur-xl dark:opacity-0 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-32 right-[25%] w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.07),transparent_80%)] filter blur-xl dark:opacity-0 animate-pulse pointer-events-none"></div>
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
