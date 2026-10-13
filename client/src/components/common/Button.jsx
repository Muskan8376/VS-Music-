import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
  icon = null
}) {
  const variantClasses = {
    primary: 'bg-[#ea3838] text-white shadow-[0_4px_14px_rgba(234,56,56,0.35)] hover:bg-[#d32828] hover:shadow-[0_6px_20px_rgba(234,56,56,0.45)] hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#2b303b] text-white hover:bg-[#373d4b] hover:-translate-y-0.5',
    outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/60',
    text: 'bg-transparent text-white hover:text-[#ea3838] p-0'
  }[variant] || 'bg-[#ea3838] text-white hover:bg-[#d32828]';

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  }[size] || 'px-5 py-2.5 text-sm';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea3838]/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap ${
        fullWidth ? 'w-full' : ''
      } ${variantClasses} ${sizeClasses} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
