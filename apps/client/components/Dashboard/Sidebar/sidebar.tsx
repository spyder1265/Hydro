'use client'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { Avatar, ListGroup, Sidebar } from 'flowbite-react'
import { useState, type FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  HiChartPie,
  HiInbox,
  HiOutlineAdjustments,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards
} from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

import { motion } from 'framer-motion'
import { BiArrowToLeft } from 'react-icons/bi'
import { HiUserCircle } from 'react-icons/hi'
import { User } from '@prisma/client'

interface IDashboardSidebar {
  user?: User
}

export const DashboardSidebar: FC<IDashboardSidebar> = function ({ user }) {
  const { isCollapsed } = useSidebarContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sidebar
      aria-label='Sidebar'
      collapsed={isCollapsed}
      id={'sidebar'}
      className={twMerge(
        'fixed left-0 z-20 flex h-full flex-col justify-between border-r border-gray-200 bg-neutral-50 p-0 transition-all  duration-75 lg:flex dark:border-gray-700 dark:bg-neutral-950',
        isCollapsed && 'hidden w-16'
      )}
    >
      <div className='absolute left-0 h-screen w-full flex-col bg-neutral-50 dark:bg-neutral-800'>
        <Sidebar.Items className='flex h-[87vh] flex-col justify-between '>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='#Dashboard' icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href='#Kanban' icon={HiViewBoards}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href='#Inbox' icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href='#Users' icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href='#Products' icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href='#SignUp' icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <div>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              <Sidebar.Item
                href='#Upgrade'
                icon={HiChartPie}
                className='cursor-pointer self-end justify-self-end'
              >
                Upgrade to Pro
              </Sidebar.Item>
            </Sidebar.ItemGroup>

            <div
              className={`relative flex w-full items-center justify-evenly gap-x-2 border-t ${
                !isCollapsed && 'border-slate-300'
              } pt-5`}
            >
              {isOpen && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                  className={`absolute ${
                    isCollapsed ? '-right-20 -top-32' : '-right-1 -top-32 '
                  } z-50 flex justify-center`}
                >
                  <ListGroup className='w-48' color='dark'>
                    <ListGroup.Item icon={HiUserCircle}>Profile</ListGroup.Item>
                    <ListGroup.Item icon={HiOutlineAdjustments}>
                      Settings
                    </ListGroup.Item>
                    <ListGroup.Item
                      icon={BiArrowToLeft}
                      // onClick={() => signOut()}
                    >
                      Logout
                    </ListGroup.Item>
                  </ListGroup>
                </motion.div>
              )}

              <div className='inline-flex w-full items-center gap-2'>
                <Avatar
                  img={user?.image || '/profile-picture-5.jpg'}
                  alt='Profile Picture'
                  rounded
                  onClick={() => setIsOpen(!isOpen && isCollapsed)}
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
              </div>

              {isCollapsed ? (
                <></>
              ) : (
                <button
                  className='text-[#475569] dark:text-white dark:hover:text-neutral-300'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BsThreeDotsVertical className='h-4 w-4 ' />
                </button>
              )}
            </div>
          </div>
        </Sidebar.Items>
      </div>
    </Sidebar>
  )
}
