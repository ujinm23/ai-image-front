"use client";

import { useState } from "react";

export default function ImageUpload() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:168/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.description);
    } catch (err) {
      console.error(err);
      setResult("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex h-10 w-145 items-center px-3 py-2 border  rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
        <p className="px-2">Choose file</p>
        <p className="font-normal text-[#71717A]">JPG, PNG</p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <img src={preview} alt="preview" className="w-48 rounded-md border" />
      )}

      {loading && <p>Analyzing image...</p>}
      {result && <p> {result}</p>}
    </div>
  );
}
