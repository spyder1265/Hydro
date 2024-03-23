'use client'
import { useRouter } from 'next/navigation'
import Input from './Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { signUpSchema } from '@/lib/schema'
import { motion } from 'framer-motion'

type Inputs = z.infer<typeof signUpSchema>

interface ISignup {}

const steps = [
  {
    id: 'Step 1',
    name: 'User Information',
    fields: ['fname', 'lname', 'country', 'phone']
  },
  {
    id: 'Step 2',
    name: 'Profile',
    fields: ['username', 'email', 'password']
  }
]

const Signup: React.FC<ISignup> = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    setIsLoading(true)

    if (!errors.root?.message) {
      console.log(data)

      const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3001/auth/signup', {
              ...data
            })
            .then(callback => {
              if (callback.status === 200) {
                localStorage.setItem('token', callback.data.access_token)
                resolve('Signup successful!')
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
          loading: 'Signing up...',
          success: message => message,
          error: error => error.message
        })
        .catch(error => {
          setIsLoading(false)
        })
    }
    setIsLoading(false)
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === 1) {
        console.log('Step ' + currentStep)

        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <div className='flex h-auto w-full flex-col md:px-8 dark:text-neutral-200'>
      <div className='mb-8'>
        <h1 className='text-center text-3xl font-bold md:text-left'>
          Welcome User
        </h1>
        <h6 className='pl-1 text-center md:text-left'>create an account </h6>
      </div>

      <form
        className='w-full disabled:opacity-75 '
        aria-disabled={isLoading}
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-30%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* name pair */}
            <div className='mb-4 inline-flex items-center gap-4'>
              <div>
                <Input
                  id='fname'
                  register={register}
                  errors={errors}
                  label='First Name'
                  type='text'
                  disabled={isLoading}
                  primativeProps={{
                    placeholder: 'John',
                    autoComplete: 'given-name'
                  }}
                />
                <div className='mt-1 h-[14px] pl-1 text-sm text-red-400'>
                  {errors.fname?.message && errors.fname.message}
                </div>
              </div>
              <div>
                <Input
                  id='lname'
                  register={register}
                  errors={errors}
                  label='Last Name'
                  type='text'
                  disabled={isLoading}
                  primativeProps={{
                    placeholder: 'Doe',
                    autoComplete: 'family-name'
                  }}
                />
                <div className='mt-1 h-[14px] pl-1 text-sm text-red-400'>
                  {errors.lname?.message && errors.lname.message}
                </div>
              </div>
            </div>

            {/* country */}
            <div className='mb-4'>
              <Input
                id='country'
                register={register}
                errors={errors}
                label='Country'
                type='text'
                disabled={isLoading}
                primativeProps={{
                  placeholder: 'Nigeria',
                  autoComplete: 'country-name'
                }}
              />
              <div className='mt-1 h-[14px] pl-1 text-sm text-red-400'>
                {errors.country?.message && errors.country.message}
              </div>
            </div>
            {/* phone */}
            <div className='mb-4'>
              <Input
                id='phone'
                register={register}
                errors={errors}
                label='Phone'
                type='tel'
                disabled={isLoading}
                primativeProps={{
                  placeholder: '+234 812 345 6789',
                  autoComplete: 'tel'
                }}
              />
              <div className='mt-1 h-[14px] pl-1 text-sm text-red-400'>
                {errors.phone?.message && errors.phone.message}
              </div>
            </div>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* username */}
            <div className='mb-4'>
              <Input
                id='username'
                register={register}
                errors={errors}
                label='Username'
                type='text'
                disabled={isLoading}
                primativeProps={{
                  placeholder: '@johndoe',
                  autoComplete: 'username'
                }}
              />
              <div className='h-14px [mt-1] pl-1 text-sm capitalize text-red-400'>
                {errors.username?.message && errors.username.message}
              </div>
            </div>

            {/* email */}
            <div className='mb-4'>
              <Input
                id='email'
                register={register}
                errors={errors}
                label='Email'
                type='email'
                disabled={isLoading}
                primativeProps={{
                  placeholder: 'user@example.com',
                  autoComplete: 'email'
                }}
              />
              <div className='h-14px [mt-1] pl-1 text-sm capitalize text-red-400'>
                {errors.email?.message && errors.email.message}
              </div>
            </div>
            {/* password */}
            <div className=''>
              <Input
                id='password'
                register={register}
                errors={errors}
                label='Password'
                type='password'
                disabled={isLoading}
                primativeProps={{
                  placeholder: '*********',
                  autoComplete: 'current-password'
                }}
              />
            </div>
            <div className='h-14px [mt-1] pl-1 text-sm text-red-400'>
              {errors.password?.message && errors.password.message}
            </div>
          </motion.div>
        )}

        {/* Forgot password */}
        <div className='mb-7 flex'></div>

        {/* Submit button */}
        <div>
          {currentStep === 0 && (
            <button
              id='continue'
              type={'button'}
              disabled={isLoading}
              onClick={next}
              className='focus:ring-primary-300 disabled:bg-primary-700 relative z-50 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-700 focus:ring-4 disabled:opacity-60 '
            >
              Continue
            </button>
          )}
          {currentStep === 1 && (
            <div className='inline-flex w-full gap-4'>
              <button
                className='hover:opacity-75'
                type='button'
                title='Go Back'
                onClick={prev}
                disabled={isLoading}
              >
                <ArrowLeftIcon className='h-6 w-6' />
              </button>
              <button
                id='submit'
                type={'submit'}
                disabled={isLoading}
                className='focus:ring-primary-300 disabled:bg-primary-700 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-700 focus:ring-4 disabled:opacity-60 '
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
export default Signup
