import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoStarHalfOutline, IoStar } from "react-icons/io5";
import Avatar from "../../components/common/Avatar";
import { getId, getToken } from "../../features/auth/authHelpers";

const Evaluate = () => {
  const id = getId();
  const token = getToken();
  const [reviews, setReviews] = useState({ items: [] });
  const [reviewsLength, setReviewsLength] = useState(0);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalCount: 0,
  });
  const avg =
    reviewsLength > 0
      ? reviews.items.reduce((sum, r) => sum + r.rating, 0) /
        reviews.items.length
      : "0.0";

  const getAllReview = async () => {
    try {
      const res = await axios.get(
        `https://herafie.runasp.net/api/Review/craftsman/${id}?pageNumber=${pagination.pageNumber}&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setReviews({ items: res.data.items });
      setReviewsLength(res.data.totalCount || 0);
      setPagination({
        ...pagination,
        totalCount: res.data.totalCount,
        pageNumber: res.data.pageNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getAllReview();
    }
  }, [id, pagination.pageNumber]);

  const renderRating = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => {
      if (star <= Math.floor(rating)) {
        return <IoStar className="text-yellow-400" key={star} />;
      } else if (star === Math.floor(rating) && rating % 1 !== 0) {
        return <IoStarHalfOutline className="text-yellow-400" key={star} />;
      } else {
        return <IoStar className="text-gray-200" key={star} />;
      }
    });
  };
  return (
    <div dir="rtl" className="min-h-screen bg-main relative text-primary">
      <main className="mx-auto max-w-7xl grid lg:gap-8 gap-6 lg:px-8 px-4 py-6 lg:py-8">
        <div className="bg-white grid items-center shadow-[0_6px_16px_rgba(17,24,39,0.08)] lg:gap-4 gap-2 text-center p-4 rounded">
          <h2 className="lg:text-3xl text-2xl font-extrabold border-b border-slate-300 lg:pb-3 pb-1">
            قائمة الخدمات
          </h2>
          <div className="flex m-auto items-center gap-2 lg:text-[16px] text-sm">
            <span className="font-bold text-secondary order-1"> ( {avg} )</span>
            <span className="flex gap-0.5">{renderRating(avg)}</span>
          </div>
          <p className="text-secondary font-bold lg:text-[16px] text-sm">
            عدد التقيمات <span className="pr-0.5">( {reviewsLength} )</span>
          </p>
        </div>

        <div className="grid lg:gap-6 gap-3 lg:grid-cols-1">
          {reviews.items.length > 0 ? (
            reviews.items.map((c, idx) => (
              <div
                key={idx}
                className="bg-white text-secondary shadow-[0_6px_16px_rgba(17,24,39,0.08)] gap-4 p-4 py-6 rounded"
              >
                <div className="flex lg:items-center lg:gap-4 gap-3">
                  <Avatar src={c.image} name={c.clientName} size={50} />
                  <div className="grid gap-3 w-full items-start">
                    <div className=" border-b w-full border-slate-300 lg:pb-2 pb-1 flex justify-between items-center">
                      <h1 className="font-bold lg:text-xl text-lg">
                        {c.clientName}
                      </h1>
                      <span className="text-slate-400 text-sm items-start whitespace-nowrap">
                        {c.createdAt}
                      </span>
                    </div>
                    <div className="lg:flex grid justify-between lg:gap-5 gap-3">
                      <p className="text-sm lg:text-[16px] w-full">
                        {c.comment}
                      </p>
                      <span
                        className="flex gap-0.5 items-center ml-auto lg:mr-auto"
                        dir="ltr"
                      >
                        {renderRating(c.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-semibold">لا توجد تقيمات بعد</p>
          )}
        </div>
        {reviews.items.length > 5 && (
          <div>
            <Pagination
              pageNumber={pagination.pageNumber}
              onChange={(page) =>
                setPagination((p) => ({ ...p, pageNumber: page }))
              }
              totalCount={pagination.totalCount}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Evaluate;

const Pagination = ({ pageNumber, totalCount, onChange }) => {
  const totalPage = Math.ceil(totalCount / 5);
  return (
    <div className="w-fit m-auto rounded px-10 flex items-center gap-1 justify-center lg:mt-12 mt-6 border border-slate-100 bg-white py-2">
      {Array.from({ length: totalPage }).map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            className={`${pageNumber === pageNum ? "bg-secondary text-white " : " "} text-secondary border border-slate-200 rounded px-2 text-lg`}
            onClick={() => onChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};
