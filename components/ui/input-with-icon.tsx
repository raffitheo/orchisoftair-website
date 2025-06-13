'use client';

import * as React from 'react';

import { Input } from './input';

interface InputWithIconProps {
  disabled?: boolean;
  icon: React.ReactNode;
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
}

const InputWithIcon = ({
  disabled,
  icon,
  id,
  name,
  onChange,
  placeholder,
  required = false,
  type,
  value,
}: InputWithIconProps) => (
  <div className="relative mt-1">
    {icon}

    <Input
      className="pl-10 bg-orchi-gray/20 border-orchi-gray/40 text-orchi-light placeholder:text-orchi-light/50 focus:border-orchi-gold"
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  </div>
);

export default InputWithIcon;
