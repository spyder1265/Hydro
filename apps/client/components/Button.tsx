interface IButton {
  text?: string
  onClick?: () => void
  isLoading?: boolean
  type: 'submit' | 'button'
  className?: string
  disabled?: boolean
  icon?: string
  color?: string
  size?: string
  variant?: string
  rounded?: string
  block?: boolean
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  download?: string
  as?: string
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  border?: string
}

const Button: React.FC<IButton> = ({
  text,
  onClick,
  isLoading,
  type,
  className,
  disabled,
  icon,
  color,
  size,
  variant,
  rounded,
  block,
  children,
  href,
  target,
  rel,
  download,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  border
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={` ${className} inline-flex w-full items-center justify-center px-4 py-3 ${border} rounded-xl text-neutral-900  hover:bg-neutral-200 dark:text-white hover:dark:bg-transparent hover:dark:opacity-75`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
