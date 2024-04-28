import React from 'react';
import Image from 'next/image';
import { Inter, Livvic } from "next/font/google";

function Theatre() {
  return (
    <div className="h-[100vh] w-[100vw] relative bg-black">
    <div className="absolute inset-0 flex justify-center items-center">
      {/* Adjust w- and h- classes to control the size of the image */}
      <div className="w-1/3 h-1/3 animate-pulse-expand-outwards">
        <Image
          src="/imgs/LOGO - Text.png" // Correct your path if necessary
          alt="Echo Logo"
          layout="responsive" // Changed to 'responsive' to respect the size of the parent
          objectFit="contain"
          width={100} // Dummy value to satisfy next/image, actual size is controlled by parent div
          height={100} // Dummy value to satisfy next/image, actual size is controlled by parent div
        />
      </div>
    </div>
  </div>
  );
}

export default Theatre;
