'use client'
import { ProfileForm } from '@/components/Dashboard/profile-form'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { twMerge } from 'tailwind-merge'

interface Ipage {
  params: { username: string }
}

const page: React.FC<Ipage> = ({ params }) => {
  const { isCollapsed } = useSidebarContext()
  const decoded = decodeURIComponent(params.username.toString())

  return (
    <div
      id='main-content'
      className={twMerge(
        'relative h-screen w-full overflow-hidden bg-gray-50 dark:bg-neutral-900',
        isCollapsed ? 'lg:ml-[4.1rem]' : 'lg:ml-64'
      )}
    >
      <div className='mt-20  flex h-full w-full flex-col items-center px-2 dark:text-neutral-300'>
        <div className=' flex h-full w-full flex-col space-y-4 overflow-y-scroll p-8 pb-20 pt-6'>
          {/* content */}
          <div className='w-full md:w-2/3'>
            <ProfileForm />
          </div>
          <div className='flex h-full w-full items-center justify-center space-x-1 pb-8 font-semibold '>
            {/* copyrights */}
            <span className='text-sm text-neutral-500 dark:text-neutral-400'>
              © 2024
            </span>
            <a
              href='#copy'
              className='text-sm text-neutral-500 dark:text-neutral-400'
            >
              Hydro.inc
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
