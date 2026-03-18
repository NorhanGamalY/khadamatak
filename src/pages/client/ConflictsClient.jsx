import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GiStoneCrafting } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { getId, getToken } from "../../features/auth/authHelpers";
import SplashLoader from "../../components/common/SplashLoader";

const ConflictsClient = () => {
  const token = getToken();
  const id = getId();
  const [clientData, setClientData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [activeTab, setActiveTab] = useState("open");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getAllComplaints = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://herafie.runasp.net/api/Complaints/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientData(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await axios.get(`https://herafie.runasp.net/api/Orders/client`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdersData(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && token) {
      getAllComplaints();
      getAllOrders();
    }
  }, []);

  const getOrderDetails = (orderId) => {
    return ordersData.find((o) => o.id === orderId) || null;
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedComplaint(null);
  };

  const handleComplaintUpdated = (updatedComplaint) => {
    setClientData((prev) =>
      prev.map((c) => (c.id === updatedComplaint.id ? { ...c, ...updatedComplaint } : c))
    );
    setSelectedComplaint((prev) => ({ ...prev, ...updatedComplaint }));
  };

  const handleComplaintDeleted = (deletedId) => {
    setClientData((prev) => prev.filter((c) => c.id !== deletedId));
    handleModalClose();
  };

  const filteredData = clientData.filter((item) =>
    activeTab === "open"
      ? item.status === 0 || item.status === 1
      : item.status === 2 || item.status === 3
  );

  return (
    <div dir="rtl" className="min-h-screen bg-main text-primary pt-15">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:gap-8 gap-5">
          <div className="flex items-center justify-center font-bold shadow-[0_6px_16px_rgba(17,24,39,0.08)] bg-white py-4 gap-4 lg:px-12 px-4 rounded m-auto lg:w-8/12">
            <button
              onClick={() => setActiveTab("open")}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${
                activeTab === "open" ? "text-white bg-secondary-orange" : "text-secondary bg-slate-200"
              } rounded`}
            >
              نزاعات مفتوحة
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`lg:px-4 lg:py-2 text-sm p-2 ${
                activeTab === "pending" ? "text-white bg-secondary-orange" : "text-secondary bg-slate-200"
              } rounded`}
            >
              نزاعات معلقة
            </button>
          </div>

          <div className="lg:w-8/12 lg:m-auto grid lg:gap-6 gap-3">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <SplashLoader />
              </div>
            ) : (
              <>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <ConflictItem
                      data={item}
                      key={idx}
                      orderDetails={getOrderDetails(item.orderId)}
                      onViewDetails={() => handleViewDetails(item)}
                    />
                  ))
                ) : (
                  <p className="font-extrabold text-xl text-center flex items-center justify-center min-h-[100px] text-secondary-orange">
                    لا توجد نزاعات
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {modalOpen && selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          orderDetails={getOrderDetails(selectedComplaint.orderId)}
          token={token}
          onClose={handleModalClose}
          onUpdated={handleComplaintUpdated}
          onDeleted={handleComplaintDeleted}
        />
      )}
    </div>
  );
};

export default ConflictsClient;


const ConflictItem = ({ data, orderDetails, onViewDetails }) => {
  return (
    <div className="rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:px-4 lg:py-6 p-2 border border-slate-300">
      <div className="border border-slate-50 bg-white rounded px-4 py-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between lg:text-lg">
            <div className="flex items-center gap-2">
              <GiStoneCrafting className="text-secondary-orange" />
              <p className="flex gap-1 text-secondary font-bold">
                رقم الطلب :
                <span>{data.orderId ? data.orderId : data.serviceId}</span>
              </p>
            </div>
            <StatusBadge status={data.status} />
          </div>
          <div className="grid gap-2 lg:gap-4 lg:mr-4 font-semibold text-secondary lg:text-[16px] text-sm">

            {orderDetails ? (
              <>
                <div className="flex lg:items-center items-start gap-1">
                  <GoDotFill className="text-secondary-orange" />
                  <span className="font-bold"> الاسم :</span>
                  <span>{orderDetails.clientName}</span>
                </div>
                <div className="flex lg:items-center items-start gap-1">
                  <GoDotFill className="text-secondary-orange" />
                  <span className="font-bold"> الخدمة المطلوبة :</span>
                  <span>{orderDetails.serviceName}</span>
                </div>
                <div className="flex lg:items-center items-start gap-1">
                  <GoDotFill className="text-secondary-orange" />
                  <span className="font-bold"> الحرفي :</span>
                  <span>{orderDetails.craftsmanName}</span>
                </div>
                <div className="flex lg:items-center items-start gap-1">
                  <GoDotFill className="text-secondary-orange" />
                  <span className="font-bold"> المبلغ :</span>
                  <span>{orderDetails.amount} ج.م</span>
                </div>
              </>
            ) : (
              <div className="flex lg:items-center items-start gap-1">
                <GoDotFill className="text-secondary-orange" />
                <span className="font-bold"> رقم الشكوى :</span>
                <span>#{data.id}</span>
              </div>
            )}

            <div className="flex lg:items-center items-start gap-1 bg-main py-2 lg:w-fit lg:pl-6 pl-1">
              <GoDotFill className="text-secondary-orange" />
              <span className="font-bold">سبب الشكوى :</span>
              <span>{data.description}</span>
            </div>
            <div className="lg:mt-6 mt-3 w-full">
              <button
                onClick={onViewDetails}
                className="py-2 w-full text-white text-center rounded bg-secondary-orange hover:bg-orange-500 transition-opacity duration-300"
              >
                عرض التفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ComplaintModal = ({ complaint, orderDetails, token, onClose, onUpdated, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(complaint.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!editDescription.trim()) {
      setError("يرجى إدخال سبب الشكوى");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      const res = await axios.put(
        `https://herafie.runasp.net/api/Complaints/${complaint.id}`,
        { description: editDescription, evidenceAttachmentUrl: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdated(res.data.data);
      setIsEditing(false);
    } catch (err) {
      setError("حدث خطأ أثناء التعديل، يرجى المحاولة مرة أخرى");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`https://herafie.runasp.net/api/Complaints/${complaint.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted(complaint.id);
    } catch (err) {
      setError("حدث خطأ أثناء الحذف، يرجى المحاولة مرة أخرى");
      console.log(err);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const canEditOrDelete = complaint.status === 0 || complaint.status === 1;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <GiStoneCrafting className="text-secondary-orange text-xl" />
            <h2 className="font-bold text-lg text-secondary">تفاصيل الشكوى</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="px-6 py-5 grid gap-4">
          <div className="flex justify-end">
            <StatusBadge status={complaint.status} />
          </div>

          <InfoRow label="رقم الشكوى" value={`#${complaint.id}`} />
          <InfoRow label="رقم الطلب" value={`#${complaint.orderId || complaint.serviceId}`} />

          {orderDetails && (
            <>
              <InfoRow label="الخدمة المطلوبة" value={orderDetails.serviceName} />
              <InfoRow label="اسم الحرفي" value={orderDetails.craftsmanName} />
              <InfoRow label="المبلغ" value={`${orderDetails.amount} ج.م`} />
              <InfoRow
                label="التاريخ"
                value={
                  orderDetails.scheduledAt
                    ? new Date(orderDetails.scheduledAt).toLocaleDateString("ar-EG")
                    : "—"
                }
              />
            </>
          )}

          <div className="grid gap-1">
            <span className="font-bold text-sm text-secondary">سبب الشكوى :</span>
            {isEditing ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={4}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-secondary-orange"
                placeholder="اكتب سبب الشكوى..."
              />
            ) : (
              <p className="bg-main rounded-lg px-3 py-2 text-sm text-secondary">
                {complaint.description}
              </p>
            )}
          </div>

          {complaint.adminResolutionNotes && (
            <div className="grid gap-1">
              <span className="font-bold text-sm text-secondary">ملاحظات الإدارة :</span>
              <p className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-800">
                {complaint.adminResolutionNotes}
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
          )}
        </div>

        {canEditOrDelete && (
          <div className="px-6 pb-5 grid gap-3">
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className="flex-1 py-2 rounded-lg bg-secondary-orange text-white font-bold hover:bg-orange-500 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ التعديل"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditDescription(complaint.description);
                    setError("");
                  }}
                  className="flex-1 py-2 rounded-lg bg-slate-200 text-secondary font-bold hover:bg-slate-300 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            ) : confirmDelete ? (
              <div className="grid gap-2">
                <p className="text-center text-sm font-semibold text-red-500">
                  هل أنت متأكد من حذف هذه الشكوى؟
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-60"
                  >
                    {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-2 rounded-lg bg-slate-200 text-secondary font-bold hover:bg-slate-300 transition-colors"
                  >
                    لا، تراجع
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-secondary-orange text-white font-bold hover:bg-orange-500 transition-colors"
                >
                  <MdEdit size={18} />
                  تعديل الشكوى
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
                >
                  <MdDelete size={18} />
                  إلغاء الشكوى
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const InfoRow = ({ label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    <GoDotFill className="text-secondary-orange mt-1 shrink-0" />
    <span className="font-bold text-secondary shrink-0">{label} :</span>
    <span className="text-secondary">{value || "—"}</span>
  </div>
);


const statusMap = {
  0: { label: "جديد",         color: "bg-blue-100 text-blue-700" },
  1: { label: "قيد المعالجة", color: "bg-yellow-100 text-yellow-700" },
  2: { label: "تم الحل",      color: "bg-green-100 text-green-700" },
  3: { label: "تم الرفض",     color: "bg-red-100 text-red-600" },
};

const StatusBadge = ({ status }) => {
  const info = statusMap[status] || { label: "غير معروف", color: "bg-gray-100 text-gray-600" };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${info.color}`}>
      {info.label}
    </span>
  );
};