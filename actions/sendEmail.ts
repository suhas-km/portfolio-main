"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderName = formData.get("senderName");
  const senderEmail = formData.get("senderEmail");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderName, 100)) {
    return {
      error: "Invalid name",
    };
  }
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(subject, 200)) {
    return {
      error: "Invalid subject",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    // Check if API key is configured properly
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not defined");
      return {
        error: "Email configuration error. Please contact the administrator.",
      };
    }

    data = await resend.emails.send({
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
    
    // Check response validity
    if (!data || !data.id) {
      console.error("Undefined response from Resend API", data);
      return {
        error: "Failed to send email. Please try again later.",
      };
    }
    
  } catch (error: unknown) {
    console.error("Resend API error:", error);
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
