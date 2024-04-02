'use client'
import { Theme, useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils/cn'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaMoon, FaSun, FaXmark } from 'react-icons/fa6'
import { HiOutlineTv } from 'react-icons/hi2'

interface IThemeSelector {}

const ThemeSelector: React.FC<IThemeSelector> = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme: contextTheme, toggleTheme } = useTheme()
  const [theme, setTheme] = useState(contextTheme)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleTheme = (theme: Theme) => {
    toggleTheme(theme)
    setTheme(theme)

    setIsOpen(false)
    router.refresh()
  }

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  useLayoutEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) {
      handleTheme(theme as Theme)
    } else {
      handleTheme(contextTheme)
    }
  }, [theme])

  const themeOptions = [
    {
      title: 'light',
      icon: <FaSun className='text-black hover:opacity-75 dark:text-white ' />,
      className:
        'w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text',
      active: contextTheme === 'light' ? true : false
    },

    {
      title: 'dark',
      icon: <FaMoon className='text-black hover:opacity-75 dark:text-white ' />,
      className:
        'w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text',
      active: contextTheme === 'dark' ? true : false
    },
    {
      title: 'system',
      icon: (
        <HiOutlineTv className='text-black hover:opacity-75 dark:text-white ' />
      ),
      className:
        'w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text ',
      active: contextTheme === 'system' ? true : false
    }
  ]

  return (
    <div className='relative flex items-center px-4 '>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center '
      >
        {themeOptions
          .filter(theme => theme.active)
          .map((theme, index) => (
            <div
              key={theme.title + index}
              className={cn(
                'flex items-center justify-center',
                theme.className
              )}
            >
              {isOpen ? (
                <FaXmark className='text-black hover:opacity-75 dark:text-white ' />
              ) : (
                theme.icon
              )}
            </div>
          ))}
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          className='absolute -right-2 top-12 z-50 flex flex-col items-center '
        >
          <div className='h-2 w-2 rotate-180 border-4 border-solid border-transparent border-t-white '></div>
          <div
            className={`space-y-2 rounded-xl border-[0.2px] bg-white p-4 shadow-lg 
            ${pathname.includes('dashboard') || pathname.includes('auth') ? 'dark:bg-neutral-800' : 'dark:bg-slate-950'}`}
          >
            {themeOptions.map((themeOption, index) => (
              <button
                key={themeOption.title + index}
                title={themeOption.title + ' mode'}
                onClick={() => handleTheme(themeOption.title as Theme)}
                className='flex h-10 w-10 items-center justify-center rounded-full'
              >
                {themeOption.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default ThemeSelector
