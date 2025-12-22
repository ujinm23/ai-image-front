import { ArticleGeneratorIcon } from "../_icons/ArticleGeneratorIcon";
import ReloadButton from "../_components/reloadButton";
import FoodImageCreator from "../_components/foodImageCreator";

export function ImageCreator() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-222 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-41 flex flex-col gap-2">
          <div className="flex justify-between w-145">
            <div className="flex items-center gap-2">
              <ArticleGeneratorIcon />
              <p>Image creator</p>
            </div>
            <ReloadButton />
          </div>
          <p className="text-[#71717A] font-normal text-[14px]">
            What image do you want? Describe it briefly.
          </p>
          <FoodImageCreator />
        </div>
      </div>
    </div>
  );
}
