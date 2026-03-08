import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { getUserId } from "../../features/auth/authHelpers";
const userId = getUserId();
console.log("Current User ID:", userId); 
const users = [
    {
    id: 1,
    name: "محمد أحمد",
    message: "خدمة ممتازة وسريعة، أنصح الجميع بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    time: "12:00 AM",
    },
    {
    id: 2,
    name: "سلام علي",
    message: "كان محترفًا جدًا وأجرى العمل بجودة عالية.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    time: "الامس",
    },
    {
    id: 3,
    name: "عمر محمود",
    message: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    time: "اليوم",
    },
    {
    id: 4,
    name: "عمار سعيد",
    message: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    time: "الاربعاء",
    },
    {
    id: 5,
    name: "أحمد محمد",
    message: "خدمة ممتازة، سعيد بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    time: "الخميس",
    },
    {
    id: 6,
    name: "سامي سلام",
    message: "خدمة ممتازة، سعيد بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    time: "اليوم",
    },
];

const Chat = () => {
    const [userMessage, setUserMessage] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const [message, setMessage] = useState({
    id: Date.now(),
    text: "",
    });
    const [currentUser, setCurrentUser] = useState(users[0]);
    const handleMessageSubmit = (e) => {
    e.preventDefault();
    setUserMessage([...userMessage, message]);
    setCurrentUser(users[0]);
    setMessage({ id: 0, text: "" });
    };
    return (
    <div dir="ltr" className="max-h-screen bg-white text-primary pt-20">
        <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-6 lg:gap-2">
            <div
            className={`lg:col-span-2  rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:pt-6 py-4
            ${openChat ? "hidden lg:flex flex-col" : "flex flex-col"} `}
            >
            <h1 className="text-3xl font-bold border-b border-slate-300 lg:pb-2 text-center text-secondary pb-3">
                قائمة المحادثات
            </h1>
            <div className="lg:h-[70vh] h-screen overflow-y-auto overflow-message">
                {users.map((user) => (
                <button
                    onClick={() => {
                    setOpenChat(true);
                    setCurrentUser(user);
                    }}
                    className="py-4 lg:px-4 px-2 w-full border-b border-slate-200 flex items-start text-left gap-4"
                >
                    <img
                    src={user.image}
                    className="w-14 h-14 rounded-full object-cover"
                    alt={user.name}
                    />
                    <div className="grid gap-0.5 text-secondary">
                    <h1 className="font-bold text-lg">{user.name}</h1>
                    <p dir="rtl" className="line-clamp-1 text-sm font-semibold">
                        {user.message}
                    </p>
                    </div>
                    <div className="text-[10px] text-slate-400 whitespace-nowrap font-bold ml-auto mb-auto">
                    {user.time}
                    </div>
                </button>
                ))}
            </div>
            </div>
            {openChat ? (
            <div className="lg:col-span-4 flex flex-col relative border border-slate-200 ">
                <div className="bg-secondary-orange rounded rounded-bl-none rounded-br-none  lg:p-4 py-4 px-2 lg:grid lg:grid-cols-5 flex gap-5  lg:items-center items-start text-white ">
                <button
                    className="col-span-1"
                    onClick={() => setOpenChat(false)}
                >
                    <ArrowLeft />
                </button>
                <div className="flex lg:items-center justify-center col-span-3 lg:gap-4 gap-3 m-auto">
                    <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="lg:w-18 lg:h-18 w-12 h-12 rounded-full"
                    />
                    <div className="text-center grid lg:gap-1">
                    <h1 className="font-bold text-xl">{currentUser.name}</h1>
                    <p className="text-orange-200 text-sm font-bold">
                        متصل الان
                    </p>
                    </div>
                </div>
                <button className="col-span-1 text-3xl text-white ml-auto">
                    <BiDotsHorizontalRounded />
                </button>
                </div>
                <div
                className="lg:px-4 px-2 text-right relative flex flex-col pb-24 lg:h-[70vh] h-screen overflow-y-auto gap-6 py-6 overflow-message"
                dir="ltr"
                >
                <div className="bg-main rounded text-black max-w-xs p-3 w-full mr-auto font-semibold">
                    السلام عليكم ورحمة الله وبركاته، كيف يمكنني مساعدتك اليوم؟
                </div>
                {userMessage.map((msg, idx) => (
                    <div
                    className="bg-main rounded text-black max-w-xs p-3 w-full mr-auto font-semibold"
                    key={idx}
                    >
                    {msg.text}
                    </div>
                ))}
                <div className="bg-secondary rounded text-white  max-w-xs p-3  w-full ml-auto font-semibold">
                    وعليكم السلام ورحمة الله وبركاته
                </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3">
                <form onSubmit={handleMessageSubmit}>
                    <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="كتابة الرسالة..."
                        className="w-full py-3 px-3 pr-16 border border-slate-400 rounded-lg font-semibold focus:outline-none"
                        value={message.text}
                        onChange={(e) =>
                        setMessage({ ...message, text: e.target.value })
                        }
                    />

                    <button
                        type="submit"
                        className="absolute right-0 top-0 h-full px-4 bg-secondary-orange text-white rounded-r-lg"
                    >
                        <IoSend />
                    </button>
                    </div>
                </form>
                </div>
            </div>
            ) : (
            <div className="lg:col-span-4 hidden lg:flex flex-col relative border border-slate-200 items-center justify-center font-bold text-xl text-secondary">
                <h1> ابدأ محادثتك الان</h1>
            </div>
            )}
        </div>
        </main>
    </div>
    );
};

export default Chat;
