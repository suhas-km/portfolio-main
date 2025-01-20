"use client";

import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 w-[3rem] h-[3rem] 
        bg-opacity-90 backdrop-blur-[0.5rem] shadow-2xl rounded-full 
        flex items-center justify-center hover:scale-[1.15] active:scale-105 
        transition-all
        bg-gray-200 border border-gray-300
        dark:bg-gray-950 dark:border-gray-800"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <BsMoon className="text-gray-700 w-[1.2rem] h-[1.2rem]" />
      ) : (
        <BsSun className="text-gray-300 w-[1.2rem] h-[1.2rem]" />
      )}
    </button>
  );
}
