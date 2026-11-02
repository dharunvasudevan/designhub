import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'pricing' | 'category' | 'pill' | 'tag' | 'verified';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center text-xs font-medium';

  const variantClasses = {
    default: 'px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80',
    pricing: 'px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 text-[11px] font-semibold border border-slate-200/70',
    category: 'px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium',
    pill: 'px-3 py-1 rounded-full bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs transition-colors cursor-pointer border border-slate-200/60',
    tag: 'px-2 py-0.5 rounded-sm bg-slate-50 text-slate-500 hover:text-slate-700 text-[11px] border border-slate-200/60',
    verified: 'px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
