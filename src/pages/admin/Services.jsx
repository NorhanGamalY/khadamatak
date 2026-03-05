import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import ActionsCell from "../../components/common/ActionCell";
import TableCard from "../../components/common/TableCard";
import { useServices, useAddService, useEditService, useDeleteService } from "../../features/services/hooks";
import SplashLoader from "../../components/common/SplashLoader";
import Toast from "../../components/common/Toast";

const TABS = [
  { key: "active", label: "مفعلة" },
  { key: "stopped", label: "موقوفة" },
  { key: "all", label: "الكل" },
];


function StatusBadge({ status }) {
  const map = {
    active: { text: "مفعلة", cls: "bg-green-600 text-white" },
    stopped: { text: "موقوفة", cls: "bg-gray-300" },
  };

  const s = map[status] || map.review;

  return (
    <span className={`inline-flex min-w-25 justify-center px-3 py-1 text-sm font-bold shadow-md rounded ${s.cls}`}>
      {s.text}
    </span>
  );
}

export default function Services() {
  const { data: services, isLoading, error } = useServices();
  const addMutation = useAddService();
  const [showToast, setShowToast] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'Home',
    description: '',
    status: 'active',
    lastUpdate: '',
    craftsmen: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const editMutation = useEditService();
  const deleteMutation = useDeleteService();

  const handleAddClick = () => {
    setShowForm(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name) return;
    if (editingId) {
  const payload = {

    id: editingId, 
    name: form.name,
    type: form.type,
    description: form.description,
  };

  editMutation.mutate(
    { id: editingId, data: payload },
    {
      onSuccess: () => {
        setShowForm(false);
        setEditingId(null);
        setForm({
          name: '',
          type: 'Home',
          description: '',
          status: 'active',
          lastUpdate: '',
          craftsmen: 0,
        });
      },
    }
  );
} else {
  const payload = {
    name: form.name,
    type: form.type,
    description: form.description,
  };

  addMutation.mutate(payload, {
    onSuccess: () => {
      setShowForm(false);
      setShowToast(true);
      setForm({
        name: '',
        type: 'Home',
        description: '',
        status: 'active',
        lastUpdate: '',
        craftsmen: 0,
      });
    },
  });
}

    
  };

  const handleEdit = (row) => {
    setForm({
      name: row.name || '',
      type: row.type || '',
      description: row.description || '',
      status: row.isActive || row.status === 'active' ? 'active' : 'stopped',
      lastUpdate: row.lastUpdate || '',
      craftsmen: row.craftsmen ?? 0,
    });
    setEditingId(row.id);
    setShowForm(true);
  };

 const handleDelete = (row) => {
  setDeleteRow(row);
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SplashLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500"> فشل التحميل. </div>;
  }

  const addError = addMutation.isError
    ?
      (addMutation.error?.response?.data?.message ||
       addMutation.error?.message ||
       String(addMutation.error))
    : null;

  const fetchedRows = (services || []).map((s) => ({
    id: s.id,
    name: s.name,
    type: s.type || s.serviceType || '',
    description: s.description || '',
isActive:
  s.isActive !== undefined
    ? s.isActive
    : s.active !== undefined
    ? s.active
    : s.status === 'active',    status: (s.isActive ?? s.active ?? (s.status === 'active')) ? 'active' : 'stopped',
    craftsmen: s.craftsmenCount ?? s.craftsmen ?? 0,
    lastUpdate: s.updatedAt ?? s.lastUpdate ?? '',
  }));
  const rows = fetchedRows;
  

  return (
    <div className='min-h-screen flex flex-col gap-4 p-6'>
      <h1 className='text-3xl font-bold'>ادارة الخدمات</h1>
      {addError && (
        <div className="mt-2 text-red-500">خطأ في الإضافة</div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
  {editingId ? "تعديل خدمة" : "اضافة خدمة جديدة"}
</h2>
            <form onSubmit={submitForm} className="space-y-4">
              {addError && (
                <div className="text-red-500">{addError}</div>
              )}
              <div>
                <label className="block text-sm font-medium">الخدمة</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">النوع</label>
                <input
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">الوصف</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">الحالة</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                >
                  <option value="active">مفعلة</option>
                  <option value="stopped">موقوفة</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">اخر تحديث</label>
                <input
                  type="text"
                  value={form.lastUpdate}
                  onChange={(e) => setForm((f) => ({ ...f, lastUpdate: e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">عدد الحرفي</label>
                <input
                  type="number"
                  value={form.craftsmen}
                  onChange={(e) => setForm((f) => ({ ...f, craftsmen: +e.target.value }))}
                  className="mt-1 w-full rounded border-gray-300 shadow-sm"
                  min={0}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  إلغاء
                </button>
              <button
  type="submit"
  disabled={addMutation.isLoading || editMutation.isLoading}
  className="bg-green-600 px-4 py-2 text-white rounded"
>
  {editingId ? "حفظ التعديل" : "اضافة"}
</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
      <h2 className="text-lg font-bold mb-4">
        هل انت متأكد من حذف الخدمة؟
      </h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setDeleteRow(null)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          إلغاء
        </button>

        <button
          onClick={() => {
            deleteMutation.mutate(deleteRow.id);
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
      <TableCard
        rows={rows}
          tabs={TABS}
          tabStyle={(key, isActive) => {
    const base = "px-6 py-2 text-sm font-bold transition-colors min-w-[100px] rounded";
    if (isActive) return `${base} bg-indigo-950 text-white shadow-xl`
    if (key === "active") return `${base} bg-green-600 text-white shadow`;
    if (key === "stopped") return `${base} bg-gray-300 shadow`;
    return `${base} bg-white text-gray-700 shadow`;
  }}
          initialTab="all"
          filterByTab={(row, tab) => (tab === "all" ? true : row.status === tab)}
          searchKeys={["name"]}
          Actions={
    <button
      onClick={handleAddClick}
      className="flex items-center gap-2 bg-orange-500 px-4 py-2 text-sm font-bold text-white rounded hover:bg-orange-600"
    >
      اضافة خدمة
      <IoMdArrowDropdown className="text-xl" />
    </button>
  }
          columns={[
            { key: "id", header: "", align: "right", cell: (r) => r.id },
            { key: "name", header: "الخدمة", align: "right", cell: (r) => r.name },
            { key: "status", header: "الحالة", align: "center", mobileHideHeader: true, cell: (r) => <StatusBadge status={r.status} /> },
            { key: "craftsmen", header: "عدد الحرفي", align: "center", cell: (r) => r.craftsmen },
            { key: "lastUpdate", header: "اخر تحديث", align: "center", cell: (r) => r.lastUpdate },
            { key: "actions", header: "الاجراءات", align: "center", mobileHidden: true, cell: (r) => (<ActionsCell showCheck={false} row={r} onEdit={handleEdit} onDelete={handleDelete} />) },
            
          ]}
          selectable={false}

          />

<Toast
  isOpen={showToast}
  type="success"
  title="تم بنجاح"
  message="تم اضافة الخدمة بنجاح"
  actionLabel="تمام"
  onClose={() => setShowToast(false)}
/>
    </div>

  );
}






