import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  senderName: string;
  subject: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
  senderName,
  subject,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                New message: {subject}
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>From: {senderName}</Text>
              <Text>Email: {senderEmail}</Text>
              <Text>Subject: {subject}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
