"use client";

import { Input } from "@nextui-org/react";
import { Send } from "lucide-react";
interface ChatAIProps {
  projectId: string;
}

export const ChatAI = ({ projectId }: ChatAIProps) => {
  return (
    <div className="relative bg-neutral-50/20 px-4 pt-4 pb-2 flex flex-col justify-between h-full">
      <form className="absolute w-full bottom-0 left-0 px-4">
        <Input
          placeholder="Ask anything about the document"
          variant="bordered"
        />
        <div className="py-2 text-xs text-neutral-400 flex items-center gap-1">
          <Send size={10} />
          Enter to send chat
        </div>
      </form>
    </div>
  );
};
