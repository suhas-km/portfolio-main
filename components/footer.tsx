import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 md:mb-0 text-sm text-center md:text-left">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                Suhas K M | Portfolio
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                &copy; {currentYear}. All rights reserved.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-3">
              <a 
                href="https://www.linkedin.com/in/suhaskm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a 
                href="https://github.com/suhas-km" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
            </div>
            <div className="text-center md:text-right text-xs text-gray-500 dark:text-gray-400">
              <p>Built with Next.js, TypeScript, Tailwind CSS</p>
              <p>Framer Motion, React Email & Resend</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
