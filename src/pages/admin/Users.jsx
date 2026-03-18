import { useState } from "react";
import { useDebounce } from "use-debounce";
import SplashLoader from "../../components/common/SplashLoader";
import TableCard from "../../components/common/TableCard";
import {
  useClients,
  useSearchClients,
  useActivateClient,
  useDeactivateClient,
} from "../../features/clients/hooks";
import Toast from "../../components/common/Toast";
import { FiCheckCircle } from "react-icons/fi";
import { FaRegTimesCircle } from "react-icons/fa";

export default function Users() {
  const { data: allClients, isLoading, isError } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ isOpen: false, type: "success", title: "", message: "" });
  const [actionRow, setActionRow] = useState(null); 

  const activateMutation = useActivateClient({
    onSuccess: () =>
      setToast({ isOpen: true, type: "success", title: "تم التفعيل", message: "تم تفعيل المستخدم بنجاح" }),
    onError: () =>
      setToast({ isOpen: true, type: "error", title: "فشل التفعيل", message: "حدث خطأ أثناء التفعيل" }),
  });

  const deactivateMutation = useDeactivateClient({
    onSuccess: () =>
      setToast({ isOpen: true, type: "success", title: "تم الإيقاف", message: "تم إيقاف المستخدم بنجاح" }),
    onError: () =>
      setToast({ isOpen: true, type: "error", title: "فشل الإيقاف", message: "حدث خطأ أثناء الإيقاف" }),
  });

  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { data: searchResults } = useSearchClients(debouncedSearch);

  const tableData = ((debouncedSearch ? searchResults : allClients) || []).map((r) => ({
    id: r.id,
    name: r.fullName,
    phone: r.phone ?? "-",
    city: r.address ?? "-",
    status: r.isActive ? "active" : "stopped",
    isActive: r.isActive,
  }));

  const handleConfirm = () => {
    if (!actionRow) return;
    if (actionRow.type === "activate") {
      activateMutation.mutate(actionRow.row.id);
    } else {
      deactivateMutation.mutate(actionRow.row.id);
    }
    setActionRow(null);
  };

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
          { key: "name",   header: "الاسم",    align: "right",  cell: (r) => r.name  },
          { key: "phone",  header: "الهاتف",   align: "center", cell: (r) => r.phone },
          { key: "city",   header: "المدينة",  align: "center", cell: (r) => r.city  },
          {
            key: "status",
            header: "الحالة",
            align: "center",
            cell: (r) => <StatusBadge status={r.status} />,
          },
          {
            key: "actions",
            header: "الاجراءات",
            align: "center",
            cell: (r) =>
              r.isActive ? (
                <button
                  title="إيقاف المستخدم"
                  onClick={() => setActionRow({ row: r, type: "deactivate" })}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaRegTimesCircle size={22} />
                </button>
              ) : (
                <button
                  title="تفعيل المستخدم"
                  onClick={() => setActionRow({ row: r, type: "activate" })}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <FiCheckCircle size={22} />
                </button>
              ),
          },
        ]}
      />

      {/* Confirm Modal */}
      {actionRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
            <div className="flex justify-center mb-3">
              {actionRow.type === "activate" ? (
                <FiCheckCircle size={44} className="text-green-500" />
              ) : (
                <FaRegTimesCircle size={44} className="text-red-500" />
              )}
            </div>
            <h2 className="text-lg font-bold mb-1">
              {actionRow.type === "activate" ? "تفعيل المستخدم" : "إيقاف المستخدم"}
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              {actionRow.type === "activate"
                ? `هل أنت متأكد من تفعيل "${actionRow.row.name}"؟`
                : `هل أنت متأكد من إيقاف "${actionRow.row.name}"؟`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActionRow(null)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-white rounded transition-colors ${
                  actionRow.type === "activate"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {actionRow.type === "activate" ? "تفعيل" : "إيقاف"}
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
    active:  { text: "نشط",    cls: "text-green-600" },
    stopped: { text: "موقوف", cls: "text-red-600"   },
  };
  const s = map[status] ?? map.active;
  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md bg-white ${s.cls}`}>
      {s.text}
    </span>
  );
}