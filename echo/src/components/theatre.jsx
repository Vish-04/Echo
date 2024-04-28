import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchFromDynamoDB } from '@/utils/FetchPosts';

function Theatre() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
  const headerAudioRef = useRef(null);
  const bodyAudioRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const items = await fetchFromDynamoDB("post");
      // Assuming you're fetching usernames linked to each post
      setPosts(items.map(item => ({ ...item, username: 'Username fetched based on item.userId' })));
    }

    loadData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
          event.preventDefault();
          setCurrentIndex(prevIndex => (prevIndex - 1 + posts.length) % posts.length);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
          break;
        case 'Space':
          event.preventDefault();
          toggleAudioPlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, posts.length]);

  function toggleAudioPlay() {
    if (bodyAudioRef.current) {
      if (isPlaying) {
        bodyAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        bodyAudioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error('Error playing body audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="w-1/4 h-1/4 relative animate-fade-in-out">
        <Image
          src="/imgs/LOGO - Text.png"
          alt="Echo Logo"
          layout='responsive'
          objectFit='contain'
          width={200}
          height={200}
        />
      </div>

      {posts.length > 0 && (
        <div className={`relative w-3/4 max-w-lg p-4 bg-white text-black rounded-lg shadow-md ${isPlaying ? 'animate-bounce' : ''}`}>
          <h1 className="text-xl font-bold">{posts[currentIndex].username || "Unknown User"}</h1>
          <p className="text-lg">{posts[currentIndex].body}</p>
          {showHeart && <Image src="/imgs/heart-icon.png" alt="Heart" width={30} height={30} className="absolute right-5 top-5" />}
          <audio ref={bodyAudioRef} src={posts[currentIndex].body} hidden />
        </div>
      )}
    </div>
  );
}

export default Theatre;
