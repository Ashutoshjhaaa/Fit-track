import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options?: SelectOption[];
    className?: string;
    required?: boolean;
    placeholder?: string;
}

export default function Select({ label, value, onChange, options = [], className = '', required = false, placeholder = 'Select an option' }: SelectProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                </label>
            )}
            <div className='relative'>
                <select
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
                    className='w-full px-4 py-3 rounded-xl border border-white/10 bg-[#15161D] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#F2305A] focus:border-transparent transition-all duration-200 cursor-pointer text-sm'
                >
                    <option value='' disabled className="bg-[#1C1D26] text-white">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-[#1C1D26] text-white">
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8EA0] pointer-events-none' />
            </div>
        </div>
    );
}
