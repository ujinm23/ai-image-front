import { MessageIcon } from "@/app/_icons/MessageIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/app/_icons/CloseIcon";
import { Input } from "@/components/ui/input";
import { SendIcon } from "@/app/_icons/SendIcon";

export default function Chat() {

  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex h-12 w-12 items-center justify-center bg-black rounded-full">
          <MessageIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-95 h-118 flex flex-col p-0">
        <div className="h-12 flex justify-between items-center px-4">
          <p className="font-medium text-[16px]">Chat assistant</p>
          <div className="w-8 h-8 flex justify-center items-center">
            <CloseIcon />
          </div>
        </div>

        <div className="flex-1 w-full border border-[#E4E4E7] overflow-y-auto px-4 py-2"></div>

        <div className="flex px-4 py-2 gap-2 items-center">
          <Input className="flex-1" placeholder="Type your message..." />
          <Button className="w-10 h-10 bg-black flex items-center justify-center rounded-full">
            <SendIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
