import type { Project } from "@/models/entity";
import { api } from "@/utils/api";
import NextLink from "next/link";
import { Status } from "../status";
import { FormSemanticSearch } from "./form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { error, data } = await api.get<Project>(`/projects/${id}`);

  if (error || !data) {
    return <div>Project not found</div>;
  }

  return (
    <main className="space-y-6">
      <section className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <h3>Semantic Search</h3>
            <Status status={data.status} />
          </div>
          <p>Project name : {data.name}</p>
        </div>
        <div className="space-x-4">
          <NextLink href={`/dashboard/projects/${data.id}/semantic-search`}>Semantic Search</NextLink>
          <NextLink href={`/dashboard/projects/${data.id}/`}>Chat</NextLink>
        </div>
      </section>
      <FormSemanticSearch />
    </main>
  );
}
