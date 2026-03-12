import axios from "axios";

const BASE_URL = "https://herafie.runasp.net/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

/**
 * جيب الـ userId بتاع الـ craftsman عن طريق مقارنة craftsmanId بقايمة الـ craftsmen
 * @param {number} craftsmanId - الـ id الظاهر في الشكوى (craftsman.id)
 * @returns {string|null} userId
 */
const getCraftsmanUserId = async (craftsmanId) => {
    const res = await axios.get(`${BASE_URL}/Craftsmen`, {
        headers: getAuthHeaders(),
    });
    const list = res.data ?? [];
    const found = list.find((c) => c.id === craftsmanId);
    return found?.userId ?? null;
};

/**
 * بعت notification لـ user معين
 * @param {string} userId
 * @param {string} title
 * @param {string} message
 */
const sendNotification = async (userId, title, message) => {
    await axios.post(
        `${BASE_URL}/Notification/send`,
        { userId, title, message },
        { headers: getAuthHeaders() }
    );
};

/**
 * بعت notification للـ craftsman عن طريق craftsmanId
 * بيجيب الـ userId أوتوماتيك من قايمة الـ craftsmen
 */
export const notifyCraftsman = async (craftsmanId, title, message) => {
    try {
        const userId = await getCraftsmanUserId(craftsmanId);
        if (!userId) {
            console.warn("notifyCraftsman: userId مش لاقيه للـ craftsmanId =", craftsmanId);
            return;
        }
        await sendNotification(userId, title, message);
    } catch (err) {
        console.error("notifyCraftsman error:", err);
    }
};

/**
 * بعت notification مباشرة لـ userId معروف (مثلاً العميل لو اتحفظ)
 */
export const notifyUser = async (userId, title, message) => {
    try {
        if (!userId) {
            console.warn("notifyUser: userId مش موجود");
            return;
        }
        await sendNotification(userId, title, message);
    } catch (err) {
        console.error("notifyUser error:", err);
    }
};

// ===========================
// رسايل ثابتة جاهزة للاستخدام
// ===========================

export const NOTIFICATION_MESSAGES = {
    // شكاوى
    COMPLAINT_UNDER_INVESTIGATION: {
        title: "تم استلام شكواك",
        message: "شكواك قيد المراجعة والتحقيق من قِبل الإدارة",
    },
    COMPLAINT_RESOLVED: {
        title: "تم حل شكواك",
        message: "تمت مراجعة شكواك وتم حلها بنجاح، يمكنك الاطلاع على التفاصيل",
    },
    COMPLAINT_REJECTED: {
        title: "تم رفض شكواك",
        message: "بعد المراجعة، تم رفض شكواك من قِبل الإدارة",
    },

    // طلبات
    ORDER_ACCEPTED: {
        title: "تم قبول طلبك",
        message: "قام الحرفي بقبول طلبك، سيتواصل معك قريباً",
    },
    ORDER_REJECTED: {
        title: "تم رفض طلبك",
        message: "نأسف، تم رفض طلبك من قِبل الحرفي",
    },
    ORDER_COMPLETED: {
        title: "تم إتمام الطلب",
        message: "تم إتمام طلبك بنجاح، نتمنى أن تكون راضياً عن الخدمة",
    },
};