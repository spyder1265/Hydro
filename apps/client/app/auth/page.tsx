'use client'
import Image from 'next/image'
import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import Login from '../../components/Form/Login'
import { useSearchParams } from 'next/navigation'
import { User } from '@prisma/client'
import getCurrentUser from '../actions/GetCurrentUser'
import AuthUserByJWT from '../actions/AuthUser'
import HasAuth from '@/components/Form/HasAuth'
import { useTheme } from '../../contexts/ThemeContext'
import { FormNav } from '@/components/Navbar/Navbar'
import Signup from '@/components/Form/Signup'
import axios from 'axios'

type formType = 'Login' | 'Signup' | 'Otp' | 'forgotPassword' | 'authenticated'

type Quote = {
  _id: string
  tags: string[]
  content: string
  author: string
  authorSlug: string
  dateAdded: string
  dateModified: string
  length: number
}

function Auth() {
  const { theme } = useTheme()
  const [form, setForm] = useState<formType>('Login')
  const [isloading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User[]>([])
  const [quote, setQuote] = useState<Quote[]>([])
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

  const getQuote = async () => {
    const api_quote = axios.get('https://api.quotable.io/random?maxLength=70')
    const quote = await api_quote
    setQuote([quote.data])
  }

  useLayoutEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem('token')

    if (quote.length < 1) getQuote()

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

  return (
    <main className='gradient-bg relativeflex h-screen w-full flex-col items-center text-neutral-900 dark:text-neutral-100'>
      <div className='absolute z-50 flex w-full py-8'>
        <FormNav />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center md:flex-row'>
        <div className='relative z-20 hidden h-full basis-3/5 md:flex'>
          <Image
            src='/bg.jpeg'
            alt='hero'
            width={500}
            height={500}
            className='h-full w-full object-cover'
            priority
          />
          <div className='absolute left-0 right-0 top-0 flex h-full w-full flex-col justify-end bg-black/30 px-9'>
            <div className='flex'>
              <p className='inline-flex items-center gap-2 bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text py-5 pt-6 text-base text-transparent dark:from-slate-300 dark:to-slate-500 dark:text-neutral-200 '>
                <span> {!isloading && quote.at(0)?.content}</span>
                <span>~</span>
                <span> {!isloading && quote.at(0)?.author}</span>
              </p>
            </div>
          </div>
        </div>
        <div className='glass md:shadow-non flex h-auto w-4/5 flex-col items-center justify-around md:flex md:h-full md:basis-2/5 md:px-14'>
          {form === 'Login' && !isloading ? (
            <Login />
          ) : form === 'authenticated' && !isloading ? (
            <HasAuth user={user[0]} />
          ) : (
            <Signup />
          )}
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
