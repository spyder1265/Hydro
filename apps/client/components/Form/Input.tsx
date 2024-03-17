'use client'
import { signUpSchema } from '@/lib/schema'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { z } from 'zod'

type Inputs = z.infer<typeof signUpSchema>

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  register: UseFormRegister<Inputs>
  errors: FieldErrors
  primativeProps: React.InputHTMLAttributes<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  errors,
  primativeProps
}) => {
  const [show, setShow] = useState(false)
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className={`text-md`}>
        {label} :
      </label>
      <div className='relative'>
        <input
          id={id}
          disabled={disabled}
          {...primativeProps}
          {...register(id as keyof Inputs)}
          type={
            type === 'password'
              ? show
                ? 'text'
                : 'password'
              : type === 'email'
                ? 'email'
                : 'text'
          }
          className={`
        w-full
        rounded-xl
          border-2
          bg-neutral-200
          p-3 
          font-light
          text-neutral-800
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${errors[id] && 'border-rose-500'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
        />
        {type === 'password' && (
          <div className='absolute right-3 top-0 flex h-full justify-end'>
            <button
              type='button'
              disabled={disabled}
              className='text-gray-900 focus:outline-none dark:text-gray-400'
              onClick={() => setShow(!show)}
            >
              {show ? (
                <HiEyeOff className='h-5 w-5' />
              ) : (
                <HiEye className='h-5 w-5' />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
