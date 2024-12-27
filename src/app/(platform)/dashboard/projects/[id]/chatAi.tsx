"use client";

import { Input } from "@nextui-org/react";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ChatAI = () => {
  const params = useParams();
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [response, setResponse] = useState("");

  async function chatAi(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setChatHistory((prev) => [...prev, query]);

    const res = await fetch(`http://localhost:8000/projects/${params.id}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer cm53yc2u50000rcfh831tfa72",
      },
      body: JSON.stringify({ query }),
    });

    setQuery("");
    const data = await res.text();
    console.log(data);

    // chat typing effect
    let i = 0;
    const typeWriter = () => {
      if (i < data.length) {
        setResponse((prev) => prev + data.charAt(i));
        i++;
        setTimeout(typeWriter, 1);
      }
    };

    typeWriter();
    if (i === data.length) {
      setChatHistory((prev) => [...prev, data]);
      setResponse("");
    }
  }

  return (
    <div className="relative bg-neutral-50/20 px-4 pt-4 pb-2 flex flex-col justify-between h-full">
      <div>
        {chatHistory.map((chat) => {
          return <div key={chat}>{chat}</div>;
        })}
        {response && <div>{response}</div>}
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
