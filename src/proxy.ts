import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/user.action";
import { Role } from "./constants/Role";
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const customerOnlyRoutes = ["/cart", "/checkout", "/orders"];
  const authenticatedRoutes = ["/profile"];

  const { data } = await getSession();
  const isCustomerOnly =
    customerOnlyRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    ) ||
    pathname.startsWith("/dashboard");
  const isAuthenticatedOnly =
    authenticatedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    ) ||
    pathname.startsWith("/provider-dashboard") ||
    pathname.startsWith("/admin-dashboard");

  if (!data && (isCustomerOnly || isAuthenticatedOnly)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!data) {
    return NextResponse.next();
  }

  /* Customer protection  */
  if (pathname === "/dashboard" && data.user.role === Role.CUSTOMER) {
    return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
  }

  if (
    customerOnlyRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    ) &&
    data.user.role !== Role.CUSTOMER
  ) {
    if (data.user.role === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (data.user.role === Role.PROVIDER) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  /* Admin protection */
  if (
    pathname.startsWith("/admin-dashboard") &&
    data.user.role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
  }

  /* Provider protection */
  if (
    pathname.startsWith("/provider-dashboard") &&
    data.user.role !== Role.PROVIDER
  ) {
    return NextResponse.redirect(new URL("/dashboard/my-order", request.url));
  }

  /* cross role protection*/
  if (pathname.startsWith("/dashboard") && data.user.role !== Role.CUSTOMER) {
    if (data.user.role === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (data.user.role === Role.PROVIDER) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/cart",
    "/checkout",
    "/orders",
    "/orders/:path*",
    "/profile",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
