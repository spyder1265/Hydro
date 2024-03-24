'use client'
import { SidebarProvider, useSidebarContext } from '@/contexts/SidebarContext'
import {
  useState,
  type FC,
  type PropsWithChildren,
  useLayoutEffect
} from 'react'
import ClientOnly from '@/components/ClientOnly'
import { DashboardSidebar } from '@/components/Dashboard/Sidebar/sidebar'
import { DashboardNavbar } from '@/components/Navbar/Navbar'
import getCurrentUser from '../actions/GetCurrentUser'
import { User } from '@prisma/client'

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}

const DashboardLayoutContent: FC<PropsWithChildren> = function ({ children }) {
  const [hasMounted, setHasMounted] = useState(false)
  const [user, setUser] = useState<User>({} as User)

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()

      return user
    }

    fetchUser()
      .then(user => {
        setUser(user!)
      })
      .finally(() => {
        setHasMounted(true)
      })
  }, [])

  if (hasMounted)
    return (
      <ClientOnly>
        <DashboardNavbar />
        <div className='flex items-start'>
          <DashboardSidebar user={user} />
          {children}
        </div>
      </ClientOnly>
    )
}

export default DashboardLayout
