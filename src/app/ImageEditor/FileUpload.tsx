"use client";
import DeleteButton from "@/app/_components/DeleteButton";

type Props = {
  preview: string | null;
  setPreview: (v: string | null) => void;
  loading: boolean;
};

export default function FileUpload({ preview, setPreview, loading }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex-col flex gap-2">
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
  );
}
