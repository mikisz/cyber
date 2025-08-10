import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-3 py-2 rounded bg-accent-teal text-background hover:opacity-80 ${className}`}
      {...props}
    />
  );
}
