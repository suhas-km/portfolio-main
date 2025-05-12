"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  try {
    // Get form data
    const senderName = formData.get("senderName");
    const senderEmail = formData.get("senderEmail");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Validate form data
    if (!validateString(senderName, 100)) {
      return {
        error: "Please provide a valid name (max 100 characters)",
      };
    }
    if (!validateString(senderEmail, 500)) {
      return {
        error: "Please provide a valid email address (max 500 characters)",
      };
    }
    if (!validateString(subject, 200)) {
      return {
        error: "Please provide a subject (max 200 characters)",
      };
    }
    if (!validateString(message, 5000)) {
      return {
        error: "Please provide a message (max 5000 characters)",
      };
    }

    try {
      // Send email
      const data = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: "suhaskm23@gmail.com",
        subject: `${subject} from ${senderName}`,
        reply_to: senderEmail,
        react: React.createElement(ContactFormEmail, {
          message: message,
          senderEmail: senderEmail,
          senderName: senderName,
          subject: subject,
        }),
      });

      // Validate response
      if (!data || !data.id) {
        console.error("Invalid response from email service", data);
        return {
          error: "Failed to send email. Please try again later.",
        };
      }

      return {
        data,
      };

    } catch (error: unknown) {
      console.error("Email sending failed:", error);
      return {
        error: "Failed to send email. Please try again later.",
      };
    }
  } catch (error: unknown) {
    console.error("Form processing error:", error);
    return {
      error: "Failed to process form. Please try again later.",
    };
  }
};
