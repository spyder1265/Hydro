"use client";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import Image from "next/image";

interface IBasicNavbar {
  className?: string;
  isLogin?: boolean;
  isAuth?: boolean;
  isLoggedIn?: boolean;
  username?: string;
  onFormChange?: () => void;
}

export const BasicNavbar: FC<IBasicNavbar> = ({
  isLogin,
  isAuth,
  isLoggedIn,
  username,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", isActive: pathname === "/" },
    { name: "About", href: "/about", isActive: pathname === "/about" },
    { name: "Pricing", href: "/pricing", isActive: pathname === "/pricing" },
    { name: "Contact", href: "/contact", isActive: pathname === "/contact" },
  ];

  return (
    <>
      <nav className='flex items-center justify-between w-full p-4'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={50}
            height={50}
            className='cursor-pointer'
          />
          <div className='hidden md:flex space-x-4'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  item.isActive
                    ? "text-white border-b-2 border-white"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          {isAuth && !isLoggedIn && (
            <a href='/login' className='text-white'>
              Login
            </a>
          )}
          {isAuth && !isLoggedIn && (
            <a href='/register' className='text-white'>
              Register
            </a>
          )}
          {isAuth && isLoggedIn && (
            <a href='/dashboard' className='text-white'>
              {username}
            </a>
          )}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-white'
              aria-label='menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16m-7 6h7'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className='flex flex-col items-center space-y-4 md:hidden'>
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className='text-white'>
              {item.name}
            </a>
          ))}
          {isAuth && !isLoggedIn && (
            <a href='/login' className='text-white'>
              Login
            </a>
          )}
          {isAuth && !isLoggedIn && (
            <a href='/register' className='text-white'>
              Register
            </a>
          )}
          {isAuth && isLoggedIn && (
            <a href='/dashboard' className='text-white'>
              {username}
            </a>
          )}
        </div>
      )}
    </>
  );
};
