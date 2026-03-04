import { FiCheckCircle } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

export default function ActionsCell({
  showDelete = true,
  showCheck = true,
  showEdit = true,
  row = null,
  onDelete = null,
  onEdit = null,
  onCheck = null,
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {showEdit && (
        <button
          className="rounded p-2 hover:bg-gray-100"
          title="تعديل"
          onClick={() => onEdit && onEdit(row)}
        >
          <FaEdit size={20} />
        </button>
      )}
      {showCheck && (
        <button
          className="rounded p-2 hover:bg-gray-100"
          title="التحقق"
          onClick={() => onCheck && onCheck(row)}
        >
          <FiCheckCircle size={20} />
        </button>
      )}
      {showDelete && (
        <button
          className="rounded p-2 hover:bg-gray-100"
          title="حذف"
          onClick={() => onDelete && onDelete(row)}
        >
          <RiDeleteBinFill size={20} />
        </button>
      )}

      

      
    </div>
  );
}