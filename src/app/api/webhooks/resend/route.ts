import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const eventType = payload.type || "email.delivered";
    const recipient = payload.data?.to?.[0] || payload.data?.email || "unknown@recipient.com";
    const emailId = payload.data?.email_id || payload.id || "resend-evt";

    console.log(`[Resend Webhook] Ingested event '${eventType}' for ${recipient}`);

    // Persist webhook lifecycle event to Prisma AuditLog
    await prisma.auditLog.create({
      data: {
        action: `WEBHOOK_${eventType.toUpperCase().replace(/\./g, "_")}`,
        actor: recipient,
        details: `Event ${eventType} recorded for message ${emailId}. Payload: ${JSON.stringify(
          payload.data ?? {}
        ).slice(0, 200)}`,
      },
    });

    return NextResponse.json({
      received: true,
      event: eventType,
      persistedToAuditLog: true,
    });
  } catch (error) {
    console.error("Error processing Resend webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 400 }
    );
  }
}
