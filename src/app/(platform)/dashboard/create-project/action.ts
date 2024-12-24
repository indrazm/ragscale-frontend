"use server";

import { api } from "@/utils/api";

export async function createProjectAction(_: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const document = formData.get("document") as File;

  const { error, message } = await api.post("/projects", {
    name,
    description,
    document,
  });

  console.log({ error, message });
}
