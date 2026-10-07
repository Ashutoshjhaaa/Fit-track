import React, { useEffect, useState } from 'react';
import { RefreshCw, Zap, User, Info, Ruler, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { goalLabels } from '../assets/assets';

const KineticNoir: React.FC<{ onEdit?: () => void }> = ({ onEdit }) => {
    const { user } = useAppContext();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const StatsCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
        <div className="bg-[#21222A] p-5 rounded-2xl border border-white/10 flex flex-col gap-2 hover:border-[#F2305A]/30 transition-all shadow-xl">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-[#15161D] border border-white/5 rounded-lg">
                    <Icon size={14} className="text-[#F2305A]" />
                </div>
                <span className="text-[#8E8EA0] text-xs uppercase tracking-wider font-bold">{label}</span>
            </div>
            <div className="text-white text-2xl font-black italic tracking-tight font-roobert">
                {value}
            </div>
        </div>
    );

    const ProgressBar = ({ progress, target, unit, label, highlight = false }: { progress: number; target: number; unit: string; label: string; highlight?: boolean }) => {
        const percentage = Math.min((progress / target) * 100, 100);
        
        return (
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[#8E8EA0] text-[11px] uppercase font-bold tracking-widest">{label}</div>
                        <div className="text-white text-xl font-black italic font-roobert">
                            {progress.toLocaleString()} <span className="text-xs font-normal text-[#8E8EA0] not-italic">{unit}</span>
                        </div>
                    </div>
                    {highlight && (
                        <div className="text-[#F2305A] text-xs font-black tracking-wider uppercase">
                            {percentage.toFixed(0)}% Target
                        </div>
                    )}
                </div>
                <div className="h-2.5 w-full bg-[#15161D] rounded-full overflow-hidden border border-white/5">
                    <div 
                        className={`h-full bg-gradient-to-r from-[#F2305A] to-[#FF6B8B] rounded-full transition-all duration-1000 ease-out ${animate ? 'w-full' : 'w-0'}`} 
                        style={{ width: animate ? `${percentage}%` : '0%', boxShadow: '0 0 12px rgba(242, 48, 90, 0.4)' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#15161D] text-white p-4 md:p-8 font-sans min-h-full transition-colors select-none">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10 p-6 bg-gradient-to-r from-[#1C1D26] via-[#21222A] to-[#15161D] rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Subtle Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-l from-[#F2305A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="w-full md:w-auto relative z-10">
                    <div className="flex items-center justify-between md:justify-start gap-3">
                        <h1 className="text-3xl md:text-5xl font-black font-roobert tracking-tight uppercase italic text-white">{user?.username || 'ATHLETE'}</h1>
                        <span className="bg-[#F2305A]/15 text-[#F2305A] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#F2305A]/30 uppercase tracking-widest whitespace-nowrap">PREMIUM TIER</span>
                    </div>
                    <p className="text-[#8E8EA0] text-xs md:text-sm mt-1">{user?.email || 'athlete@fit-track.io'}</p>
                </div>
                <div className="flex w-full md:w-auto gap-2 md:gap-3 relative z-10">
                    {onEdit && (
                        <button 
                            onClick={onEdit}
                            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            Edit Data
                        </button>
                    )}
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#F2305A] hover:bg-[#ff3b68] text-white text-xs font-black uppercase italic tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F2305A]/30 cursor-pointer">
                        <RefreshCw size={14} className="stroke-[2.5]" /> Sync Watch
                    </button>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard label="Current Age" value={`${user?.age || 25} yrs`} icon={Info} />
                <StatsCard label="Body Weight" value={`${user?.weight || 70} KG`} icon={User} />
                <StatsCard label="Stature" value={`${user?.height || 170} CM`} icon={Ruler} />
                <StatsCard label="Active Goal" value={user?.goal ? goalLabels[user.goal as keyof typeof goalLabels]?.split(' ')[0] : 'MAINTAIN'} icon={Target} />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Fuel Analysis */}
                <div className="lg:col-span-12 xl:col-span-7 bg-[#21222A] p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col shadow-xl">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xs md:text-sm font-black font-roobert tracking-[0.16em] text-white uppercase italic">DAILY FUEL ANALYSIS</h2>
                                <span className="bg-[#15161D] text-[#8E8EA0] text-[9px] px-2 py-0.5 rounded-md font-bold uppercase border border-white/5">LAST 24H</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 flex-1">
                        <ProgressBar 
                            label="Energy Consumed" 
                            progress={1840} 
                            target={user?.dailyCalorieIntake || 2200} 
                            unit="kcal" 
                            highlight 
                        />
                        
                        <div className="space-y-4">
                            <ProgressBar 
                                label="Energy Expended" 
                                progress={650} 
                                target={user?.dailyCalorieBurn || 580} 
                                unit="kcal" 
                            />
                            <div className="flex items-center gap-2 text-xs text-[#8E8EA0]">
                                <span className="bg-[#F2305A]/15 text-[#F2305A] px-2 py-0.5 rounded-md font-extrabold border border-[#F2305A]/25">112%</span> vs daily baseline ({user?.dailyCalorieBurn || 580} kcal)
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Diet Plan */}
                <div className="lg:col-span-12 xl:col-span-5 bg-[#21222A] p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative shadow-xl">
                    <div className="absolute top-6 right-6 text-[#F2305A]">
                        <Zap size={22} className="fill-[#F2305A]" />
                    </div>
                    
                    <div>
                        <h2 className="text-lg md:text-xl font-black font-roobert tracking-tight mb-4 flex items-center gap-2 text-white uppercase italic">
                            AI DIET PLAN 2.0
                        </h2>
                        <p className="text-[#8E8EA0] text-xs md:text-sm leading-relaxed mb-6 font-normal">
                            Optimized macros for <span className="text-white capitalize font-bold">{user?.goal?.replace('-', ' ') || 'maintenance'} phase</span>. 
                            Protein intake focused on 1.8g/kg. Carb timing suggested post-weighted sessions for maximum glycogen restoration.
                        </p>
                    </div>

                    <button className="w-full py-3.5 mt-auto bg-[#15161D] hover:bg-[#1C1D26] text-white hover:text-[#F2305A] text-xs font-black uppercase tracking-wider rounded-xl border border-white/10 hover:border-[#F2305A]/40 transition-all cursor-pointer">
                        View Personalized Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KineticNoir;
