"use server";

import { api } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginResponseData {
  sessionId: string;
  user: {
    username: string;
    email: string;
  };
}

export async function loginAction(_: unknown, formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error, data } = await api.post<LoginResponseData>("/login", {
    email,
    password,
  });

  if (error || !data) {
    return {
      status: "error",
      message: error,
    };
  }

  cookieStore.set("user", JSON.stringify(data.user));
  cookieStore.set("sessionId", data.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  redirect("/dashboard");
}
