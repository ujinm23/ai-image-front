import ImageEditing from "../_features/imageEditing";

export function ImageEditor() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-220 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
        <ImageEditing />
      </div>
    </div>
  );
}
