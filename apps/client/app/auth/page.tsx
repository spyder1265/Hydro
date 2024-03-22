'use client'
import Image from 'next/image'
import { Suspense, useLayoutEffect, useState } from 'react'
import Login from '../../components/Form/Login'
import { useRouter, useSearchParams } from 'next/navigation'
import { User } from '@prisma/client'
import getCurrentUser from '../actions/GetCurrentUser'
import Button from '../../components/Button'
import { FaArrowRightToBracket, FaHouseLock } from 'react-icons/fa6'
import AuthUserByJWT from '../actions/AuthUser'
import HasAuth from '@/components/Form/HasAuth'
import { useTheme } from '../../contexts/ThemeContext'
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline'
import ThemeSelector from '@/components/Navbar/ThemeSelector'
import { FormNav } from '@/components/Navbar/Navbar'
import Signup from '@/components/Form/Signup'
import { FormProvider, useForm } from 'react-hook-form'

type formType = 'Login' | 'Signup' | 'Otp' | 'forgotPassword' | 'authenticated'

function Auth() {
  const { theme } = useTheme()
  const [form, setForm] = useState<formType>('Login')
  const [isloading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const formTpye = async (param: string) => {
    switch (param) {
      case 'Login' || '':
        return 'Login'
      case 'Signup':
        return 'Signup'
      case 'Otp':
        return 'Otp'
      case 'forgotPassword':
        return 'forgotPassword'
    }
  }

  useLayoutEffect(() => {
    setIsLoading(true)
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
              setForm('authenticated')
              setUser([user!])
            } else {
            }
            setIsLoading(false)
          })
        }
      })
    } else {
      if (searchParams.get('form')) {
        formTpye(searchParams.get('form') ?? '').then(res => setForm(res!))
      }
      setForm('Login')
      if (theme) {
        setIsLoading(false)
      }
    }
  }, [])

  const goBack = () => {
    router.back()
  }

  const methods = useForm()

  if (!isloading)
    return (
      <main className='gradient-bg flex h-screen w-full flex-col items-center text-neutral-900 dark:text-neutral-100'>
        <div className='flex w-full py-8 md:hidden'>
          <FormNav />
        </div>
        <div className='flex h-full w-full flex-col items-center justify-center md:flex-row'>
          <div className='glass flex h-auto w-4/5 flex-col items-center justify-around md:flex md:h-full md:basis-1/3 md:shadow-none dark:bg-neutral-900 '>
            <div className='hidden w-full md:flex'>
              <FormNav />
            </div>
            {form === 'Login' && !isloading ? (
              <Login />
            ) : form === 'authenticated' && !isloading ? (
              <HasAuth user={user[0]} />
            ) : (
              // <FormProvider {...methods}>
              <Signup />
              // </FormProvider>
            )}
          </div>
          <div className='relative z-20 hidden h-full basis-2/3 md:flex'>
            <Image
              src='/bg.jpeg'
              alt='hero'
              width={500}
              height={500}
              className='h-full w-full object-cover'
              priority
            />
          </div>
        </div>
      </main>
    )
}

export default function Page() {
  return (
    <Suspense>
      <Auth />
    </Suspense>
  )
}
