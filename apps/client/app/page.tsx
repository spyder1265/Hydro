'use client'
import { LampDemo } from '../components/Animations/ui/lamp'
import { ContainerScroll } from '../components/Animations/ui/ContainerAnimation'
import { StickyScrollRevealDemo } from '../components/Sections/ScrollSection'
import { SparklesPreview } from '../components/Sections/SpaceSection'
import { Separator } from '@/components/Separator'
import Navbar from '@/components/Navbar/Navbar'
import { useLayoutEffect, useState } from 'react'
import { users } from '@/data'

export default function Landing() {
  const [hasMounted, setHasMounted] = useState(false)

  useLayoutEffect(() => {
    setHasMounted(true)
  }, [])

  if (hasMounted)
    return (
      <main className='flex min-h-screen w-full flex-col items-center'>
        <Navbar />
        <div className='flex min-h-full w-full flex-col items-center justify-between'>
          <section className='relative flex h-screen w-full flex-col items-center dark:bg-slate-950'>
            <LampDemo />
            <Separator className='my-4' />
          </section>
          <section className='flex h-full w-full flex-col items-center overflow-hidden dark:bg-slate-950'>
            <ContainerScroll
              users={users}
              titleComponent={
                <div className='py-3'>
                  <h1 className='text-4xl font-semibold text-black dark:text-white'>
                    Unleash the power of <br />
                    <span className='mt-1 text-3xl font-bold leading-none md:text-[6rem]'>
                      Content Management
                    </span>
                  </h1>
                </div>
              }
            />
            <Separator className='my-4' />
          </section>
          <section className='flex h-screen w-full flex-col items-center dark:bg-slate-950'>
            <StickyScrollRevealDemo />
            <Separator className='my-4' />
          </section>
          <section className='flex h-screen w-full flex-col items-center dark:bg-slate-950'>
            <SparklesPreview />
          </section>
        </div>
      </main>
    )
}
