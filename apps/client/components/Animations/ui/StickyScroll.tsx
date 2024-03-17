'use client'
import React, { useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export const StickyScroll = ({
  content,
  contentClassName
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ['start start', 'end start']
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint)
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index
        }
        return acc
      },
      0
    )
    setActiveCard(closestBreakpointIndex)
  })

  const backgroundColors = [
    'var(--slate-900)',
    'var(--black)',
    'var(--neutral-900)'
  ]
  const linearGradients = [
    'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
    'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
    'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))'
  ]
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length]
      }}
      className='no-scrollbar relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-xl p-10'
      ref={ref}
    >
      <div className='div relative flex items-start rounded-lg px-4'>
        <div className='max-w-2xl'>
          {content.map((item, index) => (
            <div key={item.title + index} className='my-20 rounded-lg'>
              <motion.h2
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3
                }}
                className='text-2xl font-bold text-slate-100'
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3
                }}
                className='text-kg mt-10 max-w-sm text-slate-300'
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className='h-40' />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length]
        }}
        className={cn(
          'sticky top-10 hidden h-60 w-80 overflow-hidden rounded-lg bg-white lg:block',
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  )
}
