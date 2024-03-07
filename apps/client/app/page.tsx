"use client";
import { LampDemo } from "../components/Animations/ui/lamp";
import { ContainerScroll } from "../components/Animations/ui/ContainerAnimation";
import { StickyScrollRevealDemo } from "../components/Sections/ScrollSection";
import { SparklesPreview } from "../components/Sections/SpaceSection";
import { Separator } from "@/components/Separator";
import Navbar from "@/components/Navbar/Navbar";
import { useLayoutEffect, useState } from "react";
import { users } from "@/data";

export default function Landing() {
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted)
    return (
      <main className='flex min-h-screen w-full flex-col items-center'>
        <Navbar />
        <div className='flex min-h-full w-full justify-between flex-col items-center'>
          <section className='flex dark:bg-slate-950 relative h-screen w-full flex-col items-center'>
            <LampDemo />
            <Separator className='my-4' />
          </section>
          <section className='flex dark:bg-slate-950 overflow-hidden h-full w-full flex-col items-center'>
            <ContainerScroll
              users={users}
              titleComponent={
                <div className='py-3'>
                  <h1 className='text-4xl font-semibold text-black dark:text-white'>
                    Unleash the power of <br />
                    <span className='text-3xl md:text-[6rem] font-bold mt-1 leading-none'>
                      Content Management
                    </span>
                  </h1>
                </div>
              }
            />
            <Separator className='my-4' />
          </section>
          <section className='flex dark:bg-slate-950 h-screen w-full flex-col items-center'>
            <StickyScrollRevealDemo />
            <Separator className='my-4' />
          </section>
          <section className='flex dark:bg-slate-950 h-screen w-full flex-col items-center'>
            <SparklesPreview />
          </section>
        </div>
      </main>
    );
}
