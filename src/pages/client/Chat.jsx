import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserId, getToken } from "../../features/auth/authHelpers";

const BASE_URL = "https://herafie.runasp.net";
const currentUserId = getUserId();

const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});

const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
};

const fetchCraftsmen = async () => {
    const res = await fetch(`${BASE_URL}/api/Craftsmen`);
    if (!res.ok) throw new Error("فشل جلب بيانات الحرفيين");
    return res.json();
};

const fetchChatList = async () => {
    const res = await fetch(`${BASE_URL}/api/Chat/chat-list`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("فشل جلب قائمة المحادثات");
    return res.json();
};

const fetchConversation = async (receiverId) => {
    if (!receiverId) return [];
    const res = await fetch(`${BASE_URL}/api/Chat/conversation/${receiverId}`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("فشل جلب المحادثة");
    return res.json();
};

const sendMessage = async ({ receiverId, content }) => {
    const res = await fetch(`${BASE_URL}/api/Chat/send`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ receiverId, content }),
    });
    if (!res.ok) throw new Error("فشل إرسال الرسالة");
    return res.json();
};

const markAsRead = async (senderId) => {
    if (!senderId) return;
    await fetch(`${BASE_URL}/api/Chat/mark-read/${senderId}`, {
        method: "POST",
        headers: authHeaders(),
    });
};

