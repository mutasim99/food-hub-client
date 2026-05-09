import { NextRequest, NextResponse } from "next/server";
import { Role } from "./constants/Role";
import { env } from "@/env";

async function getSession(request: NextRequest) {
  console.log("AUTH_URL:", env.AUTH_URL);
  console.log("cookies:", request.headers.get("cookie"));
  try {
    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-cache",
    });
    console.log("status:", res.status);
    const session = await res.json();
    console.log("session:", JSON.stringify(session));
    return session ?? null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/provider-dashboard",
    "/admin-dashboard",
    "/profile",
    "/orders",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const data = await getSession(request);
  const user = data?.user;

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user) {
    if (user.role === Role.ADMIN && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (user.role === Role.PROVIDER && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL("/provider-dashboard/myOrders", request.url)
      );
    }
    if (pathname.startsWith("/admin-dashboard") && user.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
    }
    if (
      pathname.startsWith("/provider-dashboard") &&
      user.role !== Role.PROVIDER
    ) {
      return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
    }
    if (
      user.role === Role.CUSTOMER &&
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/provider-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/profile/:path*",
    "/orders/:path*",
  ],
};
