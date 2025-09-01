import { redirect } from "next/navigation";
import Chat from "./chat";
import type { PropsLlmApiKey } from "./local-storage-llm-api-key";

export default function Vibecoder({ llmApiKey }: PropsLlmApiKey) {
  const hasLlmApiKey = !!llmApiKey;

  if (!hasLlmApiKey) {
    redirect("/");
  }

  return <Chat />;
}
