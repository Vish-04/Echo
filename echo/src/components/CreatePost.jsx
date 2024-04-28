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
        if (!srcs[0]){
            srcs.push(src)
            initBody();
        } else if (!srcs[1]){
            srcs.push(src)
            createPost()
        }
    }

    const initBody = () =>{
        const audio = new Audio('/audio/body.mp3');
        audio.play();
    }

    const createPost = async () =>{
        const uuid = uuidv4();
        const userId = "6562f5bf-8f92-4a7b-8371-3012ca104df7"
        const headlineUrl = await uploadToS3(srcs[0], `headline_${uuid}`)
        const bodyUrl = await uploadToS3(srcs[1], `body_${uuid}`)

        try{
            await uploadPost(uuid, userId, headlineUrl, bodyUrl)
        } catch (e){

        }
        const audio = new Audio('/audio/created.mp3');
        audio.play();
    }

    let chunks = []
    let a = []

    const setupStream = (stream) => {
        setRecorder(new MediaRecorder(stream))
        setCanRecord(true)
    }

    const setupAudio = () => {
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
                const blob = new Blob(chunks, { type: "audio/mpeg"});
                chunks = []
                const audioURL = window.URL.createObjectURL(blob)
                console.log("IN")
                setSrc(audioURL);
                handleSrc(audioURL)
            }
        }
    }, [recorder])

    const toggleMic = () => {
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
        <div>
            <button className=' hidden' id='recordButton' onClick={toggleMic} disabled={!canRecord}>
                btn
            </button>
        </div>
    )
}

export default CreatePost