'use client';

import CreatePost from "@/components/CreatePost";
import Recorder from "@/components/Recorder";
import Theatre from "@/components/theatre";
import EchoChamber from "@/components/EchoChamber";
import { Inter, Livvic } from "next/font/google";
import { useState } from "react";

const livvic = Livvic({ subsets: ["latin"], weight:['100', '200', '300', '400', '500', '600', '700', '900'] });

export default function Home() {
  const [nav, setNav] = useState(0)

  const changeNav = (num) =>{
    setNav(num)
  }

  return (
  <>
    <button onClick={e=>setNav(1)}>1</button>
    {nav == 0 && <EchoChamber />}
    {nav == 1 && <CreatePost />}
    {nav == 2 && <Theatre />}
    {nav == 3 && <Theatre />}
    {nav == 4 && <Theatre />}
    {nav == 5 && <Recorder />}

  </>
  );
}

