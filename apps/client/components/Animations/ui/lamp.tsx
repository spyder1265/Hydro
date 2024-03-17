'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { TypewriterEffect } from './typewriter-effect'
import { useTheme } from '@/app/contexts/ThemeContext'

export function LampDemo() {
  const words = [
    {
      text: 'Build'
    },
    {
      text: 'awesome'
    },
    {
      text: 'apps'
    },
    {
      text: 'with'
    },
    {
      text: 'Hydro.',
      className: 'text-neutral-900 dark:text-blue-500'
    }
  ]

  return (
    <LampContainer>
      <div className='flex h-full flex-col justify-between pt-24'>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className='mt-8 bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl dark:from-slate-300 dark:to-slate-500'
        >
          Hydro
        </motion.h1>
        <div className='flex h-full flex-col items-center justify-center '>
          <p className='bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text pt-6 text-xl text-transparent dark:from-slate-300 dark:to-slate-500 dark:text-neutral-200 '>
            Great People
          </p>
          <TypewriterEffect words={words} />
          <div className='mt-10 flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            <a
              href='/auth'
              className='flex h-10 w-40 items-center justify-center rounded-xl border border-transparent bg-black text-sm text-white dark:border-white'
            >
              Join now
            </a>
            <a
              href='/auth'
              className='flex h-10 w-40 items-center justify-center rounded-xl border border-black bg-white text-sm  text-black'
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </LampContainer>
  )
}

export const LampContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { theme } = useTheme()
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950',
        className
      )}
    >
      <div className='relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center '>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          className={`bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible 
          ${
            theme === 'dark'
              ? 'from-cyan-500'
              : theme === 'system' &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'from-cyan-500'
                : 'from-neutral-500'
          } 
          from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]`}
        >
          <div className='absolute  bottom-0 left-0 z-10 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-slate-950' />
          <div className='absolute  bottom-0 left-0 z-10 h-[100%] w-40  bg-white [mask-image:linear-gradient(to_right,white,transparent)] dark:bg-slate-950' />
        </motion.div>

        {/* bg-white dark:bg-slate-950 */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          className='bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-neutral-500 text-white [--conic-position:from_290deg_at_center_top] dark:to-cyan-500'
        >
          <div className='absolute  bottom-0 right-0 z-10 h-[100%] w-40  bg-white [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-slate-950' />
          <div className='absolute  bottom-0 right-0 z-10 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-slate-950' />
        </motion.div>
        <div className='absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white blur-2xl dark:bg-slate-950'></div>
        <div className='absolute top-1/2 z-40 h-48 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
        <div className='absolute inset-auto z-40 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-neutral-500 opacity-50 blur-3xl dark:bg-cyan-500'></div>
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className='absolute inset-auto z-20 h-36 w-64 -translate-y-[6rem] rounded-full bg-neutral-800 blur-2xl dark:bg-cyan-400'
        ></motion.div>
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className='absolute inset-auto z-40 h-0.5 w-[30rem] -translate-y-[7rem] bg-neutral-800 dark:bg-cyan-400 '
        ></motion.div>

        <div className='absolute inset-auto z-30 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-slate-950 '></div>
      </div>

      <div className='relative z-40 flex -translate-y-80 flex-col items-center px-5'>
        {children}
      </div>
    </div>
  )
}
