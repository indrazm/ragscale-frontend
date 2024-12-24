"use client";

import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { useActionState } from "react";
import { createProjectAction } from "./action";

export default function CreateProjectPage() {
  const [state, formData, pending] = useActionState(createProjectAction, null);

  return (
    <div className="max-w-xl m-auto space-y-4">
      <section>
        <h3>Create Project</h3>
        <p>Form will be here</p>
      </section>
      <form action={formData} className="space-y-2">
        <Input name="name" variant="bordered" placeholder="Project Name" />
        <Textarea
          name="description"
          variant="bordered"
          placeholder="Project Description"
          minRows={12}
        />
        <Input accept=".pdf" name="document" type="file" variant="bordered" />
        <Checkbox name="accept" id="accept" className="block">
          <span className="text-sm">
            I accept that ragscale would process my document
          </span>
        </Checkbox>
        <Button
          isDisabled={pending}
          type="submit"
          color="primary"
          startContent={<Upload size={14} />}
        >
          Create Project
        </Button>
      </form>
    </div>
  );
}
