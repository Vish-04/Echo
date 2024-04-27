import { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk';

const Recorder = ({handleSrc}) => {
    const [canRecord, setCanRecord] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [src, setSrc] = useState("")
    const [recorder, setRecorder] = useState(null)

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

    useEffect(()=>{
        setupAudio();
    },[])

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
            recorder.stop()
        }
    }

    return (
        <div
            className='w-[100vw] h-[100vh] bg-gray-300'
        >
            <button id='recordButton' onClick={toggleMic} disabled={!canRecord}>
                {isRecording ? "Recording..." : "Click to Record"}
            </button>
            <audio controls={true} src={src} />
        </div>
    );
};

export default Recorder;