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
  const publicRoutes = [["web-configs", "validate"]]; // rutas públicas

  // Comprobar si la ruta actual está en la lista de rutas públicas
  const isPublic = publicRoutes.some(
    (route) =>
      route.length === path.length && route.every((seg, i) => seg === path[i]),
  );

  // Construir URL del backend
  const url = `${env.API_URL}/${path.join("/")}${req.nextUrl.search}`;
  console.log(url);

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(isPublic ? {} : { "x-user-id": req.headers.get("x-user-id")! }),
    },
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.text(),
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: res.headers,
  });
}
