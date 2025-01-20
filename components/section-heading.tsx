"use client";

import React from "react";

export default function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 
      className={`text-4xl font-bold capitalize mb-8 text-center tracking-tight 
        bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200 
        bg-clip-text text-transparent
        ${className}`}
    >
      {children}
    </h2>
  );
}
