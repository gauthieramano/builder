import type { ChatStatus } from "ai";

export const REGEX = {
  jsxCode: /```jsx\n((.|\n)+)```/,
  jsxText: /^(import (.|\n)*)$/,
  separation: /((?:\w|\s)+\W)\s(.+)/,
};

export const LLM_API_KEY_ID = "llmApiKey";

export const LOADING_STATUSES: ChatStatus[] = ["submitted", "streaming"];
