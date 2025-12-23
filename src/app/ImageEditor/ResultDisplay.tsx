"use client";
import Image from "next/image";
import { DocumentIcon } from "../_icons/DocumentIcon";

type Props = {
  result: string;
  loading: boolean;
};

export default function ResultDisplay({ result, loading }: Props) {
  return (
    <div className="h-41 flex flex-col gap-2 mt-4">
      <div className="flex items-center gap-2">
        <DocumentIcon />
        <p>Result</p>
      </div>
      {loading && <p>Editing image...</p>}
      {result && (
        <Image
          src={result}
          alt="Edited"
          width={360}
          height={360}
          unoptimized
          className="object-contain rounded-lg"
        />
      )}
    </div>
  );
}
