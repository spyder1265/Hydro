'use client'
import { useSidebarContext } from '@/contexts/SidebarContext'
import React from 'react'
import { twMerge } from 'tailwind-merge'

function page() {
  const { isCollapsed } = useSidebarContext()

  return (
    <div
      id='main-content'
      className={twMerge(
        'relative h-screen w-full overflow-hidden bg-gray-50 dark:bg-neutral-900',
        isCollapsed ? 'lg:ml-[4.1rem]' : 'lg:ml-64'
      )}
    >
      <div className='flex h-full w-full flex-col items-center p-24  dark:text-neutral-300'>
        <div className='flex flex-col items-center'>
          {/* content */}
          <div className='flex w-96 flex-col justify-center rounded-lg border border-neutral-400 dark:border-white'>
            <h1>Key</h1>
            <input type='text' className='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
