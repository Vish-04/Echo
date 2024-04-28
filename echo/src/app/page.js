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
    <>
      <button onClick={e=>setCreatePost(!createPost)}>1</button>
      {nav == 0 && <EchoChamber />}
      {nav == 1 && <Theatre />}
      {nav == 2 && <Theatre />}
      {nav == 3 && <Theatre />}
      {nav == 4 && <Theatre />}
      {createPost && <CreatePost />}

    </>
  );
}

