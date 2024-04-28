'use client';

import CreatePost from "@/components/CreatePost";
import Theatre from "@/components/theatre";
import EchoChamber from "@/components/EchoChamber"; 
import { Livvic } from "next/font/google";
import { useEffect, useState } from "react";

const livvic = Livvic({ subsets: ["latin"], weight:['100', '200', '300', '400', '500', '600', '700', '900'] });

export default function Home() {
  const [nav, setNav] = useState(0)
  const [createPost,setCreatePost] = useState(false)

  const changeNav = (num) =>{
    setNav(num)
  }

  const changeCreatePost = (bool) =>{
    setCreatePost(bool)
  }

  useEffect(()=>{ 
    console.log("CREA", createPost)

  },[createPost])

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=>{
      const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})

      const socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', process.env.NEXT_PUBLIC_DEEPGRAM_KEY])

      socket.onopen = () =>{
        mediaRecorder.addEventListener('dataavailable', event=>{
          socket.send(event.data)
        })
        mediaRecorder.start(250)
      }


      socket.onmessage = (message) =>{
        const recieved = JSON.parse(message.data)
        // console.log(recieved)
        const transcript = recieved.channel.alternatives[0].transcript
        if(transcript && recieved.speech_final){
          console.log(transcript)
        }
      }
    })
  },[])

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <nav className="flex justify-center space-x-4 bg-black-800 p-4 text-white">
        <button
          className={`p-2 ${nav === 0 ? 'border-b-2 border-black-500' : ''}`}
          onClick={() => setNav(0)}
        >
          Theatre
        </button>
        <button
          className={`p-2 ${nav === 1 ? 'border-b-2 border-black-500' : ''}`}
          onClick={() => setNav(1)}
        >
          Echo Chamber
        </button>
        <button onClick={() => setCreatePost(true)}> 1
        </button>
      </nav>
      {nav == 0 && !createPost && <Theatre />}
      {nav == 1 && !createPost && <EchoChamber/>}
      {createPost && <CreatePost setCreatePost={setCreatePost} />}

    </div>
  );
}

