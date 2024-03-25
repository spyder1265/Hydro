import { User } from '@prisma/client'
import Button from '../Button'
import { FaArrowRightToBracket, FaHouseLock } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface IHasAuth {
  user: User
}

const HasAuth: React.FC<IHasAuth> = ({ user }) => {
  const router = useRouter()

  const Logout = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage && localStorage.removeItem('token')
        if (localStorage && !localStorage.getItem('token')) {
          resolve('SignOut successful!')
          router.push('/auth')
        } else {
          reject('SignOut failed!')
        }
      }, 2000)
    })

    toast.promise(
      promise,
      {
        loading: 'Signing Out...',
        success: <b>GoodBye</b>,
        error: <b>Could not SignOut</b>
      },
      {
        success: {
          icon: '👋'
        }
      }
    )
  }

  return (
    <div className='flex w-full flex-col items-center justify-center dark:text-gray-300'>
      <h1 className='text-3xl font-bold'>
        Hello <span className='animate-pulse font-thin'>{user.name}</span>
      </h1>
      <div className='mt-11 flex items-center justify-between gap-7'>
        <Button
          onClick={() => Logout()}
          type='button'
          className='gap-2 dark:text-white'
        >
          <FaArrowRightToBracket className='rotate-180 text-red-500' />
          <span>Logout</span>
        </Button>

        <Button
          onClick={() => {
            router.push('/dashboard')
          }}
          type='button'
          className='gap-2 underline underline-offset-1 dark:text-white'
        >
          <span>Home</span>
          <FaHouseLock className='text-blue-500' />
        </Button>
      </div>
    </div>
  )
}
export default HasAuth
