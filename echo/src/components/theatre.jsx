import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchFromDynamoDB } from '@/utils/FetchPosts';

function Theatre() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const headerAudioRef = useRef(null);
  const bodyAudioRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const items = await fetchFromDynamoDB("post");
      setPosts(items);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (headerAudioRef.current && posts.length > 0) {
      headerAudioRef.current.src = posts[currentIndex]?.header || '';
      headerAudioRef.current.load();
      playAudio(headerAudioRef.current);
    }
  }, [currentIndex, posts]); // Ensure header plays every time currentIndex or posts update

  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        setCurrentIndex(prevIndex => (prevIndex - 1 + posts.length) % posts.length);
        setAnimationClass('animate-fade-up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
        setAnimationClass('animate-fade-down');
        break;
      case 'Space':
        event.preventDefault();
        toggleAudioPlay();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, posts.length]);

  function playAudio(audioElement) {
    if (audioElement) {
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
        // Handle auto-play policy by catching errors here
      });
    }
  }

  function toggleAudioPlay() {
    if (headerAudioRef.current && !headerAudioRef.current.paused) {
      headerAudioRef.current.pause();
    }
    if (bodyAudioRef.current) {
      bodyAudioRef.current.src = posts[currentIndex]?.body;
      bodyAudioRef.current.load();
      playAudio(bodyAudioRef.current);
    }
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="w-1/4 h-1/4 relative animate-fade-in-out">
        <Image
          src="/imgs/LOGO - Text.png"
          alt="Echo Logo"
          layout = 'reponsive'
          objectFit = 'contain'
          width={200}
          height={200}
        />
      </div>

      {posts.length > 0 && (
        <div className={`relative w-3/4 max-w-lg p-4 bg-white text-black rounded-lg shadow-md ${animationClass}`}>
          <h1 className="text-xl font-bold">{posts[currentIndex].header}</h1>
          <p className="text-lg">{posts[currentIndex].body}</p>
          {showHeart && <Image src="/imgs/heart-icon.png" alt="Heart" width={30} height={30} className="absolute right-5 top-5" />}
          <audio ref={headerAudioRef} hidden />
          <audio ref={bodyAudioRef} hidden />
        </div>
      )}
    </div>
  );
}

export default Theatre;
