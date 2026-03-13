import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, FileText, User, Wrench, Clock, CheckCircle, XCircle, AlertCircle, Image } from "lucide-react";
import SplashLoader from "../../components/common/SplashLoader";
import { notifyCraftsman, notifyUser, notifyAdmin, NOTIFICATION_MESSAGES } from "../../features/notifications/Notificationapi";

const statusMap = {
    0: "جديد",
    1: "يتم التحقيق فيه",
    2: "تم الحل",
    3: "رفض الشكوى",
};

const statusConfig = {
    "جديد": { class: "bg-blue-100 text-blue-700", icon: <AlertCircle className="w-4 h-4" /> },
    "يتم التحقيق فيه": { class: "bg-amber-100 text-amber-700", icon: <Clock className="w-4 h-4" /> },
    "تم الحل": { class: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
    "رفض الشكوى": { class: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4" /> },
};

function Avatar({ name }) {
    const initials = name
        ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";
    return (
        <div className="w-12 h-12 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-lg select-none">
            {initials}
        </div>

    );
}

export default function DetailsConflict() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [resolutionNote, setResolutionNote] = useState("");
    const [showNoteInput, setShowNoteInput] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`https://herafie.runasp.net/api/Complaints/admin/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setComplaint(res.data.data ?? res.data);
            })
            .catch((err) => {
                console.log(err);
                setComplaint(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const statusToastMap = {
        1: { title: "تم بدء التحقيق", message: "سيتم مراجعة الشكوى والتحقيق فيها قريباً" },
        3: { title: "تم رفض الشكوى", message: "تم رفض الشكوى وإغلاق النزاع" },
    };

    const updateStatus = async (newStatus) => {
        setActionLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `https://herafie.runasp.net/api/Complaints/admin/${id}/status?status=${newStatus}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComplaint((prev) => ({ ...prev, status: newStatus }));
            setShowNoteInput(false);

        } catch (err) {
            console.log(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleStartInvestigation = () => updateStatus(1);

    const handleResolve = async () => {
        if (!resolutionNote.trim()) {
            setShowNoteInput(true);
            return;
        }
        setActionLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `https://herafie.runasp.net/api/Complaints/admin/${id}/resolution`,
                JSON.stringify(resolutionNote),
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            setComplaint((prev) => ({ ...prev, status: 2, adminResolutionNotes: resolutionNote }));
            setShowNoteInput(false);

            const craftsmanId = complaint?.order?.craftsmanId;
            const clientUserId = complaint?.evidenceAttachmentUrl;

            if (clientUserId) notifyUser(clientUserId,
                NOTIFICATION_MESSAGES.COMPLAINT_RESOLVED.title,
                NOTIFICATION_MESSAGES.COMPLAINT_RESOLVED.message
            );
            if (craftsmanId) notifyCraftsman(craftsmanId,
                "تم البت في الشكوى المقدمة ضدك",
                "تمت مراجعة الشكوى المقدمة ضدك وتم إصدار قرار الحل من قِبل الإدارة"
            );
            notifyAdmin(
                NOTIFICATION_MESSAGES.ADMIN_COMPLAINT_RESOLVED.title,
                NOTIFICATION_MESSAGES.ADMIN_COMPLAINT_RESOLVED.message
            );
        } catch (err) {
            console.log(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = () => updateStatus(3);

    if (loading) return <SplashLoader />;

    if (!complaint)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-500 text-lg">الشكوى غير موجودة</p>
            </div>
        );

    const statusLabel = statusMap[complaint.status] ?? "غير معروف";
    const statusStyle = statusConfig[statusLabel] ?? { class: "bg-gray-100 text-gray-600", icon: null };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const d = new Date(dateStr);
        return d.toLocaleString("ar-EG", {
            year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">تفاصيل الشكوى #{complaint.id}</h1>
                <span className={`text-xs rounded-full px-3 py-1 inline-flex items-center gap-1 font-bold ${statusStyle.class}`}>
                    {statusStyle.icon}
                    {statusLabel}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left column: main info */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Complaint info card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            تفاصيل الشكوى
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-400 text-sm mb-1">سبب الشكوى</p>
                            <p className="text-gray-800 font-medium">{complaint.description ?? "—"}</p>
                        </div>

                        {complaint.evidenceAttachmentUrl && complaint.evidenceAttachmentUrl !== "string" && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
                                    <Image className="w-4 h-4" /> مرفق الإثبات
                                </p>
                                <a
                                    href={complaint.evidenceAttachmentUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-600 underline text-sm break-all"
                                >
                                    {complaint.evidenceAttachmentUrl}
                                </a>
                            </div>
                        )}

                        {complaint.adminResolutionNotes && (
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <p className="text-gray-400 text-sm mb-1">ملاحظات الحل</p>
                                <p className="text-gray-800">{complaint.adminResolutionNotes}</p>
                            </div>
                        )}

                        {complaint.resolvedAt && (
                            <div className="text-sm text-gray-500">
                                تاريخ الحل: <span className="font-medium text-gray-700">{formatDate(complaint.resolvedAt)}</span>
                            </div>
                        )}
                    </div>

                    {/* Order info card */}
                    {complaint.order && (
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                            <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-600" />
                                بيانات الطلب
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-400 text-xs">رقم الطلب</p>
                                    <p className="font-bold text-gray-800">#{complaint.order.orderId}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-400 text-xs">نوع الخدمة</p>
                                    <p className="font-bold text-gray-800">{complaint.order.serviceName ?? "—"}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-400 text-xs">تاريخ الجدولة</p>
                                    <p className="font-bold text-gray-800">{formatDate(complaint.order.scheduledAt)}</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                    <p className="text-gray-400 text-xs">المبلغ</p>
                                    <p className="font-bold text-green-700 text-xl">{complaint.order.amount} جم</p>
                                </div>
                            </div>

                            {complaint.order.description && (
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-400 text-xs mb-1">وصف الطلب</p>
                                    <p className="text-gray-700">{complaint.order.description}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Resolution note input */}
                    {showNoteInput && (
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
                            <h2 className="text-lg font-bold text-gray-700">ملاحظة الحل</h2>
                            <textarea
                                value={resolutionNote}
                                onChange={(e) => setResolutionNote(e.target.value)}
                                placeholder="اكتب ملاحظات الحل هنا..."
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400 text-right resize-none"
                            />
                            <button
                                onClick={handleResolve}
                                disabled={actionLoading}
                                className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                                {actionLoading ? "جاري الحفظ..." : "تأكيد الحل"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right column: people + actions */}
                <div className="space-y-5">
                    {/* Client */}
                    {complaint.order?.clientName && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                                <User className="w-4 h-4" /> المستخدم (العميل)
                            </h2>
                            <div className="flex items-center gap-3">
                                <Avatar name={complaint.order.clientName} />
                                <div>
                                    <p className="font-bold text-gray-800">{complaint.order.clientName}</p>
                                    <p className="text-gray-400 text-sm">عميل</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Craftsman */}
                    {complaint.order?.craftsmanName && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                                <Wrench className="w-4 h-4" /> الحرفي
                            </h2>
                            <div className="flex items-center gap-3">
                                <Avatar name={complaint.order.craftsmanName} />
                                <div>
                                    <p className="font-bold text-gray-800">{complaint.order.craftsmanName}</p>
                                    <p className="text-gray-400 text-sm">حرفي</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
                        <h2 className="text-sm font-bold text-gray-400 mb-2">الإجراءات</h2>

                        {/* status 0: جديد → بدء التحقيق */}
                        {complaint.status === 0 && (
                            <button
                                onClick={handleStartInvestigation}
                                disabled={actionLoading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {actionLoading ? "جاري التحديث..." : "بدء التحقيق"}
                            </button>
                        )}

                        {/* status 1: يتم التحقيق → تم الحل أو رفض */}
                        {complaint.status === 1 && (
                            <>
                                <button
                                    onClick={handleResolve}
                                    disabled={actionLoading}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                                >
                                    {actionLoading ? "جاري التحديث..." : "تم الحل"}
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={actionLoading}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
                                >
                                    رفض الشكوى
                                </button>
                            </>
                        )}

                        {/* status 2 أو 3: منتهي */}
                        {(complaint.status === 2 || complaint.status === 3) && (
                            <div className="text-center text-gray-400 text-sm py-2 bg-gray-50 rounded-lg">
                                تم اتخاذ الإجراء — لا يمكن التعديل
                            </div>
                        )}

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                        >
                            رجوع
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}