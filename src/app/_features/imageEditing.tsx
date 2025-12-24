"use client";
import { useState } from "react";
import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageIcon } from "../_icons/ImageIcon";
import DeleteButton from "@/app/_components/DeleteButton";

export default function ImageEditing() {
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const handleReload = () => {
    setPreview(null);
    setPrompt("");
    setResult("");
    setFinished(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!preview || !prompt) return;
    setLoading(true);
    setResult("");
    setError("");

    const formData = new FormData();
    const fileBlob = await fetch(preview).then((r) => r.blob());
    formData.append("image", fileBlob, "image.png");
    formData.append("prompt", prompt);

   try {
  const res = await fetch("https://ai-image-back-5h6c.onrender.com/image-editor", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.error || "Image editing failed.");
    setFinished(true);
    return;
  }

  setResult(data.result);
  setFinished(true);
} catch (err: unknown) {
  console.error(err);

  let message = "Image editing failed. Please try again.";

  if (err instanceof Error) {
    message = err.message;
  }

  setError(message);
  setFinished(true);
} finally {
  setLoading(false);
}

  };

  return (
    <div className="flex flex-col gap-4 items-end w-145">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <ArticleGeneratorIcon />
          <p>Image Editor</p>
        </div>
        <ReloadButton disabled={!finished} onClick={handleReload} />
      </div>
      <p className="text-[#71717A] font-normal text-[14px] w-full">
        Upload a photo and provide a prompt, AI will edit your image.
      </p>

      <div className="flex-col flex gap-2 w-full">
        <label className="flex h-10 items-center px-3 py-2 border rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
          <p className="px-2">Choose file</p>
          <p className="font-normal text-[#71717A]">JPG, PNG</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>

        {preview && (
          <div className="relative w-52 h-35.25 border-[#E4E4E7] rounded-lg border flex justify-center items-center">
            <img
              src={preview}
              alt="preview"
              className="w-50 h-33.25 rounded-lg object-contain"
            />
            <DeleteButton onClick={() => setPreview(null)} />
          </div>
        )}
      </div>

      <Textarea
        className="w-full h-21 px-3 py-2 border rounded-md border-[#E4E4E7] text-[#71717A] font-normal text-[14px]"
        placeholder="Your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />

      <Button
        onClick={handleGenerate}
        disabled={!prompt || loading || finished}
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <div className="h-41 w-full flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <ImageIcon />
          <p>Result</p>
        </div>

       {!result && !error && !loading && (
  <p className="text-[#71717A] font-normal text-[14px]">
    Your image. Your text. Instant transformation.
  </p>
)}


        {loading && (
          <div className="flex justify-center w-auto items-center">
            <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
          </div>
        )}
        {error && (
          <div className="border border-red-300 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="flex flex-col gap-1 border border-[#E4E4E7] p-4 rounded-lg">
            <Image
              src={result}
              alt="Edited"
              width={360}
              height={360}
              unoptimized
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
