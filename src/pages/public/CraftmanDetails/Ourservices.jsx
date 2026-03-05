import React, { useState, useEffect } from 'react';
const services = [
    "تصليح تسريب مياه",
    "تركيب خلاطات",
    "صيانة سخانات",
];
function Ourservices() {
    return (
        <>
            <h2 className="text-lg font-bold mb-3">الخدمات المقدمة</h2>
            <ul className="space-y-2">
                {services.map((service, x) => (
                    <li key={x} className="flex items-center gap-2">
                        <span className="font-bold">✓</span> {service}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Ourservices
