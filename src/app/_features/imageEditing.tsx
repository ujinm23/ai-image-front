"use client";
import { useState } from "react";
import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import FileUpload from "@/app/ImageEditor/FileUpload";
import PromptInput from "../ImageEditor/PromptInput";
import { Button } from "@/components/ui/button";
import ResultDisplay from "@/app/ImageEditor/ResultDisplay";

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
      const res = await fetch("https://ai-image-back-5h6c.onrender.com/image-editor", {
        method: "POST",
        body: formData,
      });
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
      <PromptInput prompt={prompt} setPrompt={setPrompt} loading={loading} />
       <Button
            onClick={handleGenerate}
            disabled={!prompt || loading || finished}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
      <div className="flex justify-start w-145">
      <ResultDisplay result={result} loading={loading} />
      </div>
    </div>
  );
}
