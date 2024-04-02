'use client'

import { useLayoutEffect, useState } from 'react'
import getCurrentUser from '../actions/GetCurrentUser'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import AuthUserByJWT from '../actions/AuthUser'
import Image from 'next/image'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { twMerge } from 'tailwind-merge'
import CardGrid from '@/components/Dashboard/CardGrid'
import Dash_Content from '@/components/Dashboard/Dash_Content'

interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
  const [user, setUser] = useState<User[]>([])
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isCollapsed } = useSidebarContext()

  useLayoutEffect(() => {
    setIsLoading(true)
    getCurrentUser().then(user => {
      if (user && user?.id?.length > 0) {
        setUser([user!])
        setIsLoading(false)
      } else {
        router.push('/auth')
      }
    })
  }, [])

  if (isloading) {
    return <div>Loading...</div>
  } else
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
            <Dash_Content />
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
