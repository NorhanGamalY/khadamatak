import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Avatar from "../../components/common/Avatar";
import { useLocation, useNavigate } from "react-router-dom";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { details } = location.state;

  if (!details) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="min-h-screen my-10 flex flex-col mx-5">
      <h1 className="text-center my-12 text-2xl font-bold">أعمالنا السابقة</h1>
      <div
        key={details.id}
        className="flex flex-col md:flex-row justify-between items-start gap-6 p-5 my-5 bg-white shadow-lg rounded-xl"
      >
        <div className="md:w-1/3 flex flex-col gap-4">
          <img
            src={details.profilePicture}
            alt={details.fullName}
            className="h-64 w-full object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col gap-3">
            {details.services?.map((service, idx) => (
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
                تمت الخدمة في {details.cityName}
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={
                      num <= details?.rating ? "text-orange-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <p>{details.yearsOfExperience} سنة خبرة</p>
          </div>

          <button
            onClick={() =>
              navigate("/service-request", {
                state: { craftsman: details },
              })
            }
            className="bg-cyan-900 hover:bg-cyan-800 text-white font-medium px-5 py-2 rounded-lg mt-3"
          >
            اطلب الآن
          </button>
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <h3 className="text-lg font-bold">التعليقات</h3>
          {details.reviews && details.reviews.length > 0 ? (
            details.reviews.map((review, i) => (
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
                        num <= review.rating ? "text-orange-500" : "text-gray-300"
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
    </div>
  );
}

export default Details;