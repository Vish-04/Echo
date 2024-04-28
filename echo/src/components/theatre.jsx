import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchFromDynamoDB } from '@/utils/FetchPosts';

function Theatre({createPost}) {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [AnimationClass, setAnimationClass] = useState("");
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
    if(!createPost){
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
      <div className="w-1/4 h-1/4 flex items-center justify-center relative">
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
        <div className= {`relative w-3/4 max-w-lg p-4 flex flex-col items-center bg-white text-black rounded-lg shadow-md ${AnimationClass}`}  >
          <h1 className="text-2xl font-bold">POST</h1>
          <PlayCircleIcon />
          <p className="text-sm text-center">{posts[currentIndex].body}</p>
          {showHeart && <Image src="/imgs/heart-icon.png" alt="Heart" width={30} height={30} className="absolute right-5 top-5" />}
          <audio ref={headerAudioRef} hidden />
          <audio ref={bodyAudioRef} hidden />
        </div>
      )}
    </div>
  );
}

function PlayCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="2.5rem"
      height="2.5rem"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

export default Theatre;
