import { MdOutlineFileUpload } from "react-icons/md";

// components/form/UploadBox.jsx
export default function UploadBox({ onUpload }) {
  return (
    <label className="w-full bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-30">
      <input type="file" hidden onChange={onUpload} />
      <span className="text-gray-500 flex flex-col items-center gap-2">
        <MdOutlineFileUpload size={24} />
        اضف صورة</span>
    </label>
  );
}