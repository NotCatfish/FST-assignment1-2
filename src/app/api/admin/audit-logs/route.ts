import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const roleHeader = request.headers.get("x-user-role");

  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { timestamp: "desc" },
      take: 25,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      roleValidated: roleHeader ?? "ADMIN",
      count: logs.length,
      auditLogs: logs,
    });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);
    return NextResponse.json(
      { error: "Internal Server Error fetching audit logs" },
      { status: 500 }
    );
  }
}
