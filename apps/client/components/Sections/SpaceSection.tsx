'use client'
import React, { useEffect, useState } from 'react'
import { SparklesCore } from '../Animations/ui/sparkles'
import { useTheme } from '@/app/contexts/ThemeContext'

export function SparklesPreview() {
  const { theme, toggleTheme } = useTheme()
  const [particleColor, setParticleColor] = useState<string>(
    theme === 'dark'
      ? '#ffffff'
      : theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ? '#ffffff'
        : '#000000'
  )

  useEffect(() => {
    setParticleColor(
      theme === 'dark'
        ? '#ffffff'
        : theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ? '#ffffff'
          : '#000000'
    )
  }, [theme])

  return (
    <div className='relative flex h-full  w-full flex-col items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 h-screen w-full'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='h-full w-full'
          colorIsVar
          particleColor={particleColor}
        />
      </div>
      <h1 className='relative z-20 text-center text-3xl font-bold text-neutral-900 md:text-7xl lg:text-6xl dark:text-white'>
        Build great products
      </h1>
    </div>
  )
}
