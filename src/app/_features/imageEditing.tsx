"use client";
import { useState } from "react";
import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import FileUpload from "@/app/ImageEditor/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageIcon } from "../_icons/ImageIcon";

export default function ImageEditing() {
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleReload = () => {
    setPreview(null);
    setPrompt("");
    setResult("");
    setFinished(false);
  };

  const handleGenerate = async () => {
    if (!preview || !prompt) return;
    setLoading(true);
    setResult("");

    const formData = new FormData();
    const fileBlob = await fetch(preview).then((r) => r.blob());
    formData.append("image", fileBlob, "image.png");
    formData.append("prompt", prompt);

    try {
      const res = await fetch(
        "https://ai-image-back-5h6c.onrender.com/image-editor",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setResult(data.result);
      setFinished(true);
    } catch (err) {
      console.error(err);
      setResult("Failed to edit image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-end">
      <div className="flex justify-between w-145">
        <div className="flex items-center gap-2">
          <ArticleGeneratorIcon />
          <p>Image Editor</p>
        </div>
        <ReloadButton disabled={!finished} onClick={handleReload} />
      </div>

      <div className="flex justify-start w-145">
        <p className="text-[#71717A] font-normal text-[14px]">
          Upload a photo and provide a prompt, AI will edit your image.
        </p>
      </div>

      <FileUpload preview={preview} setPreview={setPreview} loading={loading} />
      <Textarea
        className="w-145 h-21 px-3 py-2 border rounded-md border-[#E4E4E7] text-[#71717A] font-normal text-[14px]"
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
      <div className="h-41 w-145 flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <ImageIcon/>
          <p>Result</p>
        </div>
        {!result && (
          <p className="text-[#71717A] font-normal text-[14px]">
            Your image. Your text. Instant transformation.
          </p>
        )}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-6 w-6  border-2 border-gray-300 border-t-black rounded-full" />
          </div>
        )}
        {result && (
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
