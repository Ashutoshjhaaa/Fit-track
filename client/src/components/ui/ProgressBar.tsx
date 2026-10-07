export default function ProgressBar({ value, max = 100, className = '' }: { value: number; max?: number; className?: string; }) {

    const percentage = Math.min(Math.round((value / max) * 100), 100);
    const isOverLimit = value > max;

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="w-full bg-[#15161D] rounded-full overflow-hidden h-2.5 border border-white/5">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isOverLimit 
                            ? 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                            : 'bg-gradient-to-r from-[#F2305A] to-[#FF6B8B] shadow-[0_0_10px_rgba(242,48,90,0.5)]'
                    }`} 
                    style={{ width: `${percentage}%` }} 
                />
            </div>
        </div>
    );
}
