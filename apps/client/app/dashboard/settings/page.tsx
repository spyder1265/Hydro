'use client'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { twMerge } from 'tailwind-merge'

interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
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
          <h1>settings</h1>
        </div>
      </div>
    </div>
  )
}
export default page
