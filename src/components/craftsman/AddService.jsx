import React, { useState } from "react";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";
import { FaFileLines } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const AddService = ({
  serviceData,
  setServiceData,
  handleAddService,
  setIsAddServiceModelOpen,
  serviceCategories,
  isOpen,
  setIsOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex "
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
          onClick={() => setIsAddServiceModelOpen(false)}
        >
          <CgClose />
        </button>
        <form
          action=""
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddService(serviceData);
            setIsAddServiceModelOpen(false);
          }}
        >
          <h1 className="lg:text-3xl text-2xl text-secondary font-semibold">
            إضافة خدمة جديدة
          </h1>

          <div className="grid gap-2">
            <label htmlFor="title">اسم الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <MdOutlineMiscellaneousServices className="-rotate-90 text-lg text-[#A3A3A3] " />
              <input
                type="text"
                placeholder="صيانة عامة"
                value={serviceData.name || ""}
                onChange={(e) =>
                  setServiceData({ ...serviceData, name: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">سعر الخدمة </label>
            <div className="flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <PiMoneyWavyLight className="text-lg text-[#A3A3A3]" />
              <input
                type="number"
                placeholder="500ج.م"
                value={serviceData.price || ""}
                onChange={(e) =>
                  setServiceData({ ...serviceData, price: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="w-full focus:outline-none flex items-center gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]"
            >
              {selectedCategory.name ? (
                selectedCategory.name
              ) : (
                <span> اختر تصنيف الخدمة</span>
              )}
              <span className="mr-auto">
                <IoIosArrowDown />
              </span>
            </button>

            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease: "easeInOut" }}
                className="absolute inset-x-0 mt-2 mx-6 bg-white border border-gray-100 rounded shadow-xl overflow-hidden z-50 origin-top"
              >
                {serviceCategories.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 font-semibold border-b border-slate-200 text-gray-700 bg-wh hover:bg-gray-50 hover:text-secondary cursor-pointer  last:border-none text-sm"
                    onClick={() => {
                      setServiceData({
                        ...serviceData,
                      });
                      setSelectedCategory({ id: item.id, name: item.name });
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="title">وصف الخدمة </label>
            <div className="flex gap-2 border border-[#BABABA] py-2 px-2 rounded mt-1 bg-white placeholder:text-[#A3A3A3]">
              <FaFileLines className="text-lg text-[#A3A3A3]" />
              <textarea
                rows={4}
                placeholder="اكتب وصفا مختصرا للخدمة"
                className="w-full focus:outline-none"
                value={serviceData.description || ""}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-secondary w-full text-white px-4 py-2 rounded cursor-pointer"
            >
              حفظ الخدمة
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddService;
