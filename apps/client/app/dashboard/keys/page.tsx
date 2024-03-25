'use client'
import Input from '@/components/Form/Input'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { api_keySchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaCopy } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { HiRefresh } from 'react-icons/hi'

type Inputs = z.infer<typeof api_keySchema>

function page() {
  const { isCollapsed } = useSidebarContext()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(api_keySchema)
  })

  const handleCopyToClipboard = (id: string) => {
    const copyText = document.getElementById(id) as HTMLInputElement
    navigator.clipboard.writeText(copyText.value)
  }

  return (
    <div
      id='main-content'
      className={twMerge(
        'relative h-screen w-full overflow-hidden bg-gray-50 dark:bg-neutral-900',
        isCollapsed ? 'lg:ml-[4.1rem]' : 'lg:ml-64'
      )}
    >
      <div className='flex h-full w-full flex-col items-center px-4 pb-4 pt-20  dark:text-neutral-300'>
        <div className='flex h-full w-full flex-col items-start md:flex-row'>
          {/* content */}
          <div className='flex h-full basis-2/3'>
            <div className='flex h-full w-full flex-col items-start p-4'>
              <h1 className='text-2xl font-semibold  dark:text-gray-100'>
                API Key
              </h1>
              <div className='flex h-full w-full flex-col items-start py-4'>
                <div>
                  {/* APi Key */}
                  <div className='mb-4 inline-flex w-full items-center justify-between'>
                    <Input
                      label='Your API Key is '
                      type='text'
                      disabled
                      primativeProps={{
                        placeholder: 'API Key',
                        autoComplete: 'off',
                        value: 'sdfsdfksjfksjdfsdfkjsfjn'
                      }}
                      className='min-w-full'
                      id={'api_key'}
                      //@ts-ignore
                      register={register}
                      errors={errors}
                    />

                    <button
                      type='button'
                      onClick={() => handleCopyToClipboard('api_key')}
                      className='flex h-6 items-center justify-center rounded-lg px-2 text-base font-normal text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700'
                    >
                      <FaCopy className='flex-shrink-0 text-lg text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white' />
                      <span className='flex-1 whitespace-nowrap px-3'>
                        Copy
                      </span>
                    </button>
                  </div>
                </div>

                {/* API URL */}
                <div className='mb-4 inline-flex w-full items-center justify-between'>
                  <Input
                    label='Your API URL is '
                    type='text'
                    disabled
                    primativeProps={{
                      placeholder: 'API URL',
                      autoComplete: 'off',
                      value: 'http://localhost:3000'
                    }}
                    className='w-full'
                    id={'api_url'}
                    //@ts-ignore
                    register={register}
                    errors={errors}
                  />

                  <button
                    type='button'
                    onClick={() => handleCopyToClipboard('api_url')}
                    className='flex h-6 items-center justify-center rounded-lg px-2 text-base font-normal text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700'
                  >
                    <FaCopy className='flex-shrink-0 text-lg text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white' />
                    <span className='flex-1 whitespace-nowrap px-3'>Copy</span>
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(data => {
                    console.log(data)
                  })}
                  className='flex h-full w-full flex-col items-start gap-4 py-4'
                >
                  {/* password */}
                  <div className='mb-4'>
                    <Input
                      label='Password'
                      type='password'
                      primativeProps={{
                        placeholder: '********',
                        autoComplete: 'current-password'
                      }}
                      id={'API_Key'}
                      //@ts-ignore
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div>
                    {/* regenerate button */}
                    <button
                      type='submit'
                      className='flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 text-base font-normal text-white hover:bg-blue-600'
                    >
                      <span>Regenerate API Key</span>
                      <HiRefresh />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='flex h-full basis-1/3 py-12 dark:text-neutral-300'>
            <div>
              <p className='mb-4 text-sm font-light'>
                Your API key is a unique identifier that allows you to
                authenticate with the API. Keep it secret and don't share it
                with anyone.
              </p>

              <p className='text-sm font-light'>
                You can reset or regenerate your API key at any time if you
                think it has been compromised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
