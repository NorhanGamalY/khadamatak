import React from 'react'
import { FaStar } from 'react-icons/fa';
import Avatar from "../../components/common/Avatar";
function Details() {
  return (
    <>
      <div className="min-h-screen my-25 flex flex-col mx-5">
        <h1 className="text-center my-5">أعمالنا السابقة</h1>
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 mx-5">
          <div>
            <img src="/Frame 1.png" />
            <div className="flex flex-col gap-10 justify-between">
              <div className="flex justify-between items-center">
                <span>نور غزلان</span>
                <p>500 ج</p>
              </div>
              <div className="flex justify-between items-center ">

                <span>تمت الخدمة ف مدينة المنصورة</span>
                <div className="flex ">
            <FaStar className="text-orange-600 text-sm" />
            <FaStar className="text-orange-600 text-sm" />
            <FaStar className="text-orange-600 text-sm" />
            <FaStar className="text-orange-600 text-sm" />
            <FaStar className="text-orange-600 text-sm" />
          </div>
              </div>
              <p>30 سنة</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3>تفاصيل عن الخدمة</h3>
            <p className="my-5">
              .موسبيإ ميرول صن نم خسن ىلع اًضيأ توح يتلاو ركيام جياب سودلأ لثم
              ينورتكلإلا رشنلا جمارب روهظ عم اَرخؤم ىرخأ ةرم رشتنيل داعو ،صنلا
              اذه نم عطاقم يوحت ةيكيتسالبلا تيسارتيل قئاقر رادصإ عم نرقلا اذه
              تايّنيتس يف ريبك لكشب رشتنا. ينورتكلإلا ديضنتلاو ةعابطلا يف يلصألا
              هلكشبو اًمدختسم راص ىتح هنا
            </p>
            <p className="my-5">
              .موسبيإ ميرول صن نم خسن ىلع اًضيأ توح يتلاو ركيام جياب سودلأ لثم
              ينورتكلإلا رشنلا جمارب روهظ عم اَرخؤم ىرخأ ةرم رشتنيل داعو ،صنلا
              اذه نم عطاقم يوحت ةيكيتسالبلا تيسارتيل قئاقر رادصإ عم نرقلا اذه
              تايّنيتس يف ريبك لكشب رشتنا. ينورتكلإلا ديضنتلاو ةعابطلا يف يلصألا
              هلكشبو اًمدختسم راص ىتح هنا
            </p>
            <p className="my-5">
              .موسبيإ ميرول صن نم خسن ىلع اًضيأ توح يتلاو ركيام جياب سودلأ لثم
              ينورتكلإلا رشنلا جمارب روهظ عم اَرخؤم ىرخأ ةرم رشتنيل داعو ،صنلا
              اذه نم عطاقم يوحت ةيكيتسالبلا تيسارتيل قئاقر رادصإ عم نرقلا اذه
              تايّنيتس يف ريبك لكشب رشتنا. ينورتكلإلا ديضنتلاو ةعابطلا يف يلصألا
              هلكشبو اًمدختسم راص ىتح هنا
            </p>
            <div className="flex justify-end mx-auto">
              <button className="  bg-cyan-900 text-white font-medium  w-auto px-3 py-3 ">
                اطلب الآن
              </button>
            </div>
          </div>
        </div>
        <div className="comments mx-5 ">
          <h3 className="my-5 ">التعليقات</h3>
          <div className="flex  items-center gap-3">
            <Avatar/>
            <p>أيسل بلال</p>
          </div>
      

          <div className="flex justify-start items-center  mx-12">
            <FaStar className="text-gray-300 text-sm" />
            <FaStar className="text-gray-300 text-sm" />
            <FaStar className="text-gray-300 text-sm" />
            <FaStar className="text-gray-300 text-sm" />
            <FaStar className="text-gray-300 text-sm" />
          </div>
          <div className='flex justify-end items-center'>شهر</div>
          <p className='my-5'>
            .موسبيإ ميرول صن نم خسن ىلع اًضيأ توح يتلاو ركيام جياب سودلأ لثم
            ينورتكلإلا رشنلا جمارب روهظ عم اَرخؤم ىرخأ ةرم رشتنيل داعو ،صنلا اذه
            نم عطاقم يوحت ةيكيتسالبلا تيسارتيل قئاقر رادصإ عم نرقلا اذه تايّنيتس
            يف ريبك لكشب رشتنا. ينورتكلإلا ديضنتلاو ةعابطلا يف يلصألا هلكشبو
            اًمدختسم راص ىتح هنا
          </p>
        </div>
      </div>
    </>
  );
}

export default Details;
