import React from "react";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";
import { FaFileLines } from "react-icons/fa6";

const EditService = ({
  setIsEditModelOpen,
  handleEditService,
  editServiceData,
  setEditServiceData,
}) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-main lg:w-1/2 w-11/12 h-fit mt-6 rounded mx-auto lg:p-6 py-4 p-3 shadow-xl relative"
      >
        <button
          className="absolute lg:left-5 left-3 lg:top-7 top-5 cursor-pointer"
          onClick={() => setIsEditModelOpen(false)}
        >
          <CgClose />
        </button>
        <form
          action=""
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditService(editServiceData);
          }}
        >
          <h1 className="lg:text-3xl text-2xl text-secondary font-semibold">
            تعديل الخدمة
          </h1>

          <div className="grid gap-2">
            <label htmlFor="title">اسم الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <MdOutlineMiscellaneousServices className="-rotate-90 text-lg text-[#A3A3A3] " />
              <input
                type="text"
                placeholder="صيانة عامة"
                value={editServiceData.name}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    name: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">سعر الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <PiMoneyWavyLight className="text-lg text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="500ج.م"
                value={editServiceData.price}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    price: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">وصف الخدمة </label>
            <div className="flex gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <FaFileLines className="text-lg text-[#A3A3A3]" />
              <textarea
                rows={4}
                placeholder="اكتب وصفا مختصرا للخدمة"
                className="w-full"
                value={editServiceData.description}
                onChange={(e) =>
                  setEditServiceData({
                    ...editServiceData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 m-auto">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded cursor-pointer"
            >
              save changes
            </button>
            <button
              className="bg-[#D75B19] text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setIsEditModelOpen(false)}
            >
              cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditService;
