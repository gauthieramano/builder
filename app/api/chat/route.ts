import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// Allow streaming responses up to 2 minutes
export const maxDuration = 120;

const MODEL = "gpt-5-nano-2025-08-07";

type JsonRequest = {
  messages: UIMessage[];
};

export async function POST(req: Request) {
  const { messages }: JsonRequest = await req.json();

  const result = streamText({
    model: openai(MODEL),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
