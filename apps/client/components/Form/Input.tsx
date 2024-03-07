"use client";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { HiEye, HiEyeOff, HiKey, HiMail } from "react-icons/hi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  primativeProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
  primativeProps,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className={`text-md`}>
        {label} :
      </label>
      <div className='relative'>
        <input
          id={id}
          disabled={disabled}
          {...primativeProps}
          {...register(id, { required })}
          type={
            type === "password"
              ? show
                ? "text"
                : "password"
              : type === "email"
              ? "email"
              : "text"
          }
          className={`
        bg-neutral-200
        text-neutral-800
          w-full
          p-3
          font-light 
          border-2
          rounded-lg
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] && "border-rose-500"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        />
        {type === "password" && (
          <div className='absolute right-3 top-0 h-full flex justify-end'>
            <button
              type='button'
              disabled={disabled}
              className='text-gray-900 focus:outline-none dark:text-gray-400'
              onClick={() => setShow(!show)}
            >
              {show ? (
                <HiEyeOff className='h-5 w-5' />
              ) : (
                <HiEye className='h-5 w-5' />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
