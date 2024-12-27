"use server";

import { api } from "@/utils/api";

interface EmbeddingDocuments {
  id: string;
  pageContent: string;
  score: number;
}

export async function semanticSearchAction(_: unknown, formData: FormData) {
  const query = formData.get("query");
  const projectId = formData.get("projectId");

  const { error, data, message } = await api.post<EmbeddingDocuments[]>(`/projects/${projectId}/search`, { query });

  if (error || !data) {
    return { status: "error", message };
  }

  return { data };
}
