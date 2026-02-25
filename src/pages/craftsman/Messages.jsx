import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const users = [
  {
    id: 1,
    name: "محمد أحمد",
    message: "خدمة ممتازة وسريعة، أنصح الجميع بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-06-15",
  },
  {
    id: 2,
    name: "سلام علي",
    message: "كان محترفًا جدًا وأجرى العمل بجودة عالية.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2024-06-10",
  },
  {
    id: 3,
    name: "عمر محمود",
    message: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2024-06-05",
  },
  {
    id: 4,
    name: "عمار سعيد",
    message: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    date: "2024-06-05",
  },
  {
    id: 5,
    name: "أحمد محمد",
    message: "خدمة ممتازة، سعيد بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    date: "2024-06-12",
  },
];

const Messages = () => {
  const [userMessage, setUserMessage] = useState([]);
  const [message, setMessage] = useState({
    id: Date.now(),
    text: "",
  });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setUserMessage([...userMessage, message]);
    setMessage({ id: 0, text: "" });
  };
  return (
    <div dir="ltr" className="max-h-screen bg-white text-primary">
      <main className="mx-auto max-w-7xl lg:px-8 px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-6 lg:gap-2">
          <div className="lg:col-span-2 rounded shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:pt-6 py-4">
            <h1 className="text-3xl font-bold border-b border-slate-300 lg:pb-2 text-center text-secondary pb-3">
              قائمة المحادثات
            </h1>
            <div className="lg:h-[70vh] h-screen overflow-y-auto overflow-message">
              {users.map((user) => (
                <div className="lg:py-6 lg:px-4 py-4 px-2  border-b border-slate-200 flex gap-4">
                  <img
                    src={user.image}
                    className="w-14 h-14 rounded-full object-cover"
                    alt={user.name}
                  />
                  <div className="grid gap-1 text-secondary items-end justify-end">
                    <h1 className="font-bold text-lg">{user.name}</h1>
                    <p dir="rtl" className="line-clamp-1 text-sm font-semibold">
                      {user.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:flex flex-col hidden relative border border-slate-200">
            <div className="bg-secondary-orange rounded p-4 grid lg:grid-cols-5 items-center text-white ">
              <button className="col-span-1">
                <ArrowLeft />
              </button>
              <div className="flex items-center justify-center col-span-3 gap-4">
                <img
                  src={users[0].image}
                  alt={users[0].name}
                  className="w-18 h-18 rounded-full"
                />
                <div className="text-center grid gap-1">
                  <h1 className="font-bold text-2xl">{users[0].name}</h1>
                  <p className="text-orange-200 text-sm font-bold">متصل الان</p>
                </div>
              </div>
              <button className="col-span-1 text-3xl text-white ml-auto">
                <BiDotsHorizontalRounded />
              </button>
            </div>
            <div
              className="px-4 text-right relative flex flex-col pb-24 lg:h-[70vh] h-screen overflow-y-auto gap-6 py-6 overflow-message"
              dir="ltr"
            >
              <div className="bg-main rounded text-black max-w-xs p-3 py-3 w-full mr-auto font-semibold">
                السلام عليكم ورحمة الله وبركاته، كيف يمكنني مساعدتك اليوم؟
              </div>
              {userMessage.map((msg, idx) => (
                <div
                  className="bg-main rounded text-black max-w-xs p-3 py-3 w-full mr-auto font-semibold"
                  key={idx}
                >
                  {msg.text}
                </div>
              ))}
              <div className="bg-secondary rounded text-white  max-w-xs p-3 py-3 w-full ml-auto font-semibold">
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
        </div>
      </main>
    </div>
  );
};

export default Messages;
