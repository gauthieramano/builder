import type { UIMessage } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { streamTextResult } from "@/utils/jsx-agent";

// Allow streaming responses up to 2 minutes
export const maxDuration = 120;

type JsonRequest = {
  llmApiKey: string;
  messages: UIMessage[];
};

export async function POST(req: Request) {
  const { llmApiKey, messages }: JsonRequest = await req.json();

  const result = await streamTextResult(messages, llmApiKey);

  return result.toUIMessageStreamResponse();
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
