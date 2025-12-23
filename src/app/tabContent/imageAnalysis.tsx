import ImageUpload from "../_features/imageUpload";
import Chat from "../_components/Chat";
export function ImageAnalysis() {
  return (
    <div className="flex">
      <div className="flex items-center justify-start">
        <div className="flex h-220 w-145 gap-6 font-semibold text-[20px] py-6">
          <ImageUpload />
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <Chat />
      </div>
    </div>
  );
}
