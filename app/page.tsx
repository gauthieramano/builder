"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const goToVibecoder = () => {
    router.push("/vibecoder");
  };

  const renderLogin = (props: PropsLlmApiKey) => (
    <Login {...props} goToVibecoder={goToVibecoder} />
  );

  return (
    <div className="grid min-h-screen place-content-center p-8 font-sans sm:p-20">
      <div className="flex justify-center sm:max-w-lg">
        <LocalStorageLlmApiKey render={renderLogin} />
      </div>
    </div>
  );
}
