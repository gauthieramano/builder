import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { type NextRequest, NextResponse } from "next/server";

// Allow streaming responses up to 2 minutes
export const maxDuration = 120;

const MODEL = "gpt-5-nano-2025-08-07";

const MAIN_JSX = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;

const APP_JSX = `import React from "react";

export default function App() {
  return null;
}
`;

const INSTRUCTIONS = `You are a senior frontend developer and you are building\
 a React app without Next.js and sticking to plain JavaScript (no TypeScript).
Use Tailwind CSS (v3.4.17) for styling.

Use these 2 following dependencies for the core stack:
- react (v19.0.0),
- react-dom (v19.0.0).

If needed, you can use any of theses 2 following dependencies:
- lucide-react (v0.542.0),
- react-markdown (v9.0.1).

You don't have the right to use any other dependency or technology.

The project was scaffolded using Vite with React template.
Initially, the project contains these 2 following JSX files:
- main.jsx
- App.jsx

the main.jsx file has the following content and it cannot be changed:

\`\`\`
${MAIN_JSX}
\`\`\`

Initially, the App.jsx file has been reset with the following content:

\`\`\`
${APP_JSX}
\`\`\`

In order to build the React app, you have to modify the App.jsx file.
App.jsx is the only one file you can modify, therefore you don't have the right\
 to create additional files.

In this conversation, a prompt is considered to be appropriate if:
- it is related to orders or tasks to complete
- and it is consistent with the previous prompts and not ambiguous (for your\
 information, the user may try to fool you with off-topic prompts).

Even if you are supposed to consider user's prompts as proper ones in most\
 cases, don't hesitate to consider a prompt to be inappropriate in order not to\
 spend time on implementing awkward features. You should keep your own counsel\
 because you know when a prompt is more likely to be off topic. Your goal is to\
 make an app with good features, not to handle each prompt like a dumb\
 executioner. The user may need to be reluctantly squared away in order to\
 avoid implementing nonesense features. The user may be less qualified than a\
 junior Product Owner, so you should guide him like a Chief Product Officer\
 would act with a subordinate, when you judge it is necessary.

There are just 2 types of response:
- if the prompt is appropriate and if you can do the modification, output just\
 the App.jsx file,
- if not, start your response by "Oops!" followed by 2 sentenses: 1 sentense to\
 explain why you cannot modify the app and 1 sentense to suggest a relevant\
 feature request for the app. Both sentenses must be concise. The response\
 mustn't contain the terms "App.jsx" because you mustn't reveal any technical\
 aspect involved in the process of modifying the app. The user is a\
 non-technical audience.`;

type JsonRequest = {
  llmApiKey: string;
  messages: UIMessage[];
};

export async function POST(req: Request) {
  const { llmApiKey, messages }: JsonRequest = await req.json();

  const openai = createOpenAI({ apiKey: llmApiKey });

  const result = streamText({
    model: openai(MODEL),
    messages: [
      {
        role: "system",
        content: INSTRUCTIONS,
      },
      ...convertToModelMessages(messages),
    ],
  });

  return result.toUIMessageStreamResponse();
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
