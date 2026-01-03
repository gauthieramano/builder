import { redirect } from "next/navigation";
import type { PropsLlmApiKey } from "./local-storage-llm-api-key";

export default function Vibecoder({ llmApiKey }: PropsLlmApiKey) {
  const hasLlmApiKey = !!llmApiKey;

  if (!hasLlmApiKey) {
    redirect("/");
  }

  return <div className="h-full content-center text-center">VIBECODER</div>;
}
