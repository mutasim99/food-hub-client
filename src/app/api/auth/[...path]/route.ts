import { env } from "@/env";
import { NextRequest } from "next/server";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");

  const res = await fetch(`${env.AUTH_URL}/${path}`, {
    method: request.method,
    headers: {
      "content-type": request.headers.get("content-type") || "application/json",
      cookie: request.headers.get("cookie") || "",
    },
    body: request.method !== "GET" ? await request.text() : undefined,
    cache: "no-cache",
    redirect: "manual",
  });

  const body = await res.text();
  const headers = new Headers();

  res.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      headers.append("set-cookie", value);
    }
  });

  const location = res.headers.get("location");
  if (location) {
    headers.set("location", location);
  }

  headers.set(
    "content-type",
    res.headers.get("content-type") || "application/json"
  );

  return new Response(body, { status: res.status, headers });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
