"use client";

import { Input } from "@nextui-org/react";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ChatAI = () => {
  const params = useParams();
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  async function chatAi(e: React.FormEvent<HTMLFormElement>) {
    const currentQuery = query.trim();
    e.preventDefault();
    setChatHistory((prev) => [...prev, query]);
    setQuery("");

    const res = await fetch(`http://localhost:8000/projects/${params.id}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer cm56tc2z60000m8s0i7np7gkt",
      },
      body: JSON.stringify({ query: currentQuery }),
    });

    const data = await res.text();
    setChatHistory((chats) => [...chats, data]);
  }

  return (
    <div className="relative bg-neutral-50/20 px-8 pt-8 pb-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {chatHistory.map((chat) => {
          const even = chatHistory.indexOf(chat) % 2 === 0;
          return (
            <div key={chat} className={`text-sm ${even ? "text-right" : "text-left"}`}>
              {chat}
            </div>
          );
        })}
      </div>
      <form onSubmit={chatAi} className="absolute w-full bottom-0 left-0 px-4">
        <Input placeholder="Ask anything about the document" variant="bordered" value={query} onValueChange={(value) => setQuery(value)} />
        <div className="py-2 text-xs text-neutral-400 flex items-center gap-1">
          <Send size={10} />
          Enter to send chat
        </div>
      </form>
    </div>
  );
};
