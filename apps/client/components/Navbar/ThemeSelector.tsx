"use client";
import { Theme, useTheme } from "@/app/contexts/ThemeContext";
import { cn } from "@/lib/utils/cn";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { HiOutlineTv } from "react-icons/hi2";

interface IThemeSelector {}

const ThemeSelector: React.FC<IThemeSelector> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: contextTheme, toggleTheme } = useTheme();
  const [theme, setTheme] = useState(contextTheme);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTheme = (theme: Theme) => {
    toggleTheme(theme);
    setTheme(theme);

    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      handleTheme(theme as Theme);
    } else {
      handleTheme(contextTheme);
    }
  }, [theme]);

  const themeOptions = [
    {
      title: "light",
      icon: <FaSun className='dark:text-white text-black hover:opacity-75 ' />,
      className:
        "w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text",
      active: contextTheme === "light" ? true : false,
    },

    {
      title: "dark",
      icon: <FaMoon className='dark:text-white text-black hover:opacity-75 ' />,
      className:
        "w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text",
      active: contextTheme === "dark" ? true : false,
    },
    {
      title: "system",
      icon: (
        <HiOutlineTv className='dark:text-white text-black hover:opacity-75 ' />
      ),
      className:
        "w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-500 dark:to-slate-300 bg-clip-text ",
      active: contextTheme === "system" ? true : false,
    },
  ];

  return (
    <div className='flex items-center px-4 relative '>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center '
      >
        {themeOptions
          .filter((theme) => theme.active)
          .map((theme, index) => (
            <div
              key={theme.title + index}
              className={cn(
                "flex items-center justify-center",
                theme.className
              )}
            >
              {isOpen ? (
                <FaXmark className='dark:text-white text-black hover:opacity-75 ' />
              ) : (
                theme.icon
              )}
            </div>
          ))}
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          className='absolute items-center flex z-50 flex-col top-12 -right-2 '
        >
          <div className='w-2 h-2 border-4 border-solid border-transparent border-t-white rotate-180 '></div>
          <div className='rounded-xl bg-white dark:bg-slate-950 shadow-lg border p-4 space-y-2'>
            {themeOptions.map((themeOption, index) => (
              <button
                key={themeOption.title + index}
                title={themeOption.title + " mode"}
                onClick={() => handleTheme(themeOption.title as Theme)}
                className='flex items-center justify-center w-10 h-10 rounded-full'
              >
                {themeOption.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ThemeSelector;
