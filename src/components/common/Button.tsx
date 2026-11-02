import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variantClasses = {
    primary: 'bg-slate-950 hover:bg-slate-800 text-white shadow-xs rounded-lg active:scale-[0.99]',
    dark: 'bg-slate-900 hover:bg-black text-white rounded-lg active:scale-[0.99]',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg',
    outline: 'border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg',
    ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-950 rounded-lg',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
    md: 'text-sm px-4 py-2 gap-2 font-medium',
    lg: 'text-base px-6 py-2.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
