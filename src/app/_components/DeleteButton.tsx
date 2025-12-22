import { TrashIcon } from "@/app/_icons/TrashIcon";

export default function DeleteButton() {
  return (
    <div className="w-6 h-6 border border-[#E4E4E7] bg-white rounded-sm flex justify-center items-center cursor-pointer">
      <TrashIcon />
    </div>
  );
}
