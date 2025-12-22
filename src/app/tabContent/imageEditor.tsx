import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import ImageEditing from "../_components/imageEditing";

export function ImageEditor() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-220 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-41 flex flex-col gap-2">
          <div className="flex justify-between w-145">
            <div className="flex items-center gap-2">
              <ArticleGeneratorIcon />
              <p>Image Editor</p>
            </div>
            <ReloadButton />
          </div>
          <p className="text-[#71717A] font-normal text-[14px]">
            Upload a food photo, and give promt, and AI will edit it for you.
          </p>
          <div className="flex-col flex gap-2 items-end">
            <ImageEditing />
          </div>
        </div>
      </div>
    </div>
  );
}
