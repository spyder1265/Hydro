'use client'

import { useLayoutEffect, useState } from 'react'
import getCurrentUser from '../actions/GetCurrentUser'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import AuthUserByJWT from '../actions/AuthUser'
import Image from 'next/image'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { twMerge } from 'tailwind-merge'

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

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (
      token &&
      token !== 'undefined' &&
      token !== 'null' &&
      token !== undefined
    ) {
      AuthUserByJWT(token).then(user => {
        if (user && user.id.length > 0) {
          getCurrentUser().then(user => {
            if (user && user?.id?.length > 0) {
              setUser([user!])
              setIsLoading(false)
            } else {
              router.push('/auth')
            }
          })
        }
      })
    } else {
      router.push('/auth')
    }
  })

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
        <div className='flex h-full w-full flex-col items-center p-24  dark:text-neutral-300'>
          {/* <h1 className='text-2xl font-bold capitalize'>home</h1> */}
          <div className='flex flex-col items-center'>
            <Image
              src={'/placeholder.jpg'}
              width={100}
              height={100}
              alt={'profile'}
              className='rounded-full'
            />
            <h1 className='text-2xl font-bold capitalize'>
              Welcome {user.at(0)?.name}
            </h1>
            <h1 className='text-2xl font-bold capitalize'>
              Your email is {user.at(0)?.email}
            </h1>
          </div>
        </div>
      </div>
    )
}
export default page
