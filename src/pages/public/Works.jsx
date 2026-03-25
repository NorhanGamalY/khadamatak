import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import WorksDetails from "../../api/WorksDetails";

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
    <div className="py-10 md:py-16 max-w-6xl mx-auto px-4">
      <div className="text-center my-10 md:my-16">
        <h1 className="text-2xl md:text-3xl font-bold">أعمالنا</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          نماذج من الخدمات التي تم تنفيذها عبر منصتنا
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {data
          .filter((work) => work.rating >= 4)
          .slice(0, 4)
          .map((work) => {

            return (
              <Link
                to="/details"
                state={{ details: work }}
                key={work.id}
                className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition duration-300 block"
              >
                <img
                  src={work.profilePicture}
                  alt=""
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full flex flex-wrap justify-around items-center gap-1 py-2 px-2">
                  <div className="bg-white/20 shadow-md px-2 py-1 rounded text-black text-xs md:text-sm">
                    {work.fullName}
                  </div>
                  <div className="bg-white/20 shadow-md px-2 py-1 rounded text-black text-xs md:text-sm">
                    {work.cityName}
                  </div>
                  <div className="flex gap-1 bg-white/20 shadow-md px-2 py-1 rounded">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <FaStar
                        key={num}
                        size={12}
                        className={
                          num <= work.rating
                            ? "text-orange-500"
                            : "text-gray-400"
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