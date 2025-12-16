"use client";
import { Button } from "@/components/ui/button";

type TabTriggerProps = {
  activeIndex?: number, // Which button is highlighted (0,1,2)
};

const tabs: string[] = [
  "Image analysis",
  "Ingredient recognition",
  "Image creator",
];

export default function TabTrigger({ activeIndex = 0 }: TabTriggerProps) {
  return (
    <div className="flex h-9 w-105 items-center p-1 bg-[#F4F4F5] border-b rounded-lg border-[#E4E4E7] text-[#71717A] font-semibold text-[14px] gap-1">
      {tabs.map((tab, index) => (
        <Button
          key={tab}
          className={`text-[14px] h-7 px-2 ${
            activeIndex === index
              ? "bg-blue-500 text-white" // active button
              : "bg-white text-gray-600" // inactive button
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
