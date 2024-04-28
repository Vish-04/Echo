import React, { useState } from 'react';
import Image from 'next/image';

function EchoChamber() {
  const users = [
    { name: 'Alex Smith', bio: 'Developer and music enthusiast.', pronouns: 'they/them' },
    { name: 'Jamie Doe', bio: 'Designer who loves to sketch and paint.', pronouns: 'he/him' },
    { name: 'Taylor Johnson', bio: 'Writer and amateur photographer.', pronouns: 'she/her' },
    // ...more users
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Still keeping this if you need to change the index by other means

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-black">
      <div className="space-y-8">
        {/* Image Container */}
        <div className=" relative w-100 h-100 animate-pulse-expand-outwards">
          <Image
            src="/imgs/LOGO - Text.png" // Ensure this path is correct
            alt="Echo Logo"
            layout="responsive"
            objectFit="contain"
            width={100}
            height={100}
          />
        </div>

        {/* User Information Display */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h1 className="text-xl font-semibold">{users[currentIndex].name}</h1>
          <p className="text-md">{users[currentIndex].bio}</p>
          <p className="text-sm text-gray-600">{users[currentIndex].pronouns}</p>
        </div>
      </div>
    </div>
  );
}

export default EchoChamber;

