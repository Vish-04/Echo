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
  
    return (
      <div className="h-full w-screen bg-black flex flex-col items-center justify-center gap-10">
          <div className="w-1/4 h-1/4 flex items-center justify-center relative mb-5">
            <Image
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
            <div className="bg-white p-6 rounded-lg shadow-md text-black">
              <h1 className="text-xl font-semibold">{users[currentIndex].name}</h1>
              <p className="text-md">{users[currentIndex].bio}</p>
              {/* Display the number of followers */}
              <p className="text-md">Followers: {users[currentIndex].followers ? users[currentIndex].followers.length : 0}</p>
            </div>
          )}
      </div>
    );
}

export default EchoChamber;
