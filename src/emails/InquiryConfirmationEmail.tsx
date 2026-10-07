import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface InquiryConfirmationEmailProps {
  name: string;
  projectType: string;
  budget: string;
  inquiryId: string;
}

export function InquiryConfirmationEmail({
  name = "Valued Client",
  projectType = "Full-Stack Web Application",
  budget = "$1k - $5k",
  inquiryId = "INQ-DEMO-001",
}: InquiryConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            maxWidth: "600px",
          }}
        >
          <Heading style={{ color: "#111827", fontSize: "20px", marginBottom: "16px" }}>
            Inquiry Acknowledgment
          </Heading>
          <Text style={{ color: "#374151", fontSize: "14px", lineHeight: "24px" }}>
            Hello <strong>{name}</strong>,
          </Text>
          <Text style={{ color: "#374151", fontSize: "14px", lineHeight: "24px" }}>
            Thank you for reaching out through my developer portfolio. Your project specifications have been securely received and recorded into my Prisma database pipeline.
          </Text>

          <Section
            style={{
              backgroundColor: "#f3f4f6",
              padding: "16px",
              borderRadius: "6px",
              margin: "20px 0",
            }}
          >
            <Text style={{ margin: "4px 0", fontSize: "13px", color: "#1f2937" }}>
              <strong>Tracking Reference:</strong> {inquiryId}
            </Text>
            <Text style={{ margin: "4px 0", fontSize: "13px", color: "#1f2937" }}>
              <strong>Domain:</strong> {projectType}
            </Text>
            <Text style={{ margin: "4px 0", fontSize: "13px", color: "#1f2937" }}>
              <strong>Budget Range:</strong> {budget}
            </Text>
          </Section>

          <Text style={{ color: "#4b5563", fontSize: "13px" }}>
            I will review your technical requirements and respond with an architectural blueprint shortly.
          </Text>
          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={{ color: "#9ca3af", fontSize: "12px", textAlign: "center" }}>
            Indraneel Samanta • Full-Stack Portfolio Architecture
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
