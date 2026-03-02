"use server";

import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "123456";

export async function login(username: string, password: string) {
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 horas
    });

    return { success: true };
  }

  return { success: false, message: "Credenciales incorrectas" };
}
