import { redirect } from "next/navigation";
import { useState } from "react";
import Chat from "./chat";
import type { PropsLlmApiKey } from "./local-storage-llm-api-key";
import Sandbox from "./sandbox";

export default function Vibecoder({ llmApiKey }: PropsLlmApiKey) {
  const [code, setCode] = useState("");

  const hasLlmApiKey = !!llmApiKey;

  if (!hasLlmApiKey) {
    redirect("/");
  }

  return (
    <div className="flex flex-row-reverse gap-2">
      <Sandbox code={code} />
      <Chat llmApiKey={llmApiKey} setCode={setCode} />
    </div>
  );
}
