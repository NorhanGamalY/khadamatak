import React, { useState } from "react";
import { IoStarHalfOutline, IoStar } from "react-icons/io5";

const customers = [
  {
    id: 1,
    name: "محمد أحمد",
    comment: "خدمة ممتازة وسريعة، أنصح الجميع بالتعامل معه.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-06-15",
  },
  {
    id: 2,
    name: "سلام علي",
    comment: "كان محترفًا جدًا وأجرى العمل بجودة عالية.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2024-06-10",
  },
  {
    id: 3,
    name: "عمر محمود",
    comment: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2024-06-05",
  },
  {
    id: 4,
    name: "عمار سعيد",
    comment: "تجربة جيدة، لكن كان بإمكانه أن يكون أسرع قليلاً.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    date: "2024-06-05",
  },
];

const Evaluate = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-main relative text-primary">
      <main className="mx-auto max-w-7xl grid lg:gap-8 gap-6 lg:px-8 px-4 py-6 lg:py-8">
        <div className="bg-white grid items-center shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:gap-4 gap-2 text-center p-4 rounded">
          <h2 className="lg:text-3xl text-2xl font-extrabold border-b border-slate-300 lg:pb-3 pb-1">
            قائمة الخدمات
          </h2>
          <div className="flex m-auto items-center gap-2 lg:text-[16px] text-sm">
            <span className="font-bold text-secondary order-1"> ( 4.7 )</span>
            <span className="flex gap-1 items-center" dir="ltr">
              <IoStar className="text-yellow-400" />
              <IoStar className="text-yellow-400" />
              <IoStar className="text-yellow-400" />
              <IoStar className="text-yellow-400" />
              <IoStarHalfOutline className="text-yellow-400 " />
            </span>
          </div>
          <p className="text-secondary font-bold lg:text-[16px] text-sm">
            عدد التقيمات <span className="pr-1.5">( 32 )</span>
          </p>
        </div>

        <div className="grid lg:gap-6 gap-3 lg:grid-cols-1">
          {customers.map((c, idx) => (
            <div
              key={idx}
              className="bg-white text-secondary shadow-[0_6px_16px_rgba(17,24,39,0.08)] gap-4 p-4 py-6 rounded"
            >
              <div className="flex lg:items-center lg:gap-4 gap-3">
                <img src={c.image} alt="" className="w-18 h-18 rounded-full " />
                <div className="grid gap-3 w-full items-start">
                  <div className=" border-b w-full border-slate-300 lg:pb-2 pb-1 flex justify-between items-center">
                    <h1 className="font-bold lg:text-xl text-lg">{c.name}</h1>
                    <span className="text-slate-400 text-sm items-start whitespace-nowrap">
                      {c.date}
                    </span>
                  </div>
                  <div className="lg:flex grid justify-between lg:gap-5 gap-3">
                    <p className="text-sm lg:text-[16px] w-full">{c.comment}</p>
                    <span
                      className="flex gap-1 items-center ml-auto lg:mr-auto"
                      dir="ltr"
                    >
                      {Array.from({ length: Math.floor(c.rating) }, (_, i) => (
                        <IoStar key={i} className="text-yellow-400" />
                      ))}
                      {c.rating % 1 !== 0 && (
                        <IoStarHalfOutline className="text-yellow-400" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Evaluate;
