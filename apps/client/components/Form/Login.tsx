import { useRouter } from 'next/navigation'
import Input from './Input'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaApple } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'

interface ILogin {}

const Login: React.FC<ILogin> = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)
    if (!errors.email && !errors.password) {
      const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3001/auth/login', {
              ...data
            })
            .then(callback => {
              if (callback.status === 200) {
                localStorage.setItem('token', callback.data.access_token)
                resolve('Login successful!')
                setTimeout(() => {
                  router.push('/home')
                }, 1000)
              }
              reject(new Error('Invalid credentials'))
            })
            .catch(reject)
        }, 2000)
      })

      toast
        .promise(promise, {
          loading: 'Logging in...',
          success: message => message,
          error: error => error.response.data.message
        })
        .catch(error => {
          setIsLoading(false)
        })
    }
    setIsLoading(false)
  }

  return (
    <div className='flex h-auto w-full flex-col md:p-4 dark:text-neutral-200'>
      <div className='text-center text-3xl font-bold'>Welcome Back</div>
      <div className='text-center'>Sign in to your account</div>
      <form className='w-full p-4' onSubmit={handleSubmit(submit)}>
        <div className='mb-4'>
          <Input
            id='email'
            register={register}
            errors={errors}
            label='Email'
            type='email'
            primativeProps={{
              placeholder: 'user@example.com',
              autoComplete: 'email'
            }}
          />
        </div>
        <div className=''>
          <Input
            id='password'
            register={register}
            errors={errors}
            label='Password'
            type='password'
            primativeProps={{
              placeholder: '*********',
              autoComplete: 'current-password'
            }}
          />
        </div>

        {/* Forgot password */}
        <div className='mb-6 mt-3 flex w-full flex-col gap-4 '>
          <div className='flex w-full items-center justify-end'>
            <span className='text-sm text-gray-500'>
              Forgot password?{' '}
              <a
                href='auth?forgot-password'
                className='text-blue-600 hover:underline dark:text-blue-500'
              >
                Reset
              </a>
            </span>
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className='focus:ring-primary-300 disabled:bg-primary-700 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-700 focus:ring-4 disabled:opacity-60 '
          >
            Login
          </button>
        </div>

        {/* divider  */}
        <div className='my-4 flex items-center justify-center'>
          <div className='h-px w-full bg-gray-300 dark:bg-gray-500'></div>
          <div className='mx-2 text-sm text-gray-400 dark:text-gray-500'>
            Or
          </div>
          <div className='h-px w-full bg-gray-300 dark:bg-gray-500'></div>
        </div>

        {/* Oauth buttons */}
        <div className='mt-2 flex w-full flex-col  gap-4'>
          <Button disabled={isLoading} border='border' type={'button'}>
            <FaApple className='h-5 w-5' />
            <span className=' ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-400'>
              Apple
            </span>
          </Button>
          <Button disabled={isLoading} type='button' border='border'>
            <FcGoogle className='h-5 w-5' />
            <span className=' ml-2 text-sm font-medium text-neutral-900 dark:text-neutral-400'>
              Google
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Login