const Chat = () => {
    const { craftsmanId } = useParams();
    const queryClient = useQueryClient();
    const messagesEndRef = useRef(null);

    const [openChat, setOpenChat] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [activeCraftsmanUserId, setActiveCraftsmanUserId] = useState(null);
    const [activeCraftsmanName, setActiveCraftsmanName] = useState("");


    const { data: craftsmen = [], isLoading: loadingCraftsmen } = useQuery({
        queryKey: ["craftsmen"],
        queryFn: fetchCraftsmen,
    });

    const craftsmanFromUrl = craftsmen.find(
        (c) => String(c.id) === String(craftsmanId)
    );

    const { data: chatList = [], isLoading: loadingChatList } = useQuery({
        queryKey: ["chatList"],
        queryFn: fetchChatList,
        refetchInterval: 10000,
    });

    const { data: messages = [], isLoading: loadingMessages } = useQuery({
        queryKey: ["conversation", activeCraftsmanUserId],
        queryFn: () => fetchConversation(activeCraftsmanUserId),
        enabled: !!activeCraftsmanUserId,
        refetchInterval: 5000,
    });

    const sendMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries(["conversation", activeCraftsmanUserId]);
            queryClient.invalidateQueries(["chatList"]);
        },
    });

    useEffect(() => {
        if (craftsmanFromUrl && !activeCraftsmanUserId) {
            setActiveCraftsmanUserId(craftsmanFromUrl.userId);
            setActiveCraftsmanName(craftsmanFromUrl.fullName);
            setOpenChat(true);
            markAsRead(craftsmanFromUrl.userId);
        }
    }, [craftsmanFromUrl]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleOpenConversation = (userId, name) => {
        setActiveCraftsmanUserId(userId);
        setActiveCraftsmanName(name);
        setOpenChat(true);
        markAsRead(userId);
        queryClient.invalidateQueries(["chatList"]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim() || !activeCraftsmanUserId) return;
        sendMutation.mutate({
            receiverId: activeCraftsmanUserId,
            content: messageText.trim(),
        });
        setMessageText("");
    };


    const getCraftsmanNameByUserId = (userId) => {
        const found = craftsmen.find((c) => c.userId === userId);
        return found?.fullName || "حرفي";
    };

    const getAvatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`;


    if (loadingCraftsmen) {
        return (
            <div className="flex items-center justify-center h-screen text-secondary font-bold text-xl">
                جاري التحميل...
            </div>
        );
    }

    return (
    <div dir="ltr" className="max-h-screen bg-white text-primary pt-20">
        <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
            <div className="grid lg:grid-cols-6 lg:gap-2">

            <div
            className={`lg:col-span-2 rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:pt-6 py-4
            ${openChat ? "hidden lg:flex flex-col" : "flex flex-col"}`}
            >
            <h1 className="text-3xl font-bold border-b border-slate-300 lg:pb-2 text-center text-secondary pb-3">
                قائمة المحادثات
            </h1>

            <div className="lg:h-[70vh] h-screen overflow-y-auto overflow-message">
                {loadingChatList ? (
                <p className="text-center text-slate-400 py-6 font-semibold">
                        جاري تحميل المحادثات...
                </p>
                ) : chatList.length === 0 ? (
                    <p className="text-center text-slate-400 py-6 font-semibold">
                        لا توجد محادثات بعد
                    </p>
                ) : (
                    chatList.map((chat) => {
                    const name = getCraftsmanNameByUserId(chat.userId);
                    const isActive = activeCraftsmanUserId === chat.userId;
                    return (
                        <button
                            key={chat.userId}
                            onClick={() => handleOpenConversation(chat.userId, name)}
                            className={`py-4 lg:px-4 px-2 w-full border-b border-slate-200 flex items-start text-left gap-4
                            ${isActive ? "bg-orange-50" : "hover:bg-slate-50"}`}
                        >
                        <div className="relative shrink-0">
                            <img
                                src={getAvatarUrl(name)}
                                className="w-14 h-14 rounded-full object-cover"
                                alt={name}
                            />
                                {chat.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {chat.unreadCount}
                            </span>
                            )}
            </div>
            <div className="grid gap-0.5 text-secondary flex-1 min-w-0">
                <h1 className="font-bold text-lg truncate">{name}</h1>
                    <p dir="rtl" className="line-clamp-1 text-sm font-semibold text-slate-500">
                        {chat.lastMessage}
                    </p>
            </div>
            <div className="text-[10px] text-slate-400 whitespace-nowrap font-bold ml-auto mb-auto shrink-0">
                    {formatTime(chat.lastMessageTime)}
            </div>
                </button>
            );
            })
            )}
            </div>
    </div>

    {openChat ? (
        <div className="lg:col-span-4 flex flex-col relative border border-slate-200">

        <div className="bg-secondary-orange rounded rounded-bl-none rounded-br-none lg:p-4 py-4 px-2 lg:grid lg:grid-cols-5 flex gap-5 lg:items-center items-start text-white">
            <button
                className="col-span-1"
                onClick={() => setOpenChat(false)}
            >
                    <ArrowLeft />
            </button>
            <div className="flex lg:items-center justify-center col-span-3 lg:gap-4 gap-3 m-auto">
                <img
                    src={getAvatarUrl(activeCraftsmanName)}
                    alt={activeCraftsmanName}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-full"
                />
            <div className="text-center grid lg:gap-1">
                <h1 className="font-bold text-xl">{activeCraftsmanName}</h1>
                <p className="text-orange-200 text-sm font-bold">متصل الآن</p>
            </div>
            </div>
                <button className="col-span-1 text-3xl text-white ml-auto">
                    <BiDotsHorizontalRounded />
                </button>
            </div>

        <div
            className="lg:px-4 px-2 relative flex flex-col pb-20 lg:h-[70vh] h-screen overflow-y-auto gap-3 py-6 overflow-message"
            dir="ltr"
        >
            {loadingMessages ? (
                <p className="text-center text-slate-400 font-semibold m-auto">
                        جاري تحميل الرسائل...
                </p>
            ) : messages.length === 0 ? (
                <p className="text-center text-slate-400 font-semibold m-auto">
                            ابدأ المحادثة الآن 👋
                </p>
            ) : (
            messages.map((msg, idx) => {
                const isMine = msg.senderId === currentUserId;
                    return (
                    <div
                        key={idx}
                        className={`flex flex-col gap-1 max-w-xs ${isMine ? "ml-auto items-end" : "mr-auto items-start"
                }`}
            >
        <div
            className={`rounded-2xl px-4 py-3 font-semibold text-sm leading-relaxed
                ${isMine
                    ? "bg-secondary-orange text-white rounded-br-none"
                    : "bg-slate-100 text-black rounded-bl-none"
                }`}
        >
                {msg.content}
        </div>
            <span className="text-[10px] text-slate-400 font-bold px-1">
                {formatTime(msg.sentAt)}
            </span>
        </div>
                );
            })
        )}
        <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3">
                                <form onSubmit={handleSendMessage}>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            placeholder="كتابة الرسالة..."
                                            className="w-full py-3 px-3 pr-16 border border-slate-400 rounded-lg font-semibold focus:outline-none focus:border-secondary-orange"
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            disabled={sendMutation.isPending}
                                        />
                                        <button
                                            type="submit"
                                            disabled={sendMutation.isPending || !messageText.trim()}
                                            className="absolute right-0 top-0 h-full px-4 bg-secondary-orange text-white rounded-r-lg disabled:opacity-50 transition-opacity"
                                        >
                                            <IoSend />
                                        </button>
                                    </div>
                                    {sendMutation.isError && (
                                        <p className="text-red-500 text-xs mt-1 font-semibold text-right">
                                            فشل إرسال الرسالة، حاول مرة أخرى
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:col-span-4 hidden lg:flex flex-col relative border border-slate-200 items-center justify-center font-bold text-xl text-secondary">
                            <h1>ابدأ محادثتك الآن</h1>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Chat;