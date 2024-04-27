import React, { useEffect, useState } from 'react'
import Recorder from './Recorder'
import { uploadToS3 } from '@/utils/UploadAudio'

const CreatePost = () => {
    const [headlineSrc, setHeadlineSrc] = useState("")
    const [bodySrc, setBodySrc] = useState("")
    const [currRec, setCurrRec] = useState(0)

    const initHeadline = () =>{
        // TODO PLAY Audio Clip, what is post header
    }

    useEffect(()=>{
        initHeadline
    }, [])

    const handleSrc = (src) =>{
        if (currRec == 0){
            setHeadlineSrc(src)
            setCurrRec(1)
            initBody();
        } else{
            setBodySrc(src)
            setCurrRec(2)
            createPost()
            // TODO, close the create post.jsx
        }
    }

    const initBody = () =>{
        // TODO PLAY Audio Clip, what is post body
    }


    const createPost = () =>{
        const headlineUrl = uploadToS3(headlineSrc)
        const bodyUrl = uploadToS3(bodySrc)

        // TODO upload DynamoDB
    }


    return (
        <>
            <Recorder handleSrc={handleSrc} />
        </>
    )
}

export default CreatePost