
import {ArticleGeneratorIcon} from "../_icons/ArticleGeneratorIcon"
import {Button} from "@/components/ui/button";
import { ImageIcon } from "../_icons/ImageIcon";
import {ReloadIcon} from "../_icons/ReloadIcon";
import { Textarea } from "@/components/ui/textarea";


export function ImageCreator () {
    
  return (
     <div className="flex flex-col items-center justify-start">
           
    <div className="flex flex-col h-222 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
     
       <div className="h-41 flex flex-col gap-2">
       <div className="flex justify-between w-145">
        <div className="flex items-center gap-2">
        <ArticleGeneratorIcon />
        <p>Food image creator</p>
       
        </div>
        <div  className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center">
            <ReloadIcon />
            </div>
            </div>
        <p className="text-[#71717A] font-normal text-[14px]">What food image do you want? Describe it briefly.</p>
        <div className="flex-col flex gap-2 items-end">
            <Textarea className="w-145 h-31 px-3 py-2 border rounded-md border-[#E4E4E7]  text-[#71717A] font-normal text-[14px]"
            placeholder="Хоолны тайлбар"/>
            <Button>Generate</Button>
        </div>
        
            <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
        <ImageIcon />
        <p>Result</p>
        </div>
         <p className="text-[#71717A] font-normal text-[14px]">First, enter your text to generate an image.</p>
        </div>
       </div>

    </div>
    </div>
  );
}
