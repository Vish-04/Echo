'use client';

import Recorder from "@/components/Recorder";
import { Inter, Livvic } from "next/font/google";

const livvic = Livvic({ subsets: ["latin"], weight:['100', '200', '300', '400', '500', '600', '700', '900'] });

export default function Home() {
 
  return (
  <>
    <Recorder />
  </>
  );
}
