"use client";

import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import { Button } from "./ui/button";

const DEFAULT_CODE = `import React from "react";
import { Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";
export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-40% to-emerald-500 to-90% text-white">
      <div className="text-4xl">Hello, world!</div>
      <div className="flex items-center gap-2">
        <Edit size={24} />
        <ReactMarkdown>*This is **Markdown***</ReactMarkdown>
      </div>
    </div>
  );
}
`;

const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Builder Sandbox</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const NO_BUTTONS = "no-preview-buttons";

type Props = { code?: string };

export default function Sandbox({ code }: Props) {
  const [noButtons, setNoButtons] = useState(NO_BUTTONS);

  const toggle = () => setNoButtons(noButtons ? "" : NO_BUTTONS);

  return (
    <main className={`${noButtons} relative min-w-lg grow`}>
      <div className="overflow-hidden rounded-lg border">
        <SandpackProvider
          template="react"
          options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
          customSetup={{
            dependencies: {
              "lucide-react": "0.542.0",
              "react-markdown": "9.0.1",
            },
          }}
          files={{
            "/App.js": code || DEFAULT_CODE,
            "public/index.html": HTML,
          }}
        >
          <SandpackLayout className="border-0!">
            <SandpackPreview className="h-[calc(100dvh-112px)]! sm:h-[calc(100dvh-160px)]!" />
          </SandpackLayout>
        </SandpackProvider>
      </div>

      <Button onClick={toggle} className="absolute right-0 mt-5 select-none">
        DevTools
      </Button>
    </main>
  );
}
