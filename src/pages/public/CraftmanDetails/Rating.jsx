import React from 'react'
import rating1 from '../../../assets/craftman-details/rating1.png';
import rating2 from '../../../assets/craftman-details/rating2.png';
import { FaStar } from "react-icons/fa";


const RatingIMG = [
    { id: 2, img: rating1 },
    { id: 1, img: rating2 }
]

function Rating({ reviews }) {
     if (!reviews || reviews.length === 0) return <p className='text-sm text-red-600'>لا توجد تقييمات </p>;

    return (
        <>
            {reviews.map((Rating ) => (
                <div key={Rating.id} className='shadow-sm rounded-xl p-4 flex items-center'>
                    <div>
                        <img className='size-[70%]' src={RatingIMG.find(r => r.id === Rating.id)?.img ||rating2 } alt='ratingavatar' />
                    </div>
                    <div>
                        <span className='text-yellow-400 block text-xl flex gap-1 my-1'>
                            {[...Array(Rating.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}</span>
                        <span className='font-bold text-sm block '>{Rating.comment}</span>
                        <span className='text-xs text-gray-400'>{Rating.createdAt}</span>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Rating
