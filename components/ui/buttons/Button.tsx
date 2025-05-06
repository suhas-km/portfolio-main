"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/context/theme-context";

/**
 * Types of buttons available in the application
 */
type ButtonType = "primary" | "secondary" | "outline" | "text";

/**
 * Props for the Button component
 */
type ButtonProps = Omit<HTMLMotionProps<"button">, 'buttonType'> & {
  /** Content to display inside the button */
  children: ReactNode;
  /** Type of button styling to apply */
  buttonType?: ButtonType;
  /** Optional icon to display before the button text */
  icon?: ReactNode;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Reusable Button component with built-in motion animations
 * Supports multiple button types and includes loading states
 */
export default function Button({
  children,
  buttonType = "primary",
  icon,
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  
  // Generate button styles based on type
  const getButtonStyles = (): string => {
    const baseStyles = "rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2";
    
    switch (buttonType) {
      case "primary":
        return `${baseStyles} px-7 py-3 text-white ${
          theme === "light" 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-blue-700 hover:bg-blue-600"
        }`;
      case "secondary":
        return `${baseStyles} px-4 py-2 ${
          theme === "light" 
            ? "bg-gray-200 text-gray-900 hover:bg-gray-300" 
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`;
      case "outline":
        return `${baseStyles} px-4 py-2 border ${
          theme === "light" 
            ? "border-gray-300 text-gray-900 hover:bg-gray-100" 
            : "border-gray-700 text-white hover:bg-gray-800"
        }`;
      case "text":
        return `${baseStyles} px-2 py-1 ${
          theme === "light" 
            ? "text-blue-600 hover:text-blue-700" 
            : "text-blue-400 hover:text-blue-300"
        }`;
      default:
        return baseStyles;
    }
  };

  return (
    <motion.button
      className={`${getButtonStyles()} ${className} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      whileHover={!isLoading ? { scale: 1.03 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}
