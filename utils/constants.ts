import type { ChatStatus } from "ai";

export const MODEL = "gpt-5-nano-2025-08-07";

export const REGEX = {
  jsxCode: /```jsx\n((.|\n)+)```/,
  jsxText: /^(import (.|\n)*)$/,
  separation: /((?:\w|\s)+\W)\s(.+)/,
};

export const LLM_API_KEY_ID = "llmApiKey";

export const LOADING_STATUSES: ChatStatus[] = ["submitted", "streaming"];
