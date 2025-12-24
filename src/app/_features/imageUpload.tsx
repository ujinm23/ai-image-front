"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DocumentIcon } from "../_icons/DocumentIcon";
import DeleteButton from "../_components/DeleteButton";
import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const handleReload = () => {
    setFile(null);
    setPreview(null);
    setResult("");
    setFinished(false);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
  };

  const handleGenerate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "http://localhost:168/analyze-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status !== 200) {
        setError(response.data.error || "Image analysis failed.");
        setFinished(true);
        return;
      }

      setResult(response.data.description);
      setFinished(true);
    } catch (err: unknown) {
      console.error(err);

      let message = "Image analysis failed. Please try again.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.error ?? message;
      }

      setError(message);
      setFinished(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <div className="h-41 flex flex-col gap-2">
        <div className="flex justify-between w-145">
          <div className="flex items-center gap-2">
            <ArticleGeneratorIcon />
            <p>Image Analysis</p>
          </div>
          <ReloadButton disabled={!finished} onClick={handleReload} />
        </div>
        <p className="text-[#71717A] font-normal text-[14px]">
          Upload a photo.
        </p>
        <div className="flex-col flex gap-2 items-end">
          <div className="w-145 flex justify-start">
            {!file && (
              <label className="flex h-10 w-145 items-center px-3 py-2 border rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
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
            )}

            {preview && (
              <div className="relative w-52 h-35.25 border-[#E4E4E7] rounded-lg border flex justify-center items-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-50 h-33.25 rounded-lg object-contain"
                />
                <DeleteButton
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResult("");
                  }}
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!file || loading || finished}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="h-41 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <DocumentIcon />
            <p>Here is the summary</p>
          </div>

          {!result && !error && !loading && (
            <p className="text-[#71717A] font-normal text-[14px]">
              Upload an image to get a summary.
            </p>
          )}

          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
          )}

          {error && (
            <div className="border border-red-300 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
               {error}
            </div>
          )}

          {result && !error && (
            <p className="border border-[#E4E4E7] p-4 rounded-lg">{result}</p>
          )}
        </div>
      </div>
    </div>
  );
}
