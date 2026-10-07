import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionFromRequest } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept Admin Route Segments
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const session = parseSessionFromRequest(request);

    // 1. Unauthenticated Gate
    if (!session) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Unauthorized: Active session required to access this endpoint" },
          { status: 401 }
        );
      }
      const loginUrl = new URL("/?auth_required=true", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Role-Based Access Control (RBAC) Enforcement
    if (session.role !== "ADMIN") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          {
            error: `Forbidden: Role '${session.role}' lacks administrative clearance`,
            requiredRole: "ADMIN",
          },
          { status: 403 }
        );
      }
      const forbiddenUrl = new URL("/?forbidden=true", request.url);
      return NextResponse.redirect(forbiddenUrl);
    }

    // Pass validated session header downstream
    const response = NextResponse.next();
    response.headers.set("x-user-role", session.role);
    response.headers.set("x-user-id", session.id);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
