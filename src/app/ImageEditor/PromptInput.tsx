"use client";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  loading: boolean;
};

export default function PromptInput({ prompt, setPrompt, loading }: Props) {
  return (
    <Textarea
      className="w-145 h-21 px-3 py-2 border rounded-md border-[#E4E4E7] text-[#71717A] font-normal text-[14px]"
      placeholder="Your prompt here"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      disabled={loading}
    />
  );
}
