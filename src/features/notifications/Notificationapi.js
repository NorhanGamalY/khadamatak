import axios from "axios";

const BASE_URL = "https://herafie.runasp.net/api";

const ADMIN_USER_ID = "d18c1d85-d9bd-491a-8248-f0202aa5a9a2";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

/**
 * @param {number} craftsmanId 
 * @returns {string|null} 
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

export const notifyAdmin = async (title, message) => {
    try {
        await sendNotification(ADMIN_USER_ID, title, message);
    } catch (err) {
        console.error("notifyAdmin error:", err);
    }
};


export const NOTIFICATION_MESSAGES = {
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

    ADMIN_NEW_COMPLAINT: {
        title: "شكوى جديدة",
        message: "تم تقديم شكوى جديدة وتحتاج إلى مراجعة",
    },
    ADMIN_COMPLAINT_UNDER_INVESTIGATION: {
        title: "تم بدء التحقيق في شكوى",
        message: "تم بدء التحقيق في إحدى الشكاوى",
    },
    ADMIN_COMPLAINT_RESOLVED: {
        title: "تم حل شكوى",
        message: "تم حل إحدى الشكاوى بنجاح",
    },
    ADMIN_COMPLAINT_REJECTED: {
        title: "تم رفض شكوى",
        message: "تم رفض إحدى الشكاوى وإغلاق النزاع",
    },

    CRAFTSMAN_NEW_COMPLAINT: {
        title: "تم تقديم شكوى ضدك",
        message: "قام أحد العملاء بتقديم شكوى بخصوص أحد طلباتك، وستتم مراجعتها من قِبل الإدارة",
    },
};