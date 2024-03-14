import { User } from "@prisma/client";
import Button from "../Button";
import { FaArrowRightToBracket, FaHouseLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface IHasAuth {
  user: User;
}

const HasAuth: React.FC<IHasAuth> = ({ user }) => {
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div className='flex flex-col w-full text-gray-300 items-center justify-center'>
      <h1 className='text-3xl font-bold'>
        Hello <span className='font-thin animate-pulse'>{user.name}</span>
      </h1>
      <div className='flex items-center gap-7 mt-11 justify-between'>
        <Button
          onClick={() => Logout()}
          type='button'
          className='text-white gap-2'
        >
          <FaArrowRightToBracket className='rotate-180 text-red-500' />
          <span>Logout</span>
        </Button>

        <Button
          onClick={() => {
            router.push("/home");
          }}
          type='button'
          className='text-white underline underline-offset-1 gap-2'
        >
          <span>Home</span>
          <FaHouseLock className='text-blue-500' />
        </Button>
      </div>
    </div>
  );
};
export default HasAuth;
