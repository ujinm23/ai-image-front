"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ImageIcon } from "@/app/_icons/ImageIcon";
import axios from "axios";
import Image from "next/image";

export default function FoodImageCreator() {
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    // console.log("current input:", textValue);
  }, [textValue]);

  const handleGenerate = async () => {
    if (!textValue) return; // optional: prevent empty requests
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post("http://localhost:168/image-create", {
        input: textValue, // send textValue to backend
      });
      console.log("response", response.data);
      setResult(response.data.result); // assuming your backend sends { result: "..." }
    } catch (err) {
      console.error(err);
      setResult("Failed to create image");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex-col flex gap-2 items-end">
        <Textarea
          className="w-145 h-31 px-3 py-2 border rounded-md border-[#E4E4E7] text-[#71717A] font-normal text-[14px]"
          placeholder="Хоолны тайлбар"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
      <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ImageIcon />
          <p>Result</p>
        </div>
        <p className="text-[#71717A] font-normal text-[14px]">
          First, enter your text to generate an image.
        </p>
        {loading && <p>Analyzing image...</p>}
        {result && (
          <p>
            {" "}
            <Image
              src={result}
              alt="Generated"
              width={200}
              height={200}
              className="object-cover"
            />
          </p>
        )}
      </div>
    </div>
  );
}
