import { TrashIcon } from "@/app/_icons/TrashIcon";

type DeleteButtonProps = {
  onClick: () => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-2 right-3 z-10 bg-white rounded-sm p-1 shadow hover:bg-red-50"
      type="button"
    >
      <TrashIcon />
    </button>
  );
}
