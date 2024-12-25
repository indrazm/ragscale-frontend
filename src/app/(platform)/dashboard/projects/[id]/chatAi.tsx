"use client";

import { Input } from "@nextui-org/react";

interface ChatAIProps {
  projectId: string;
}

export const ChatAI = ({ projectId }: ChatAIProps) => {
  return (
    <div className="bg-neutral-50/20 p-4 flex flex-col justify-between h-full">
      <div>Project : {projectId}</div>
      <form>
        <Input placeholder="Ask anything about the document" variant="bordered" />
      </form>
    </div>
  );
};
