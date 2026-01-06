import { readFileSync } from "node:fs";
import path from "node:path";
import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  type SystemModelMessage,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { MODEL } from "./constants";

const MARKDOWN = path.join(process.cwd(), "utils/jsx-prompt.md");

const SYSTEM_PROMPT = {
  role: "system",
  content: readFileSync(MARKDOWN, "utf-8"),
} satisfies SystemModelMessage;

const MAX_STEPS = 5;

export const streamTextResult = async (
  messages: UIMessage[],
  apiKey: string,
) => {
  const openai = createOpenAI({ apiKey });

  return streamText({
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(MAX_STEPS),
    model: openai(MODEL),
  });
};
