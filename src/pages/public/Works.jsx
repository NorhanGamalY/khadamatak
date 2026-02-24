import React from "react";
import { Link } from "react-router-dom";

const worksData = [
  { id: 1, img: "/work1.png", title: "عمل 1" },
  { id: 2, img: "/work2.png", title: "عمل 2" },
  { id: 3, img: "/work3.png", title: "عمل 3" },
  { id: 4, img: "/work4.png", title: "عمل 4" },
];

function Works() {
  return (
    <div className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center my-16">
        <h1 className="text-3xl font-bold">أعمالنا</h1>
        <p className="text-gray-500 mt-2">
          نماذج من الخدمات التي تم تنفيذها عبر منصتنا
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {worksData.map((work) => (
          <Link
            to={`/details`}
            key={work.id}
            className="rounded-xl overflow-hidden shadow hover:scale-105 transition duration-300 block"
          >
            <img src={work.img} alt={work.title} className="w-full" />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to="/details"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full shadow-md transition"
        >
          مشاهدة كل الأعمال
        </Link>
      </div>
    </div>
  );
}

export default Works;