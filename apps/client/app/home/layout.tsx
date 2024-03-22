import { SidebarProvider, useSidebarContext } from '@/contexts/SidebarContext'
import type { FC, PropsWithChildren } from 'react'
import ClientOnly from '@/components/ClientOnly'
import { DashboardSidebar } from '@/components/Dashboard/Sidebar/sidebar'
import { DashboardNavbar } from '@/components/Navbar/Navbar'
import getCurrentUser from '../actions/GetCurrentUser'

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}

const DashboardLayoutContent: FC<PropsWithChildren> = async function ({
  children
}) {
  const user = await getCurrentUser()

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
