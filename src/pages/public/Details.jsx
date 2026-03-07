import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Avatar from "../../components/common/Avatar";
import WorksDetails from "../../api/WorksDetails";

function Details() {
  const [details, setDetails] = useState([]);
  const defaultImages = ["/works1.jpeg", "/works2.jpeg", "/works3.jpeg"];

  useEffect(() => {
    async function fetchOrders() {
      const res = await WorksDetails();
      setDetails(res);
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen my-10 flex flex-col mx-5">
      <h1 className="text-center my-12 text-2xl font-bold">أعمالنا السابقة</h1>

      {details.slice(0, 3).map((work) => (
        <div
          key={work.id}
          className="flex flex-col md:flex-row justify-between items-start gap-6 p-5 my-5 bg-white shadow-lg rounded-xl"
        >
          {/* div الصورة والخبرة */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <img
              src={
                work.image ||
                defaultImages[Math.floor(Math.random() * defaultImages.length)]
              }
              alt={work.fullName}
              className="h-64 w-full object-cover rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-3">
              {work.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm"
                >
                  <p>{service.name}</p>
                  <p>{service.price} ج</p>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  تمت الخدمة في {work.cityName}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                      key={num}
                      className={
                        num <= work.rating ? "text-orange-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p>{work.yearsOfExperience} سنة خبرة</p>
            </div>

            <button className="bg-cyan-900 hover:bg-cyan-800 text-white font-medium px-5 py-2 rounded-lg mt-3">
              اطلب الآن
            </button>
          </div>

          {/* div التعليقات جنب div الصورة */}
          <div className="md:w-2/3 flex flex-col gap-4">
            <h3 className="text-lg font-bold">التعليقات</h3>
            {work.reviews && work.reviews.length > 0 ? (
              work.reviews.map((review, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 bg-gray-50 p-3 rounded shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Avatar />
                    <p className="font-medium">{review.clientName}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <FaStar
                        key={num}
                        className={
                          num <= review.rating
                            ? "text-orange-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <div className="text-gray-400 text-right text-sm">
                    {review.createdAt}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد تعليقات بعد</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;
