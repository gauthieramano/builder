"use client";

import dynamic from "next/dynamic";
import type { PropsLlmApiKey } from "@/components/local-storage-llm-api-key";
import Login from "@/components/login";

const LocalStorageLlmApiKey = dynamic(
  () => import("@/components/local-storage-llm-api-key"),
  {
    loading: () => <Login llmApiKey="" />,
    ssr: false,
  },
);

export default function Home() {
  const renderLogin = (props: PropsLlmApiKey) => <Login {...props} />;

  return (
    <div className="grid min-h-screen place-content-center p-8 font-sans sm:p-20">
      <div className="flex justify-center sm:max-w-lg">
        <LocalStorageLlmApiKey render={renderLogin} />
      </div>
    </div>
  );
}
