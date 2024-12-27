"use client";

import { Input, Spinner } from "@nextui-org/react";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";

export const ChatAI = ({ token }: { token: string }) => {
  const params = useParams();
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function chatAi(e: React.FormEvent<HTMLFormElement>) {
    const currentQuery = query.trim();
    if (!currentQuery) return;

    setLoading(true);
    e.preventDefault();
    setChatHistory((prev) => [...prev, query]);
    setQuery("");

    const res = await fetch(`http://localhost:8000/projects/${params.id}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: currentQuery }),
    });

    const data = await res.text();
    setChatHistory((chats) => [...chats, data]);
    setLoading(false);
  }

  return (
    <div className="relative bg-neutral-50/20 flex flex-col justify-between">
      <div className="space-y-4 overflow-y-auto px-8 pt-8 pb-4">
        {chatHistory.map((chat) => {
          const isUserMessage = chatHistory.indexOf(chat) % 2 === 0;

          if (isUserMessage) {
            return (
              <div key={chat} className="flex justify-end">
                <div className="bg-slate-50 prose w-fit text-sm p-4 rounded-lg">
                  <Markdown>{chat}</Markdown>
                </div>
              </div>
            );
          }

          return (
            <div key={chat} className="flex justify-start">
              <div className="bg-slate-100 prose text-sm w-fit p-4 rounded-lg">
                <Markdown>{chat}</Markdown>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2 text-xs items-center justify-start">
            <Spinner size="sm" />
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={chatAi} className="w-full px-4 ">
        <Input placeholder="Ask anything about the document" variant="bordered" value={query} onValueChange={(value) => setQuery(value)} />
        <div className="py-2 text-xs text-neutral-400 flex items-center gap-1">
          <Send size={10} />
          Enter to send chat
        </div>
      </form>
    </div>
  );
};
