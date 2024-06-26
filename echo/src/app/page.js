'use client';

import CreatePost from "@/components/CreatePost";
import Theatre from "@/components/theatre";
import EchoChamber from "@/components/EchoChamber"; 
import { Livvic } from "next/font/google";
import { useEffect, useState } from "react";
import { makeQuery } from "@/utils/QueryLLM";
import CreateReverb from "@/components/CreateComment";

const livvic = Livvic({ subsets: ["latin"], weight:['100', '200', '300', '400', '500', '600', '700', '900'] });

export default function Home() {
  const [nav, setNav] = useState(0)
  const [createPost,setCreatePost] = useState(false)
  const [reverb, setReverb] = useState(false)

  const a = []
  function simulateKeyPress(keyCode) {
    // Create a new keyboard event
    const event = new KeyboardEvent('keydown', {
      keyCode: keyCode,
      bubbles: true,
      cancelable: true,
    });
  
    // Dispatch the event
    document.dispatchEvent(event);
  }

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=>{
      const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})

      const socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', process.env.NEXT_PUBLIC_DEEPGRAM_KEY])

      socket.onopen = () =>{
        mediaRecorder.addEventListener('dataavailable', event=>{
          socket.send(event.data)
        })
        mediaRecorder.start(200)
      }


      socket.onmessage = async (message) =>{
        const recieved = JSON.parse(message.data)
        // console.log(recieved)
        const transcript = recieved.channel.alternatives[0].transcript
        if(transcript && recieved.speech_final){
          console.log(transcript)
          const resp = await makeQuery(transcript)
          console.log(resp)
          const func = resp.split(':')[0]
          // console.log("FUNC", func)
          const param = resp.split(':')[1]
          // console.log("PARAM", param)
          a.push(0)

          if(a.length % 2 == 1){

            switch(func.trim()) {
              case "changeCreatePost":
                  setCreatePost(param.toLowerCase() == "true")
                  break;
              case "changeNav":
                  
                  setNav(parseInt(param))
                  playAudio()
                  break;
              case "reverb":
                  setReverb(param.toLowerCase() == "true")
                  break;
              case "readName":
                
                setNav(1)
                let audioName = document.getElementById("name");
                if (audioName) {
                    audioName.play().catch(e => console.error("Error playing the name audio: ", e));
                }
                break;
              case "readBio":
                setNav(1)
                let audioBio = document.getElementById("bio");
                if (audioBio) {
                    audioBio.play().catch(e => console.error("Error playing the bio audio: ", e));
                }
                break;
              case "echo":
                setNav(0)
                simulateKeyPress(32)
                break;
              default:
                  break;
            }
          }
        }
      }
    })
    function playAudio(){
      let audio = document.getElementById('system');
      if (audio) {
        audio.play().catch(e => console.error("Error playing the name audio: ", e));
      }
    }
  },[])

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <nav className="flex justify-center space-x-4 bg-black p-4 text-white">
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
        <button onClick={() => setCreatePost(true)}>
        </button>
      </nav>
      <audio id='system' src="audio/system.mp3" className="hidden bg-black"></audio>
      <button onClick = 'playAudio' className="hidden bg-black"></button>
      {(nav == 0 && !createPost && !reverb) && <Theatre />}
      {(nav == 1 && !createPost && !reverb) && <EchoChamber/>}

      {createPost && <CreatePost setCreatePost={setCreatePost} />}
      {reverb && <CreateReverb setReverb={setReverb} />}

    </div>
  );
}

