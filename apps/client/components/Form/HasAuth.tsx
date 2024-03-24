import { User } from '@prisma/client'
import Button from '../Button'
import { FaArrowRightToBracket, FaHouseLock } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

interface IHasAuth {
  user: User
}

const HasAuth: React.FC<IHasAuth> = ({ user }) => {
  const router = useRouter()

  const Logout = () => {
    localStorage.removeItem('token')
    router.refresh()
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
