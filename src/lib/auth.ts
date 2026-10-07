import { NextRequest } from "next/server";

export type UserRole = "ADMIN" | "MEMBER" | "GUEST";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export function parseSessionFromRequest(req: NextRequest): SessionUser | null {
  // Check for authentication cookie or authorization header
  const authCookie = req.cookies.get("session_token")?.value;
  const authHeader = req.headers.get("authorization");

  if (!authCookie && !authHeader) {
    return null;
  }

  // Simulated session validation matching Better Auth session token parsing
  const token = authCookie || authHeader?.replace("Bearer ", "");
  if (token === "admin-session-token") {
    return {
      id: "admin-root",
      email: "indraneel@portfolio.dev",
      name: "Indraneel Samanta",
      role: "ADMIN",
    };
  }

  if (token === "member-session-token") {
    return {
      id: "member-user",
      email: "collaborator@portfolio.dev",
      name: "Portfolio Collaborator",
      role: "MEMBER",
    };
  }

  return {
    id: "guest-user",
    email: "guest@portfolio.dev",
    name: "Guest Visitor",
    role: "GUEST",
  };
}
