import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import WorksDetails from "../../api/WorksDetails";
const workData = [
  { img: "/works1.jpeg" },
  { img: "/works2.jpeg" },
  { img: "/works3.jpeg" },
];
function Works() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await WorksDetails();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center my-16">
        <h1 className="text-3xl font-bold">أعمالنا</h1>
        <p className="text-gray-500 mt-2">
          نماذج من الخدمات التي تم تنفيذها عبر منصتنا
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-2 gap-6">
        {data.filter((work) => work.rating>=4).slice(0, 4).map((work) => {
          const randomImage =
            workData[Math.floor(Math.random() * workData.length)].img;

          return (
            <Link
              to="/details"
              state={{ details: work }}
              key={work.id}
              className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition duration-300 block"
            >
              <img
                src={randomImage}
                alt=""
                className="w-full h-64 object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 ">
                <div className="bg-white/20 shadow-md px-4 py-1 rounded text-black">
                  {work.fullName}
                </div>
                <div className="bg-white/20 shadow-md px-4 py-1 rounded text-black">
                  {work.cityName}
                </div>
                <div className="flex gap-1 bg-white/20 shadow-md px-4 py-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                      key={num}
                      className={
                        num <= work.rating ? "text-orange-500" : "text-gray-400"
                      }
                    />
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Works;
