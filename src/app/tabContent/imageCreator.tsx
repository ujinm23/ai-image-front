import FoodImageCreator from "../_components/foodImageCreator";

export function ImageCreator() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-222 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
        <FoodImageCreator />
      </div>
    </div>
  );
}
