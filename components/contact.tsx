"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-600 mt-4 dark:text-white/80">
        Contact me directly at{" "}
        <a className="underline text-blue-600 dark:text-blue-400" href="mailto:suhaskm23@gmail.com">
          suhaskm23@gmail.com
        </a>{" "}
        /{" "}
        <a className="underline text-blue-600 dark:text-blue-400" href="mailto:km.s@northeastern.edu">
          km.s@northeastern.edu
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col text-gray-800 dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="h-14 px-4 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <div className="flex justify-end mt-2">
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  );
}
