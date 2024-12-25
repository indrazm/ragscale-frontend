import type { Project } from "@/models/entity";
import { api } from "@/utils/api";
import { Card, CardBody, Link } from "@nextui-org/react";
import { Status } from "./projects/[id]/status";
import NextLink from "next/link";

export default async function DashboardPage() {
  const { data } = await api.get<Project[]>("/projects");

  return (
    <main className="space-y-6">
      <section className="pl-6 border-l">
        <h3>Projects</h3>
        <p>Projects will be listed here</p>
      </section>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((item) => {
          return (
            <Link key={item.id} href={`/dashboard/projects/${item.id}`} as={NextLink}>
              <Card shadow="sm" isHoverable disableRipple className="w-full">
                <CardBody className="space-y-2 p-6">
                  <div className="flex gap-2 items-center justify-between">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <Status status={item.status} />
                  </div>
                  <p>{item.description}</p>
                  <p className="text-xs text-neutral-500">{item.summary}</p>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
