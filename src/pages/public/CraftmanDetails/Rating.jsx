import React from 'react'
import rating1 from '../../../assets/craftman-details/rating1.png';
import rating2 from '../../../assets/craftman-details/rating2.png';
import { FaStar } from "react-icons/fa";


const RatingData = [
    { id: 1, img: rating1, rate: 5, description: `"خدمة سريعة وتعامل محترم، أنصح بها"` },
    { id: 2, img: rating2, rate: 4, description: `"سرعة في العمل وضمان على الخدمة"` }
]

function Rating() {
    return (
        <>
            {RatingData.map((items) => (
                <div key={items.id} className='shadow-sm rounded-xl p-4 flex items-center'>
                    <div>
                        <img className='size-[70%]' src={items.img} alt='ratingavatar' />
                    </div>
                    <div>
                        <span className='text-yellow-400 block text-xl flex'>
                            {[...Array(items.rate)].map((_, index) => (
                                <FaStar key={index} />
                            ))}</span>
                        <span className='font-bold text-sm'>{items.description}</span>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Rating
