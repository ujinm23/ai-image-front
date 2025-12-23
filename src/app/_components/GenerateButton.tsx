"use client";
import { Button } from "@/components/ui/button";

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

export default function GenerateButton({ onClick, disabled, loading }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled} className="w-23.5 h-10">
      {loading ? "  Generating..." : "Generate"}
    </Button>
  );
}
