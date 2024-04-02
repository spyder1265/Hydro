'use client'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { Avatar, CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import { useState, type FC } from 'react'
import { HiChartPie, HiTable } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { BiArrowToLeft } from 'react-icons/bi'
import { HiCog } from 'react-icons/hi'
import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { HiKey } from 'react-icons/hi2'
import toast from 'react-hot-toast'

interface IDashboardSidebar {
  user?: User
}

export const DashboardSidebar: FC<IDashboardSidebar> = function ({ user }) {
  const { isCollapsed } = useSidebarContext()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const encodedName = encodeURIComponent(user?.name || 'user')

  const avatarClick = () => {
    if (isCollapsed) {
      router.push('/dashboard/profile/' + encodedName)
    } else {
      setIsOpen(!isOpen && isCollapsed)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = () => {
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

  const customTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: 'h-full ',
      collapsed: {
        on: 'w-16 bg-neutral-50 dark:bg-neutral-950',
        off: 'w-64 bg-neutral-50 dark:bg-neutral-950'
      },
      inner:
        'h-full overflow-y-auto overflow-x-hidden rounded bg-neutral-50 py-4 px-3 dark:bg-neutral-950'
    },

    item: {
      base: 'flex items-center justify-center hover:cursor-pointer rounded-lg p-2 text-base font-normal text-neutral-800 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-700',
      active: 'bg-neutral-200 opacity-80 dark:bg-neutral-700',
      collapsed: {
        insideCollapse: 'group w-full pl-8 transition duration-75',
        noIcon: 'font-bold'
      },
      content: {
        base: 'px-4 py-2 flex-1 whitespace-nowrap rounded-lg text-neutral-800 dark:text-neutral-300 shadow-xl bg-white dark:bg-neutral-800'
      },
      icon: {
        base: 'h-6 w-6 flex-shrink-0 text-neutral-800 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white',
        active: 'text-neutral-700 dark:text-neutral-100'
      },
      label: '',
      listItem: ''
    },
    items: {
      base: ''
    },
    itemGroup: {
      base: 'mt-4 space-y-2 border-t border-neutral-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-neutral-700'
    }
  }

  return (
    <Sidebar
      aria-label='Sidebar'
      collapsed={isCollapsed}
      theme={customTheme}
      id={'sidebar'}
      color='neutral'
      className={twMerge(
        'fixed left-0 z-20 flex h-full flex-col justify-between border-r border-neutral-200 bg-neutral-50 p-0 transition-all  duration-75 lg:flex dark:border-neutral-700 dark:bg-neutral-950',
        isCollapsed && 'hidden w-16'
      )}
    >
      <div className='absolute left-0 h-screen w-full flex-col bg-neutral-50 pt-16 dark:bg-neutral-800'>
        <Sidebar.Items className='flex h-[87vh] flex-col justify-between '>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href='/dashboard'
              active={isActive('/') || isActive('/dashboard')}
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>

            {/* content */}

            <Sidebar.Item
              href='/dashboard/content'
              active={isActive('/dashboard/content')}
              icon={HiTable}
            >
              Content
            </Sidebar.Item>

            {/* settings */}
            <Sidebar.Item
              href='/dashboard/settings'
              active={isActive('/dashboard/settings')}
              icon={HiCog}
            >
              Settings
            </Sidebar.Item>

            {/* Keys */}
            <Sidebar.Item
              href='/dashboard/keys'
              active={isActive('/dashboard/keys')}
              icon={HiKey}
            >
              Keys
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <div>
            <div className={`mb-4 flex h-[1.2px]  `}></div>

            {isCollapsed ? (
              <Sidebar.ItemGroup>
                {/* signout button */}
                <Sidebar.Item
                  onClick={() => handleSignOut()}
                  icon={BiArrowToLeft}
                >
                  SignOut
                </Sidebar.Item>

                {/* profile */}
                <Sidebar.Item
                  href={'/dashboard/profile/' + user?.name}
                  active={isActive('/dashboard/profile/' + encodedName)}
                  className='cursor-pointer'
                  image={user?.image || '/profile-picture-5.jpg'}
                >
                  {user?.name || "user's name"}
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            ) : (
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  onClick={() => handleSignOut()}
                  icon={BiArrowToLeft}
                >
                  SignOut
                </Sidebar.Item>
                <a
                  href={'/dashboard/profile/' + encodedName}
                  className={`inline-flex w-full items-center ${isActive('/dashboard/profile/' + encodedName) && 'bg-neutral-200 dark:bg-neutral-700'} rounded-lg px-2 py-2 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-700 ${isCollapsed && 'justify-center'} gap-2`}
                >
                  <Avatar
                    img={user?.image || '/profile-picture-5.jpg'}
                    alt='Profile Picture'
                    rounded
                    onClick={() => avatarClick}
                  />
                  <div className={isCollapsed ? 'hidden' : 'block'}>
                    <p className='inline-flex items-center gap-1 text-sm font-semibold text-[#475569] dark:text-white'>
                      <span className='capitalize'>
                        {user?.name?.split(' ')[0]}
                      </span>
                      <span className='capitalize'>
                        {user?.name?.split(' ')[1]}
                      </span>
                    </p>
                    <p className='text-xs text-[#475569] dark:text-white'>
                      {user?.email}
                    </p>
                  </div>
                </a>
              </Sidebar.ItemGroup>
            )}
          </div>
        </Sidebar.Items>
      </div>
    </Sidebar>
  )
}
