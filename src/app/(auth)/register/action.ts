"use server";

import { api } from "@/utils/api";

export async function registerAction(_: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }

  const { error, message, data } = await api.post("/register", {
    username,
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: error,
    };
  }

  return {
    status: "success",
    message,
    data,
  };
}
