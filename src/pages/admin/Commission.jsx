import React from 'react'

const inpuData = [
    { id: 1, tittle: "نسبة عمولة المنصة(%)", inpuNum: 20, icon: "%" },
    { id: 2, tittle: "ضريبة القيمة المضافة", inpuNum: 15, icon: "%" },
    { id: 3, tittle: "رسوم الخدمة الثابتة(ج.م)", inpuNum: 0 }

]

function Commission() {
    return (
        <>
            <section className='bg-white rounded-lg p-8' >
                <div dir='rtl'>
                    <h2 className='font-bold text-xl'>إعدادات العمولة والرسوم</h2>
                    {inpuData.map((items) => (
                        <div className='mt-10'>
                            <label className='pb-1' htmlFor="">{items.tittle}</label>
                            <div className='my-2'>
                                <input
                                    className='relative w-full relata bg-[#ECECF2] h-12 px-4 rounded-lg border-none outline-none text-right font-semibold text-gray-800'
                                    type="number" placeholder={items.inpuNum} />
                                {items.icon && (
                                    <span className='absolute left-15 text-gray-400 font-bold'>
                                        {items.icon}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className='bg-secondary text-white px-8 py-2 mt-3 rounded-lg'>
                    حفظ التغيرات
                </button>
            </section>
        </>
    )
}

export default Commission
