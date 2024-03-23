import { type CustomFlowbiteTheme } from 'flowbite-react'

export const flowbiteTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: 'h-full ',
      collapsed: {
        on: 'w-16 bg-neutral-50 dark:bg-neutral-950',
        off: 'w-64 bg-neutral-50 dark:bg-neutral-950'
      },
      inner:
        'h-full overflow-y-auto overflow-x-hidden rounded bg-neutral-50 py-4 px-3 dark:bg-neutral-950'
    }
  }
}
