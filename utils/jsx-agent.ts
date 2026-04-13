import { readFileSync } from "node:fs";
import path from "node:path";
import { createOpenAI } from "@ai-sdk/openai";
import { type SystemModelMessage, stepCountIs, ToolLoopAgent } from "ai";
import { MODEL } from "./constants";

const MARKDOWN = path.join(process.cwd(), "utils/jsx-prompt.md");

const SYSTEM_PROMPT = {
  role: "system",
  content: readFileSync(MARKDOWN, "utf-8"),
} satisfies SystemModelMessage;

const MAX_STEPS = 5;

export const jsxAgent = (apiKey: string) => {
  const openai = createOpenAI({ apiKey });

  return new ToolLoopAgent({
    instructions: SYSTEM_PROMPT,
    stopWhen: stepCountIs(MAX_STEPS),
    model: openai(MODEL),
  });
};
