import { ReloadIcon } from "../_icons/ReloadIcon";
import { ReloadIconWhite } from "../_icons/ReloadIconWhite";

type ReloadButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function ReloadButton({ disabled, onClick }: ReloadButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 w-12 h-10 rounded-md transition
        ${
          disabled
            ? "bg-white border border-[#E4E4E7] cursor-not-allowed"
            : "bg-[#18181B] text-white hover:bg-[#18181B]"
        }`}
    >
      {disabled ? <ReloadIcon /> : <ReloadIconWhite />}
    </button>
  );
}
