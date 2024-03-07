"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { TypewriterEffect } from "./typewriter-effect";
import { useTheme } from "@/app/contexts/ThemeContext";

export function LampDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Hydro.",
      className: "text-neutral-900 dark:text-blue-500",
    },
  ];

  return (
    <LampContainer>
      <div className='flex h-full pt-24 flex-col justify-between'>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className='mt-8 bg-gradient-to-br from-neutral-600 to-slate-500 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'
        >
          Hydro
        </motion.h1>
        <div className='flex flex-col items-center justify-center h-full '>
          <p className='bg-gradient-to-br from-neutral-600 to-slate-500 dark:from-slate-300 dark:to-slate-500 pt-6 bg-clip-text text-transparent dark:text-neutral-200 text-xl '>
            Great People
          </p>
          <TypewriterEffect words={words} />
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10'>
            <a
              href='/auth'
              className='flex items-center justify-center w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm'
            >
              Join now
            </a>
            <a
              href='/auth'
              className='flex items-center justify-center w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm'
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 w-full",
        className
      )}
    >
      <div className='relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 '>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic 
          ${
            theme === "dark"
              ? "from-cyan-500"
              : theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "from-cyan-500"
              : "from-neutral-500"
          } 
          from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]`}
        >
          <div className='absolute  w-[100%] left-0 bg-white dark:bg-slate-950 h-40 bottom-0 z-10 [mask-image:linear-gradient(to_top,white,transparent)]' />
          <div className='absolute  w-40 h-[100%] left-0 bg-white dark:bg-slate-950  bottom-0 z-10 [mask-image:linear-gradient(to_right,white,transparent)]' />
        </motion.div>

        {/* bg-white dark:bg-slate-950 */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className='absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-neutral-500 dark:to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]'
        >
          <div className='absolute  w-40 h-[100%] right-0 bg-white dark:bg-slate-950  bottom-0 z-10 [mask-image:linear-gradient(to_left,white,transparent)]' />
          <div className='absolute  w-[100%] right-0 bg-white dark:bg-slate-950 h-40 bottom-0 z-10 [mask-image:linear-gradient(to_top,white,transparent)]' />
        </motion.div>
        <div className='absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white dark:bg-slate-950 blur-2xl'></div>
        <div className='absolute top-1/2 z-40 h-48 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
        <div className='absolute inset-auto z-40 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-neutral-500 dark:bg-cyan-500 opacity-50 blur-3xl'></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className='absolute inset-auto z-20 h-36 w-64 -translate-y-[6rem] rounded-full bg-neutral-800 dark:bg-cyan-400 blur-2xl'
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className='absolute inset-auto z-40 h-0.5 w-[30rem] -translate-y-[7rem] bg-neutral-800 dark:bg-cyan-400 '
        ></motion.div>

        <div className='absolute inset-auto z-30 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-slate-950 '></div>
      </div>

      <div className='relative z-40 flex -translate-y-80 flex-col items-center px-5'>
        {children}
      </div>
    </div>
  );
};
