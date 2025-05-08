"use client";

import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitBtnProps {
  className?: string;
  isSubmitting?: boolean;
}

export default function SubmitBtn({ className = "", isSubmitting = false }: SubmitBtnProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isSubmitting;

  return (
    <button
      type="submit"
      className={`group flex items-center justify-center gap-2 h-[3rem] w-[8rem] btn-secondary rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 transition-all ${className}`}
      disabled={isDisabled}
    >
      {isDisabled ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}
