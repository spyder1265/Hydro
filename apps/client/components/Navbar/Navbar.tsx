'use client'
import { FC, Fragment, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  UserGroupIcon,
  XMarkIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ThemeSelector from './ThemeSelector'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { isSmallScreen } from '@/helpers/is-small-screen'
import { Navbar as FlowbiteNavbar } from 'flowbite-react'
import { HiMenuAlt1, HiX } from 'react-icons/hi'

const products = [
  {
    name: 'Reviews',
    description: 'Check out the rewiews of most of our customers',
    href: '#reviews',
    icon: UserGroupIcon
  },
  {
    name: 'Contact us',
    description: 'Get in touch with us',
    href: '#contact',
    icon: PhoneIcon
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  contact?: boolean
  onSearch?: (search: string) => void
}

const Navbar: React.FC<Props> = ({ contact, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = usePathname()
  const router = useRouter()

  return (
    <header
      className={` z-50 w-full dark:bg-slate-950 ${
        contact && 'absolute  left-0 right-0 top-0 w-full'
      }`}
    >
      <nav
        className='w-7xl mx-auto flex items-center justify-between p-3 py-5 md:px-8'
        aria-label='Global'
      >
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 hover:opacity-75 dark:text-neutral-300 dark:hover:text-neutral-200'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3BottomLeftIcon
              className='hover: h-6 w-6'
              aria-hidden='true'
            />
          </button>
        </div>

        <div
          className='ml-7 flex h-6 items-center
place-self-center  md:m-0 md:h-10 lg:flex-1'
        >
          <a
            href='/'
            className='bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-2xl dark:from-slate-300 dark:to-slate-500'
          >
            Hydro
          </a>
        </div>

        <div className='my-auto  h-full justify-center lg:hidden'>
          <ThemeSelector />
        </div>

        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          <a
            href='/'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === '/' ? 'underline' : 'hover:opacity-75'
            } dark:hover:text-neutral-50`}
          >
            Home
          </a>
          <Popover className='relative'>
            <Popover.Button
              className={`flex items-center gap-x-1 text-sm font-semibold leading-6 outline-none dark:text-neutral-200 ${
                location === '/reviews' ||
                location === '/contact' ||
                location === '/admin'
                  ? 'underline'
                  : 'hover:opacity-75'
              } dark:hover:text-neutral-50`}
            >
              Product
              <ChevronDownIcon
                className='h-5 w-5 flex-none dark:text-neutral-200'
                aria-hidden='true'
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute -left-8 top-full z-[100] mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-neutral-900/5 dark:bg-black'>
                <div className='p-4'>
                  {products.map(item => (
                    <div
                      key={item.name}
                      className='group relative flex items-center gap-x-6 overflow-hidden rounded-xl p-4 text-sm leading-6 hover:bg-neutral-900 dark:hover:bg-neutral-100 '
                    >
                      <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg '>
                        <item.icon
                          className='h-6 w-6 text-neutral-900 group-hover:text-neutral-300 dark:text-neutral-100 dark:group-hover:text-black'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex-auto'>
                        <a
                          href={item.href}
                          className='block font-semibold text-neutral-900 group-hover:text-neutral-300 dark:text-neutral-100 dark:group-hover:text-black'
                        >
                          {item.name}
                          <span className='absolute inset-0' />
                        </a>
                        <p className='mt-1 text-neutral-900 group-hover:text-neutral-300 dark:text-neutral-100 dark:group-hover:text-black'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a
            href='#about'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === '/about' ? 'underline' : 'hover:opacity-75'
            } dark:hover:text-neutral-50 `}
          >
            About Us
          </a>
          <a
            href='#pricing'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === '/repairs' ? 'underline' : 'hover:opacity-75'
            } dark:hover:text-neutral-50 `}
          >
            Pricing
          </a>
        </Popover.Group>

        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <ThemeSelector />
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-neutral-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10 dark:bg-black'>
          <div className='flex items-center  justify-between'>
            <div className='-m-1.5 p-1.5'>
              <a
                href='/'
                className='bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-2xl dark:from-slate-300 dark:to-slate-500'
              >
                Hydro
              </a>
            </div>

            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-neutral-700 dark:text-neutral-300'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon
                className='h-6 w-6 hover:text-neutral-500 '
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-neutral-500/10'>
              <div className='space-y-2 py-6'>
                <a
                  href='/'
                  aria-disabled={location === '/'}
                  className={`-mx-3 block rounded-lg ${
                    location === '/'
                      ? 'bg-neutral-100 text-black'
                      : 'text-neutral-600 hover:bg-neutral-900 hover:text-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-800'
                  } hover:text-underline px-3 py-2 text-base font-semibold leading-7`}
                >
                  Home
                </a>
                <Disclosure as='div' className='-mx-3'>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 ${
                          location === '/reviews' ||
                          location === '/contact' ||
                          location === '/admin'
                            ? 'bg-neutral-100 text-neutral-800'
                            : ' text-neutral-600 hover:bg-neutral-900 hover:text-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-800'
                        }`}
                      >
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'rotate-180' : '',
                            'h-5 w-5 flex-none'
                          )}
                          aria-hidden='true'
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='mt-2 space-y-2'>
                        {[...products].map(item => (
                          <Disclosure.Button
                            key={item.name}
                            as='a'
                            href={item.href}
                            className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 ${
                              location === item.href
                                ? 'bg-neutral-300 text-neutral-600'
                                : 'text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-800'
                            } `}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href='#about'
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    location === '/about'
                      ? 'bg-neutral-100 text-neutral-800'
                      : ' text-neutral-600 hover:bg-neutral-900 hover:text-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-800'
                  }`}
                >
                  About Us
                </a>
                <a
                  href='#pricing'
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    location === '/repairs'
                      ? 'bg-neutral-100 text-neutral-800'
                      : ' text-neutral-600 hover:bg-neutral-900 hover:text-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-800'
                  }`}
                >
                  Pricing
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Navbar

export const FormNav = () => {
  const searchparams = useSearchParams()
  return (
    <div className='flex w-full justify-between px-9 text-neutral-950 dark:text-neutral-50 '>
      <div className='-m-1.5 p-1.5'>
        <a
          href='/'
          className='bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent hover:opacity-75 md:text-2xl dark:from-slate-300 dark:to-slate-500'
        >
          Hydro
        </a>
      </div>
      <div className='flex gap-2'>
        <ThemeSelector />

        {searchparams.get('form') === 'signup' ? (
          <a
            href='/auth'
            className='rounded-lg border px-4 py-1 dark:hover:border-neutral-300 dark:hover:text-neutral-300'
          >
            Login
          </a>
        ) : (
          <a
            href='/auth?form=Signup'
            className='rounded-lg border px-4 py-1 dark:hover:border-neutral-300 dark:hover:text-neutral-300'
          >
            Signup
          </a>
        )}
      </div>
    </div>
  )
}

export const DashboardNavbar: FC<Record<string, never>> = function () {
  const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } =
    useSidebarContext()

  return (
    <header>
      <FlowbiteNavbar
        fluid
        className='fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-700 dark:bg-neutral-800'
      >
        <div className='relative w-full p-3 pr-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <button
                aria-controls='sidebar'
                aria-expanded
                className='mr-2 cursor-pointer rounded p-2 hover:opacity-75 dark:text-gray-400 dark:hover:text-white'
                onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed && isSmallScreen() ? (
                  <HiMenuAlt1 className='h-6 w-6' />
                ) : isSidebarCollapsed && !isSmallScreen() ? (
                  <HiMenuAlt1 className='h-6 w-6' />
                ) : (
                  <HiX className='h-6 w-6' />
                )}
              </button>
              <FlowbiteNavbar.Brand href='/'>
                <h1 className='bg-gradient-to-br from-neutral-600 to-slate-500 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-2xl dark:from-slate-300 dark:to-slate-500'>
                  Hydro
                </h1>
              </FlowbiteNavbar.Brand>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </FlowbiteNavbar>
    </header>
  )
}
