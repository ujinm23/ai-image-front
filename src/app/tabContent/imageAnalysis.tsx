
import {ArticleGeneratorIcon} from "../_icons/ArticleGeneratorIcon"
import {Button} from "@/components/ui/button";
import { DocumentIcon } from "../_icons/DocumentIcon";
import {ReloadIcon} from "../_icons/ReloadIcon";
import ImageUpload from "../_components/imageUpload";

export function ImageAnalysis () {
    
  return (
     <div className="flex flex-col items-center justify-start">
           
    <div className="flex flex-col h-180 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
       
       <div className="h-41 flex flex-col gap-2">
       <div className="flex justify-between w-145">
        <div className="flex items-center gap-2">
        <ArticleGeneratorIcon />
        <p>Image Analysis</p>
       
        </div>
        <div  className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center">
            <ReloadIcon />
            </div>
            </div>
        <p className="text-[#71717A] font-normal text-[14px]">Upload a food photo, and AI will detect the ingredients.</p>
        <div className="flex-col flex gap-2 items-end">
            <ImageUpload/>
            <Button>Generate</Button>
        </div>
        
            <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
        <DocumentIcon />
        <p>Here is the summary</p>
        </div>
         <p className="text-[#71717A] font-normal text-[14px]">First, enter your image to recognize an ingredients.</p>
        </div>
       </div>

    </div>
    </div>
  );
}
