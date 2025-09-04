import type { ChatStatus } from "ai";

export const REGEX = {
  JSX_CODE: /```jsx\n((.|\n)+)```/,
  JSX_TEXT: /^(import (.|\n)*)$/,
  SEPARATION: /((?:\w|\s)+\W)\s(.+)/,
};

export const LLM_API_KEY_ID = "llmApiKey";

export const LOADING_STATUSES: ChatStatus[] = ["submitted", "streaming"];
