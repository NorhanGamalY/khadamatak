import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const worksData = [
  {
    id: 1,
    img: "/works1.jpeg",
    title: "النجاره",
    city: "القاهره",
    rate: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
  },
  {
    id: 2,
    img: "/works2.jpeg",
    title: "السباكه",
    city: "المنصوره",
    rate: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
  },
  {
    id: 3,
    img: "/works3.jpeg",
    title: "فني تكييف",
    city: "مطروح",
    rate: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
  },
  {
    id: 4,
    img: "/works4.jpeg",
    title: "النقاشه",
    city: "الاسكندريه",
    rate: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
  },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {worksData.map((work) => (
          <Link
            to="/details"
            key={work.id}
            className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition duration-300 block"
          >
            <img src={work.img} alt="" className="w-full h-full object-cover" />

            {/* الكارد فوق الصورة */}
            <div className="absolute bottom-0 left-0 w-full flex justify-around items-center mx-auto">
              <span className="font-semibold  bg-gray/60 backdrop-blur-sm text-white  py-3 px-3  rounded-b-lg my-3">
                {work.title}
              </span>
              <span className="  bg-gray/60 backdrop-blur-sm text-white py-3 px-3 rounded-b-lg my-3">
                {work.city}
              </span>
              <span className="flex justify-content-between items-center  bg-gray/60 backdrop-blur-sm text-white  rounded-b-lg py-3 px-3 my-3">
                {work.rate}
              </span>
            </div>
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