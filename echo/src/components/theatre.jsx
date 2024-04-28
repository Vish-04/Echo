import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function Theatre() {
  const posts = ["Post 1", "Post 2", "Post 3", "Post 4"]; // Array of posts
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current post index

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Space') {
        // Prevent the default action to stop the page from scrolling
        event.preventDefault();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length); // Cycle through the posts
      }
    }

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [posts.length]); // Depend on posts.length to ensure it updates if the number of posts changes

  return (
    <div className="h-[100vh] w-[100vw] relative bg-black">
      <div className="relative inset-0 flex flex-col justify-center items-center space-y-10">
        {/* Image Container */}
        <div className="w-1/4 h-1/4 animate-pulse-expand-outwards">
          <Image
            src="/imgs/LOGO - Text.png" // Correct your path if necessary
            alt="Echo Logo"
            layout="responsive"
            objectFit="contain"
            width={100} // Dummy value, adjust as needed
            height={100} // Dummy value, adjust as needed
          />
        </div>

        {/* Post Display */}
        <h1 className="text-white text-center font-livvic">{posts[currentIndex]}</h1>
      </div>
    </div>
  );
}

export default Theatre;
