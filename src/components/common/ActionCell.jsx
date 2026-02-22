import { FiCheckCircle} from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

export default function ActionsCell() {

  return (
    <div className="flex items-center justify-center gap-1">
        
      {/* Delete */}
      <button
        className="rounded p-2 hover:bg-gray-100"
        title="حذف"
      >
        <RiDeleteBinFill size={20} />
      </button>
      {/* Check */}
     <button
        className="rounded p-2 hover:bg-gray-100"
        title="التحقق"
      >
        <FiCheckCircle size={20} />
      </button>
      {/* Edit */}
      <button
        className="rounded p-2 hover:bg-gray-100"
        title="تعديل"
      >
        <FaEdit size={20} />
      </button>

      

    </div>
  );
}