interface IButton {
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type: "submit" | "button";
  className?: string;
  disabled?: boolean;
  icon?: string;
  color?: string;
  size?: string;
  variant?: string;
  rounded?: string;
  block?: boolean;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  border?: string;
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
  border,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={` ${className} w-full py-3 px-4 inline-flex justify-center items-center ${border} hover:bg-neutral-200 hover:dark:bg-transparent  hover:dark:opacity-75 text-neutral-900 dark:text-white rounded-xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
