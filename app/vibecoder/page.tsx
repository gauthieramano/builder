"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import type { PropsLlmApiKey } from "@/components/local-storage-llm-api-key";
import { SkeletonCard } from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
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

  const logout = () => {
    window.localStorage.clear();
    redirect("/");
  };

  return (
    <div className="grid min-h-screen px-4 pt-12 font-sans md:px-12">
      <div className="relative">
        <LocalStorageLlmApiKey render={renderVibecoder} />

        <Button
          onClick={logout}
          size="icon"
          variant="ghost"
          className="-top-10 absolute right-0 size-8"
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
