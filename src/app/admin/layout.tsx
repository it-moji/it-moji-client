'use client'

import { AppShell, Burger } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { SideBar } from '@/widgets/side-bar'
import { useBreakpoint } from '@/shared/lib'
import { MainLogo, ThemeMenu } from '@/shared/ui'

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [button, setButton] = useState<HTMLButtonElement | null>(null)
  const [sideBar, setSideBar] = useState<HTMLElement | null>(null)

  const [isOpen, { toggle, close }] = useDisclosure()
  const matchesLG = useBreakpoint('lg')

  useEffect(close, [matchesLG, close])

  useClickOutside(isOpen ? close : () => {}, null, [button, sideBar])

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'lg', collapsed: { mobile: !isOpen } }}
      padding="md"
    >
      <AppShell.Header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center justify-center space-x-3">
          <Burger ref={setButton} opened={isOpen} onClick={toggle} hiddenFrom="lg" size="sm" />
          <h1>
            <MainLogo />
          </h1>
        </div>
        <ThemeMenu />
      </AppShell.Header>
      <AppShell.Navbar ref={setSideBar} p="md" className="max-w-80">
        <SideBar onClick={close} />
      </AppShell.Navbar>
      <AppShell.Main className="bg-gray-50 dark:bg-dark-900">{children}</AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout
