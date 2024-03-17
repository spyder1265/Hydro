'use client'

import { useLayoutEffect, useState } from 'react'
import getCurrentUser from '../actions/GetCurrentUser'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import AuthUserByJWT from '../actions/AuthUser'

interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
  const [user, setUser] = useState<User[]>([])
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter()

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
      <div className='flex min-h-screen w-full flex-col items-center  p-24'>
        <h1 className='text-2xl font-bold capitalize'>home</h1>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold capitalize'>
            Welcome {user[0]?.name}
          </h1>
          <h1 className='text-2xl font-bold capitalize'>
            Your email is {user[0]?.email}
          </h1>
        </div>
      </div>
    )
}
export default page
