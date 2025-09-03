import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// Allow streaming responses up to 2 minutes
export const maxDuration = 120;

const MODEL = "gpt-5-nano-2025-08-07";

type JsonRequest = {
  llmApiKey: string;
  messages: UIMessage[];
};

export async function POST(req: Request) {
  const { llmApiKey, messages }: JsonRequest = await req.json();

  const openai = createOpenAI({ apiKey: llmApiKey });

  const result = streamText({
    model: openai(MODEL),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
