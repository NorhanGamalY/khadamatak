import React, { useState, useEffect } from 'react';

function Ourservices({ services }) {
  if (!services || services.length === 0) {
    return <p>لا توجد خدمات متاحة</p>;
  }
      return (
        <>
            <h2 className="text-lg font-bold mb-3">الخدمات المقدمة</h2>
            <ul className="space-y-2">
                {services.map((service, x) => (
                    <li key={x} className="flex items-center gap-2">
                        <span className="font-bold">✓</span> {service.name}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Ourservices
