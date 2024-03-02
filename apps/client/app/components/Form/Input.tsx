"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className={`text-md`}>
        {label} :
      </label>

      <input
        id={id}
        disabled={disabled}
        {...primativeProps}
        {...register(id, { required })}
        type={type}
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
    </div>
  );
};

export default Input;
