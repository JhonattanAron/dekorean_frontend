import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
type Context = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(req: NextRequest, context: Context) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, context: Context) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PUT(req: NextRequest, context: Context) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PATCH(req: NextRequest, context: Context) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function DELETE(req: NextRequest, context: Context) {
  const { path } = await context.params;
  return proxy(req, path);
}

async function proxy(req: NextRequest, path: string[]) {
  const publicRoutes = [["web-configs", "validate"]];

  const isPublic = publicRoutes.some(
    (route) =>
      route.length === path.length && route.every((seg, i) => seg === path[i]),
  );

  const url = `${env.API_URL}/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host"); // evita conflictos

  if (!isPublic) {
    const userId = req.headers.get("x-user-id");
    if (userId) headers.set("x-user-id", userId);
  }

  const res = await fetch(url, {
    method: req.method,
    headers,
    body: req.body, // 🔑 pasar el stream sin leerlo
    duplex: "half", // requerido en Node/Next para streams
  } as any);

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
