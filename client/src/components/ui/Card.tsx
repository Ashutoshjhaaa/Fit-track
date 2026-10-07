import React from 'react'

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`bg-[#21222A] rounded-2xl border border-white/10 shadow-xl p-5 text-white transition-all duration-300 hover:border-white/20 ${className}`}>
            {children}
        </div>
    );
}

export default Card