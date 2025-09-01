import { redirect } from "next/navigation";
import Chat from "./chat";
import type { PropsLlmApiKey } from "./local-storage-llm-api-key";
import Sandbox from "./sandbox";

export default function Vibecoder({ llmApiKey }: PropsLlmApiKey) {
  const hasLlmApiKey = !!llmApiKey;

  if (!hasLlmApiKey) {
    redirect("/");
  }

  return (
    <div className="flex flex-row-reverse gap-2">
      <Sandbox />
      <Chat llmApiKey={llmApiKey} />
    </div>
  );
}
