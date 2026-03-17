import { useState } from "react";
import { useDebounce } from "use-debounce";
import ActionsCell from "../../components/common/ActionCell";
import SplashLoader from "../../components/common/SplashLoader";
import TableCard from "../../components/common/TableCard";
import { useClients, useDeleteClient, useEditClient, useSearchClients } from "../../features/clients/hooks";
import Toast from "../../components/common/Toast";

export default function Users() {
  const { data: allClients, isLoading, isError } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ isOpen: false, type: "success", title: "", message: "" });
  const [deleteRow, setDeleteRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [editName, setEditName] = useState("");
  const handleEdit = (row) => {
    setEditRow(row);
    setEditName(row.name);
  };
  const handleDelete = (row) => setDeleteRow(row);
  const deleteClientMutation = useDeleteClient({
    onSuccess: () => setToast({ isOpen: true, type: "success", title: "تم الحذف", message: "تم حذف المستخدم بنجاح" }),
    onError: () => setToast({ isOpen: true, type: "error", title: "فشل الحذف", message: "حدث خطأ أثناء الحذف" }),
  });

  const editClientMutation = useEditClient({
    onSuccess: () => setToast({ isOpen: true, type: "success", title: "تم التعديل", message: "تم تعديل المستخدم بنجاح" }),
    onError: () => setToast({ isOpen: true, type: "error", title: "فشل التعديل", message: "حدث خطأ أثناء التعديل" }),
  });


  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { data: searchResults } = useSearchClients(debouncedSearch);

  const tableData = ((debouncedSearch ? searchResults : allClients) || []).map((r) => ({
    id: r.id,
    name: r.fullName,
    phone: r.phone ?? "-",
    status: r.isVerified === false ? "review" : "active",
    city: r.address ?? "-",
  }));

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SplashLoader />
      </div>
    );

  if (isError) return <div className="p-6 text-red-500">فشل التحميل.</div>;


  return (
    <div className="min-h-screen flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">ادارة المستخدمين</h1>
      <TableCard
        rows={tableData}
        tabs={[
          { key: "review", label: "قيد المراجعة" },
          { key: "active", label: "نشط" },
          { key: "stopped", label: "موقوف" },
          { key: "all", label: "الكل" },
        ]}
        initialTab="all"
        filterByTab={(row, tab) => (tab === "all" ? true : row.status === tab)}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm} 
        searchKeys={["name", "phone", "city"]} 
        columns={[
          { key: "name", header: "الاسم", align: "right", cell: (r) => r.name },
          { key: "phone", header: "الهاتف", align: "center", cell: (r) => r.phone },
          { key: "city", header: "المدينة", align: "center", cell: (r) => r.city },
          { key: "status", header: "الحالة", align: "center", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "الاجراءات", align: "center", cell: (r) => <ActionsCell showCheck={false} row={r} onDelete={handleDelete} onEdit={handleEdit} />   },
        ]}
      />

      {deleteRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">هل انت متأكد من حذف المستخدم؟</h2>

            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteRow(null)} className="bg-gray-300 px-4 py-2 rounded">
                إلغاء
              </button>
              <button
                onClick={() => {
                  deleteClientMutation.mutate(deleteRow.id);
                  setDeleteRow(null);
                }}
                className="bg-red-600 px-4 py-2 text-white rounded"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {editRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
      <h2 className="text-lg font-bold mb-4">تعديل المستخدم</h2>

      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="w-full rounded border px-3 py-2 mb-4"
      />

      <div className="flex justify-center gap-4">
        <button onClick={() => setEditRow(null)} className="bg-gray-300 px-4 py-2 rounded">
          إلغاء
        </button>

        <button
          onClick={() => {
          editClientMutation.mutate({ id: editRow.id, fullName: editName });
            setEditRow(null);
          }}
          className="bg-blue-600 px-4 py-2 text-white rounded"
        >
          حفظ
        </button>
      </div>
    </div>
  </div>
)}
  <Toast
    isOpen={toast.isOpen}
    type={toast.type}
    title={toast.title}
    message={toast.message}
    onClose={() => setToast({ ...toast, isOpen: false })}
  />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active: { text: "نشط", cls: "text-green-600" },
    stopped: { text: "موقوف", cls: "text-red-600" },
    review: { text: "قيد المراجعة", cls: "text-orange-800" },
  };
  const s = map[status] || map.review;
  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md bg-white ${s.cls}`}>
      {s.text}
    </span>
  );
}