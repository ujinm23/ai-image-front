"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentIcon } from "../_icons/DocumentIcon";
import DeleteButton from "./DeleteButton";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<object>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    try {
      const response = await uploadImageForAnalysis(selectedImage);
      setResult(response);

      console.log("Backend response:", response);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex-col flex gap-2 items-end">
        <div className="space-y-4">
          <label className="flex h-10 w-145 items-center px-3 py-2 border  rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
            <p className="px-2">Choose file</p>
            <p className="font-normal text-[#71717A]">JPG, PNG</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </label>

          {previewUrl && (
        <div className="border rounded-lg p-1 w-50">
          <Image
            src={previewUrl}
            alt="Preview"
            width={200}
            height={133}
            className="max-w-full h-auto max-h-64 mx-auto rounded-[6px]"
          />
        </div>
      )}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={!selectedImage || loading}
          className="w-fit"
        >
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </>
          )}
        </Button>
      </div>
      <p className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal flex flex-row gap-2">
        <FileText />
        Here is the summary
      </p>
 
      <p> {result?.result?.reasoning_content}</p>
          {/* {preview && (
            <div className="w-52 h-35.25 border-[#E4E4E7] rounded-lg border flex justify-center items-center">
              <img
                src={preview}
                alt="preview"
                className="w-50 h-33.25 rounded-lg"
              />
              <DeleteButton />
            </div>
          )}
        </div>
        <Button>Generate</Button>
      </div>

      <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <DocumentIcon />
          <p>Here is the summary</p>
        </div>
        <p className="text-[#71717A] font-normal text-[14px]">
          First, enter your image to recognize an ingredients.
        </p>
        {loading && <p>Analyzing image...</p>}
        {result && <p> {result}</p>}{" "} */}
      </div>
    </div>
  );
}
