import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Role } from "./constants/Role";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Define which routes actually require a login
  const protectedRoutes = [
    "/dashboard",
    "/provider-dashboard",
    "/admin-dashboard",
    "/profile"
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const { data } = await userService.getSession();
  const user = data?.user;

  // 2. ONLY redirect to login if they are hitting a protected route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Role-Based Redirection (Authorization)
  if (user) {
    // Prevent Admins from accessing the basic User Dashboard
    if (user.role === Role.ADMIN && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    // Prevent Providers from accessing the basic User Dashboard
    if (user.role === Role.PROVIDER && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }

    // Prevent regular Users from accessing Admin or Provider areas
    const isAdminRoute = pathname.startsWith("/admin-dashboard");
    const isProviderRoute = pathname.startsWith("/provider-dashboard");

    if (isAdminRoute && user.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isProviderRoute && user.role !== Role.PROVIDER) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
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
  ],
};