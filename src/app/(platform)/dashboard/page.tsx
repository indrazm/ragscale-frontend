import { api } from "@/utils/api";

export default async function DashboardPage() {
  const { data } = await api.get("/projects");
  console.log(data);

  return (
    <div>
      <section>
        <h3>Projects</h3>
        <p>Projects will be listed here</p>
      </section>
    </div>
  );
}
