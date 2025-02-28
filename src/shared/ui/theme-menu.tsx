'use client'

import {
  ActionIcon,
  Loader,
  Menu,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { useIsomorphicEffect } from '@mantine/hooks'
import { useState } from 'react'
import { cn } from '../lib'
import { Icon } from './icon'

export const ThemeMenu: React.FC = () => {
  const [isHydrated, setHydrated] = useState(false)
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme()

  useIsomorphicEffect(() => setHydrated(true), [])

  return (
    <Menu
      radius="md"
      shadow="md"
      width={200}
      transitionProps={{ transition: 'pop', duration: 200 }}
    >
      <Menu.Target>
        <ActionIcon variant="default" size="lg" radius="md" title="테마 변경">
          {!isHydrated && <Loader size="xs" />}
          <Icon
            query="fluent-emoji:sun-behind-small-cloud"
            className={cn(
              'absolute inset-0 m-auto inline-flex size-5 items-center justify-center opacity-0 transition-opacity',
              isHydrated && computedColorScheme === 'light' && 'animate-pop-spin opacity-100',
            )}
            suppressHydrationWarning
          />
          <Icon
            query="fluent-emoji:crescent-moon"
            className={cn(
              'absolute inset-0 m-auto inline-flex size-5 items-center justify-center opacity-0 transition-opacity',
              isHydrated && computedColorScheme === 'dark' && 'animate-pop-spin opacity-100',
            )}
            suppressHydrationWarning
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<Icon query="fluent-emoji:laptop" />}
          classNames={{ itemLabel: 'text-base' }}
          title="테마 변경: 시스템 테마"
          onClick={() => setColorScheme('auto')}
          disabled={colorScheme === 'auto'}
        >
          시스템 테마
        </Menu.Item>
        <Menu.Item
          leftSection={<Icon query="fluent-emoji:sun-behind-small-cloud" />}
          classNames={{ itemLabel: 'text-base' }}
          title="테마 변경: 밝은 테마"
          onClick={() => setColorScheme('light')}
          disabled={colorScheme === 'light'}
        >
          밝은 테마
        </Menu.Item>
        <Menu.Item
          leftSection={<Icon query="fluent-emoji:crescent-moon" />}
          classNames={{ itemLabel: 'text-base' }}
          title="테마 변경: 어두운 테마"
          onClick={() => setColorScheme('dark')}
          disabled={colorScheme === 'dark'}
        >
          어두운 테마
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
