"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ImageIcon } from "@/app/_icons/ImageIcon";
import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import axios from "axios";
import Image from "next/image";

export default function FoodImageCreator() {
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [finished, setFinished] = useState(false);

  const handleReload = () => {
    setTextValue("");
    setResult("");
    setFinished(false);
  };

  useEffect(() => {}, [textValue]);

  const handleGenerate = async () => {
    if (!textValue) return;
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post("https://ai-image-back-5h6c.onrender.com/image-create", {
        input: textValue,
      });
      console.log("response", response.data);
      setResult(response.data.result);
      setFinished(true);
    } catch (err) {
      console.error(err);
      setResult("Failed to create image");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-41 flex flex-col gap-2">
      <div className="flex justify-between w-145">
        <div className="flex items-center gap-2">
          <ArticleGeneratorIcon />
          <p>Image creator</p>
        </div>
        <ReloadButton disabled={!finished} onClick={handleReload} />
      </div>
      <p className="text-[#71717A] font-normal text-[14px]">
        What image do you want? Describe it briefly.
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex-col flex gap-2 items-end">
          <Textarea
            className="w-145 h-31 px-3 py-2 border rounded-md border-[#E4E4E7] text-[#71717A] font-normal text-[14px]"
            placeholder="Tайлбар"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button
            onClick={handleGenerate}
            disabled={!textValue || loading || finished}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
        <div className="h-41 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ImageIcon />
            <p>Result</p>
          </div>
          {!result && (
            <p className="text-[#71717A] font-normal text-[14px]">
              First, enter your text to generate an image.
            </p>
          )}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-6 w-6  border-2 border-gray-300 border-t-black rounded-full" />
            </div>
          )}
          {result && (
            <div className="flex flex-col gap-1 border border-[#E4E4E7] p-4 rounded-lg">
              <p className="text-sm font-medium text-[#09090B]">{textValue}</p>
              <Image
                src={result}
                alt="Generated"
                width={360}
                height={360}
                unoptimized
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
