"use client";
import Image from "next/image";
import { useState } from "react";
import Login from "../components/Form/Login";

type formType = "Login" | "Signup" | "Otp" | "forgotPassword";

export default function Auth() {
  const [form, setForm] = useState<formType>("Login");

  return (
    <main className='flex h-screen w-full flex-col items-center'>
      <div className='flex h-full w-full flex-col md:flex-row'>
        <div className='h-full flex basis-1/3 glass items-center'>
          {form === "Login" ? <Login /> : <></>}
        </div>
        <div className='h-full relative flex basis-2/3'>
          <Image
            src='/bg.jpeg'
            alt='hero'
            width={500}
            height={500}
            className='object-cover w-full h-full'
            priority
          />
          {/* <div className='h-full w-full bg-[rgba(0,0,0,0.4)] absolute'></div> */}
        </div>
      </div>
    </main>
  );
}
