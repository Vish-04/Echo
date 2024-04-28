import React, { useEffect, useState } from 'react'
import { uploadToS3 } from '@/utils/UploadAudio'
import { v4 as uuidv4 } from 'uuid';
import { uploadPost } from '@/utils/UploadPost';


const CreatePost = () => {
    const [canRecord, setCanRecord] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [src, setSrc] = useState("")
    const [recorder, setRecorder] = useState(null)

    const srcs = []

    useEffect(()=>{
        const audio = new Audio('/audio/headline.mp3');
        audio.play();
    }, [])

    const handleSrc = (src) =>{
        console.log("SRC",src)
        console.log("HEADLINE", srcs[0])
        console.log("BODY", srcs[1])
        if (!srcs[0]){
            srcs.push(src)
            initBody();
        } else if (!srcs[1]){
            srcs.push(src)
            createPost()
            // TODO, close the create post.jsx
        }
    }

    const initBody = () =>{
        const audio = new Audio('/audio/body.mp3');
        audio.play();
    }

    const createPost = () =>{
        const uuid = uuidv4();
        const userId = "6562f5bf-8f92-4a7b-8371-3012ca104df7"
        const headlineUrl = uploadToS3(srcs[0], `headline_${uuid}`)
        const bodyUrl = uploadToS3(srcs[1], `body_${uuid}`)

        uploadPost(uuid, userId, headlineUrl, bodyUrl)
        const audio = new Audio('/audio/created.mp3');
        audio.play();
        // TODO upload DynamoDB
    }

    let chunks = []
    let a = []

    const setupStream = (stream) => {
        console.log("SETUP STREAM")
        setRecorder(new MediaRecorder(stream))
        setCanRecord(true)
    }

    const setupAudio = () => {
        console.log("setup AUDIO")
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(setupStream)
            .catch(err =>{console.log(err)})
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);
        return () => {
          document.removeEventListener("keydown", keyDown);
          document.removeEventListener("keyup", keyUp );
        };
      }, []);

      const keyDown = (event) => {
          if (event.code === "Space" && (a.length % 2 === 0 )) {
            document.getElementById('recordButton').click()
            // toggleMic();
            a.push(0)
           
        }
      };

      const keyUp = (event) => {
          if (event.code === "Space" && (a.length % 1 === 0 )) {
            document.getElementById('recordButton').click()
            // toggleMic();
            a.push(1)
        }
      };

    useEffect(() => {
        if (recorder) {
            recorder.ondataavailable = e => {
                chunks.push(e.data)
            }
            recorder.onstop = e => {
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus"});
                chunks = []
                const audioURL = window.URL.createObjectURL(blob)
                console.log("IN")
                setSrc(audioURL);
                handleSrc(audioURL)
            }
        }
    }, [recorder])

    const toggleMic = () => {
        console.log("toggleMic")
        setIsRecording(!isRecording)

        if(isRecording){
            recorder.start();
        } else{
            try {
                recorder.stop() 
            } catch (error) {
                
            }
        }
    }

    useEffect(()=>{
        setupAudio();
        try {
            setTimeout(()=>{
                toggleMic();
            }, 200)
            
        } catch (error) {
            
        }
        try {
            setTimeout(()=>{
                toggleMic();
            }, 200)
            
        } catch (error) {
            
        }
    },[])


    return (
        <div
            className='w-[100vw] h-[100vh] bg-gray-300'
        >
            <button className=' hidden' id='recordButton' onClick={toggleMic} disabled={!canRecord}>
                {isRecording ? "Recording..." : "Click to Record"}
            </button>
            {/* <audio controls={true} src={src} /> */}
        </div>
    )
}

export default CreatePost