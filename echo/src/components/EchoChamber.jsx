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
      <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-black">
        <div className="space-y-8">
          {/* Image Container */}
          <div className="relative w-100 h-100 animate-pulse-expand-outwards">
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
      </div>
    );
}

export default EchoChamber;