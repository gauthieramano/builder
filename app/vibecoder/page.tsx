"use client";

import dynamic from "next/dynamic";
import type { PropsLlmApiKey } from "@/components/local-storage-llm-api-key";
import { SkeletonCard } from "@/components/skeleton-card";
import Vibecoder from "@/components/vibecoder";

const LocalStorageLlmApiKey = dynamic(
  () => import("@/components/local-storage-llm-api-key"),
  {
    loading: () => <SkeletonCard />,
    ssr: false,
  },
);

export default function VidecoderPage() {
  const renderVibecoder = (props: PropsLlmApiKey) => <Vibecoder {...props} />;

  return (
    <div className="grid min-h-screen px-4 pt-12 font-sans md:px-12">
      <div>
        <LocalStorageLlmApiKey render={renderVibecoder} />
      </div>
    </div>
  );
}
