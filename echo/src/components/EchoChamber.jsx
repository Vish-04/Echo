import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchFromDynamoDB } from '@/utils/FetchPosts'; // Adjust the import path as necessary

function EchoChamber() {
    const [users, setUsers] = useState([]); // State to store users from DynamoDB
    const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current user index
  
    useEffect(() => {
      const loadUsers = async () => {
        const userData = await fetchFromDynamoDB("user"); // Use the actual DynamoDB table name
        if (userData) {
          setUsers(userData); // Store the fetched data in state
        }
      };
  
      loadUsers();
    }, []);

    function playBio(){
        let audio = document.getElementById("bio");
        if (audio) {
            audio.play().catch(e => console.error("Error playing the name audio: ", e));
        }
    }


    function playName(){
        let audio = document.getElementById("name");
        if (audio) {
            audio.play().catch(e => console.error("Error playing the name audio: ", e));
        }
    }

    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
          <div className="w-1/4 h-1/4 flex items-center justify-center relative">
            <Image
              className='animate-fade-in-out'
              src="/imgs/LOGO - Text.png"
              alt="Echo Logo"
              layout="responsive"
              objectFit="contain"
              width={20}
              height={20}
            />
          </div>

          {/* User Information Display */}
          {users.length > 0 && (
            <div className="relative max-w-lg p-4 flex flex-col items-center bg-white text-black rounded-lg shadow-md ">
              <h1 className="text-xl font-semibold">NAME: {users[currentIndex].name}</h1>
              <p className="text-md">BIO: {"https://echo-hd-audio.s3.amazonaws.com/body_cbeb0a5b-6fad-473c-b12e-a6f5887fb972.mp3"}</p>
              <audio id = 'bio' src = {"https://echo-hd-audio.s3.amazonaws.com/body_cbeb0a5b-6fad-473c-b12e-a6f5887fb972.mp3"}></audio>
              <button onClick={playBio} className="hidden">4</button>
              <audio id = 'name' src = {"https://echo-hd-audio.s3.amazonaws.com/headline_cbeb0a5b-6fad-473c-b12e-a6f5887fb972.mp3"}></audio>
              <button onClick={playName} className="hidden"></button>
              <audio src = {users[currentIndex].followers ? users[currentIndex].followers.length : 0}></audio>
              <p className="text-md">Followers: {users[currentIndex].followers ? users[currentIndex].followers.length : 0}</p>
             
              {/* Display the number of followers */}
              
            </div>
          )}
      </div>
    );
}

export default EchoChamber;
