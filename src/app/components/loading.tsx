"use client"
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../public/assets/json/animation_lmi5ddpg.json";


export default function Loading() {
  return (
    <div className="h-screen absolute top-0 left-0 w-full bg-white flex justify-center items-center">
       <Lottie animationData={groovyWalkAnimation} />
    </div>
  )
}
