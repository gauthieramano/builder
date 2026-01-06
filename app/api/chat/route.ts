import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { jsxAgent } from "@/utils/jsx-agent";

// Allow streaming responses up to 2 minutes
export const maxDuration = 120;

type JsonRequest = {
  llmApiKey: string;
  messages: UIMessage[];
};

export async function POST(req: Request) {
  const { llmApiKey, messages }: JsonRequest = await req.json();

  return createAgentUIStreamResponse({
    agent: jsxAgent(llmApiKey),
    uiMessages: messages,
  });
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
