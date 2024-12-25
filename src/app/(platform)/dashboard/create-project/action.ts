"use server";

import { api } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(_: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const document = formData.get("document") as File;

  const { error, message } = await api.post("/projects", {
    name,
    description,
    document,
  });

  if (error) {
    return {
      status: "error",
      message: message,
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
