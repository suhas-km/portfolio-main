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
        text-gray-900 dark:text-white
        ${className}`}
    >
      {children}
    </h2>
  );
}
