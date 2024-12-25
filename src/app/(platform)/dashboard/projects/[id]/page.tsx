import type { Project } from "@/models/entity";
import { api } from "@/utils/api";
import { ChatAI } from "./chatAi";
import { Status } from "./status";

interface DashboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;
  const { error, data } = await api.get<Project>(`/projects/${id}`);

  if (error || !data) {
    return <div>Project not found</div>;
  }

  return (
    <main className="space-y-6 h-[75vh]">
      <section className="space-y-2">
        <div className="flex gap-2 items-center">
          <h3>{data?.name}</h3>
          <Status status={data.status} />
        </div>
        <p>{data?.description}</p>
      </section>
      <section className="grid grid-cols-2 h-full">
        <iframe src={`http://localhost:8000/public/${data.id}/${data.document}`} width="100%" height="100%" title="PDF Viewer" />
        <ChatAI projectId={data.id} />
      </section>
    </main>
  );
}
