"use client";
import Image from "next/image";
import React from "react";

function Slider() {
  return (
    <div className="relative w-8/12 !rounded-xl overflow-hidden flex justify-center">
      <Image
        alt="slide"
        src="/image/Install.jpg"
        width={1200} // عدد دلخواه، فقط باید مقدار بدی
        height={600}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}

export default Slider;
