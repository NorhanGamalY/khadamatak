import { React, useEffect, useState } from 'react'
import OurServices from './Ourservices'
import AvalibaleTimes from './AvalibaleTimes'
import Rating from './Rating'
import Craftmanimg from '../../../assets/craftman-details/Craftsman.png';
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SplashLoader from '../../../components/common/SplashLoader';

function CraftmanDetails() {
    const [craftman, setCraftman] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://herafie.runasp.net/api/Craftsmen/${id}/profile`)
            .then(res => res.json())
            .then(data => setCraftman(data))
            .catch(err => console.log(err));
    }, [id]);
    const prices = craftman?.services.map(service => service.price);
    if (!craftman) return <p className='min-h-screen py-10 px-4 mt-20 text-center font-bold text-3xl'>
        <span className='flex min-h-screen  justify-center items-center gap-4'><SplashLoader /> </span></p>
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 px-4 mt-20">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    <div className="bg-secondary p-8 relative flex  items-center justify-between text-white ">
                        <div className="z-10 ">

                            <h1 className="text-2xl font-bold ">{craftman?.fullName}</h1>
                            <p className="text-gray-300"> الخبره: {craftman.yearsOfExperience} </p>
                            <div className="flex items-center gap-1 mt-1 text-yellow-400">
                                <span className='flex gap-2 items-center'> تقييم :{craftman?.rating ||"لا يوجد تقييم"} 
                                    {craftman?.rating ? [...Array(Math.round(craftman.rating))].map((_, i) => <FaStar key={i} />) : null}
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-0 left-0 lg:w-40 lg:h-50 h-55 w-40 overflow-hidden">
                            <img src={Craftmanimg} alt="craftsman" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <section className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                            <h2 className="text-lg font-bold mb-2">نبذة عن الحرفي</h2>
                            <p className="text-gray-800 text-sm ">
                                {craftman?.bio|| "لا توجد بيانات تعريفية"}
                            </p>
                        </section>

                        <section className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">

                            <OurServices services={craftman?.services} />
                        </section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AvalibaleTimes

                        services={craftman?.services} availabilities={craftman?.availabilities} prices={prices} />
                        </div>

                        <section className='shadow-sm rounded-xl p-4'>
                            <h2 className="text-lg font-bold mb-2">التقييمات</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <Rating reviews={craftman?.reviews}/>
                            </div>
                        </section>

                        <button
                            className="w-full bg-[#d35400] hover:bg-[#b34700] text-white
                            font-bold py-3 rounded-xl transition-all shadow-lg mt-4"
                            onClick={() => navigate(`/chat/${craftman.id}`)}>
                            راسل الحرفي الآن
                        </button>
                        <button
                            className="w-full bg-secondary hover:bg-blue-900 text-white
                            font-bold py-3 rounded-xl transition-all shadow-lg"                         
                            onClick={() => navigate(`/service-request` , { state: { craftsman: craftman } })}>
                                انشاء طلب الخدمة 
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CraftmanDetails
