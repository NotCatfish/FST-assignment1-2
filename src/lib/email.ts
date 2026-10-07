import { Resend } from "resend";
import { InquiryConfirmationEmail } from "@/emails/InquiryConfirmationEmail";
import * as React from "react";

const resendApiKey = process.env.RESEND_API_KEY || "re_mock_development_key";
export const resend = new Resend(resendApiKey);

export async function sendInquiryConfirmationEmail({
  to,
  name,
  projectType,
  budget,
  inquiryId,
}: {
  to: string;
  name: string;
  projectType: string;
  budget: string;
  inquiryId: string;
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log(
        `[Resend Simulated Dispatch] Transactional notification queued for ${to} (Inquiry #${inquiryId})`
      );
      return {
        success: true,
        id: `mock-email-${Date.now()}`,
        simulated: true,
      };
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: `Project Inquiry Confirmation [Ref: ${inquiryId}]`,
      react: React.createElement(InquiryConfirmationEmail, {
        name,
        projectType,
        budget,
        inquiryId,
      }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send transactional email:", err);
    return { success: false, error: err };
  }
}
