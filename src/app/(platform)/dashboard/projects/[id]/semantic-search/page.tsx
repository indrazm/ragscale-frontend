import type { Project } from "@/models/entity";
import { api } from "@/utils/api";
import { Status } from "../status";

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
    <main>
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <h3>Semantic Search</h3>
          <Status status={data.status} />
        </div>
        <p>Project name : {data.name}</p>
      </div>
    </main>
  );
}
