'use client';

import CreatePost from "@/components/CreatePost";
import Theatre from "@/components/theatre";
import { Livvic } from "next/font/google";
import { useState } from "react";

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

  return (
    <>
      <button onClick={e=>setCreatePost(!createPost)}>1</button>
      {nav == 0 && <Theatre />}
      {nav == 1 && <Theatre />}
      {nav == 2 && <Theatre />}
      {nav == 3 && <Theatre />}
      {nav == 4 && <Theatre />}
      {createPost && <CreatePost />}

    </>
  );
}


