import { Logo } from "@/components/logo";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value
    ? JSON.parse(cookieStore.get("user")?.value as string)
    : null;

  return (
    <main>
      <header className="flex justify-between place-items-center h-16 px-4 border-b">
        <div className="flex gap-6 items-center">
          <Logo />
          <Button
            as={Link}
            href="/dashboard/create-project"
            size="sm"
            variant="bordered"
            disableRipple
            startContent={<Plus size={12} />}
          >
            Create Project
          </Button>
        </div>
        <nav className="flex items-center gap-4 font-medium tracking-tight">
          <Link href="/dashboard">projects</Link>
          <div>{user.username}</div>
        </nav>
      </header>
      <div className="max-w-6xl m-auto py-12">{children}</div>
    </main>
  );
}
