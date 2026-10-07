import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: ButtonProps) {
    const baseStyles = 'px-5 py-3 flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
        primary: 'bg-[#F2305A] text-white hover:bg-[#ff3b68] shadow-lg shadow-[#F2305A]/30 focus:ring-[#F2305A] active:scale-[0.98] font-bold tracking-wide uppercase italic text-xs',
        secondary: 'bg-[#21222A] text-white border border-white/10 hover:border-white/25 hover:bg-[#2B2C36] focus:ring-white/20 text-xs font-bold uppercase tracking-wider',
        danger: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 focus:ring-red-500 text-xs font-bold uppercase tracking-wider',
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}
