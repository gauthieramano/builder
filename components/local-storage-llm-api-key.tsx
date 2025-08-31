"use client";

import { useLocalStorage } from "@uidotdev/usehooks";

export type PropsLlmApiKey = {
  llmApiKey: string;
  setLlmApiKey?: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  render: (props: PropsLlmApiKey) => React.ReactNode;
};

export default function LocalStorageLlmApiKey({ render }: Props) {
  const [llmApiKey, setLlmApiKey] = useLocalStorage("llmApiKey", "");

  return render({ llmApiKey, setLlmApiKey });
}
