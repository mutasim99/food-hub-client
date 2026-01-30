import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Role } from "./constants/Role";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isProvider = false;
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();


  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Role.ADMIN;
    isProvider = data.user.role === Role.PROVIDER;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /* Admin protection */
  if (pathname.startsWith("/admin-dashboard") && data.user.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /* Provider protection */
  if (pathname.startsWith("/provider-dashboard") && data.user.role !== Role.PROVIDER) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /* Customer protection */
  if (pathname.startsWith("/dashboard") && data.user.role !== Role.CUSTOMER) {
    if (data.user.role === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (data.user.role === Role.PROVIDER) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
