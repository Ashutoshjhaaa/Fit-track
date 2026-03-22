import React, { useEffect, useState } from 'react';
import { Settings, RefreshCw, Zap, Plus, User, Info, Ruler, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { goalLabels } from '../assets/assets';

const KineticNoir: React.FC<{ onEdit?: () => void }> = ({ onEdit }) => {
    const { user } = useAppContext();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const StatsCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
        <div className="bg-white dark:bg-[#141716] p-4 rounded-[12px] border border-slate-200 dark:border-white/5 flex flex-col gap-2 transition-colors">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 dark:bg-black/40 rounded-md">
                    <Icon size={14} className="text-slate-500 dark:text-[#6b7280]" />
                </div>
                <span className="text-slate-500 dark:text-[#6b7280] text-xs uppercase tracking-wider font-medium">{label}</span>
            </div>
            <div className="text-slate-900 dark:text-white text-2xl font-bold font-data">
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
                        <div className="text-slate-500 dark:text-[#6b7280] text-[10px] uppercase font-bold tracking-widest">{label}</div>
                        <div className="text-slate-900 dark:text-white text-xl font-bold font-data">
                            {progress.toLocaleString()} <span className="text-xs font-normal text-slate-400 dark:text-[#6b7280]">{unit}</span>
                        </div>
                    </div>
                    {highlight && (
                        <div className="text-emerald-500 dark:text-[#00ff6a] text-xs font-data">
                            {percentage.toFixed(0)}% Target
                        </div>
                    )}
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden">
                    <div 
                        className={`h-full bg-emerald-500 dark:bg-[#00ff6a] transition-all duration-1000 ease-out kinetic-shimmer ${animate ? 'w-full' : 'w-0'}`} 
                        style={{ width: animate ? `${percentage}%` : '0%', boxShadow: '0 0 10px rgba(0, 255, 106, 0.3)' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0d0f0e] text-slate-900 dark:text-white p-4 md:p-10 font-sans selection:bg-emerald-500 dark:selection:bg-[#00ff6a] selection:text-white dark:selection:text-black min-h-full transition-colors">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
                <div className="w-full md:w-auto">
                    <div className="flex items-center justify-between md:justify-start gap-3">
                        <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tighter uppercase text-slate-900 dark:text-white">{user?.username || 'AKASH'}</h1>
                        <span className="bg-emerald-500/10 dark:bg-[#00ff6a]/10 text-emerald-600 dark:text-[#00ff6a] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 dark:border-[#00ff6a]/20 whitespace-nowrap">PREMIUM TIER</span>
                    </div>
                    <p className="text-slate-500 dark:text-[#6b7280] text-xs md:text-sm mt-1">{user?.email || 'akash.athlete@kinetic.io'}</p>
                </div>
                <div className="flex w-full md:w-auto gap-2 md:gap-3">
                    {onEdit && (
                        <button 
                            onClick={onEdit}
                            className="flex-1 md:flex-none px-4 md:px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Edit Data
                        </button>
                    )}
                    <button className="flex-1 md:flex-none px-4 md:px-5 py-2.5 rounded-full bg-emerald-500 dark:bg-[#00ff6a] text-white dark:text-black text-[10px] md:text-xs font-extrabold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 dark:shadow-none">
                        <RefreshCw size={14} /> Sync Watch
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
                <div className="lg:col-span-12 xl:col-span-7 bg-white dark:bg-[#141716] p-5 md:p-8 rounded-[12px] border border-slate-200 dark:border-white/5 relative overflow-hidden group flex flex-col transition-colors">
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xs md:text-sm font-black font-heading tracking-[0.2em] text-slate-800 dark:text-white">DAILY FUEL ANALYSIS</h2>
                                <span className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#6b7280] text-[8px] md:text-[9px] px-1.5 py-0.5 rounded font-bold">LAST 24H</span>
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
                            <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-slate-500 dark:text-[#6b7280]">
                                <span className="bg-emerald-500/10 dark:bg-[#00ff6a]/10 text-emerald-600 dark:text-[#00ff6a] px-1 rounded font-bold">112%</span> vs daily baseline ({user?.dailyCalorieBurn || 580} kcal)
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Diet Plan */}
                <div className="lg:col-span-12 xl:col-span-5 bg-white dark:bg-[#141716] p-5 md:p-8 rounded-[12px] border border-slate-200 dark:border-white/5 flex flex-col justify-between relative transition-colors">
                    <div className="absolute top-5 md:top-8 right-5 md:right-8 text-emerald-500 dark:text-[#00ff6a]">
                        <Zap size={20} className="animate-pulse" />
                    </div>
                    
                    <div>
                        <h2 className="text-lg md:text-xl font-black font-heading tracking-tight mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                            AI DIET PLAN 2.0
                        </h2>
                        <p className="text-slate-600 dark:text-[#6b7280] text-xs md:text-sm leading-relaxed mb-6">
                            Optimized macros for <span className="text-slate-900 dark:text-white capitalize font-semibold">{user?.goal?.replace('-', ' ') || 'maintenance'} phase</span>. 
                            Protein intake focused on 1.8g/kg. Carb timing suggested post-weighted sessions for maximum glycogen restoration.
                        </p>
                    </div>

                    <button className="w-full py-3 md:py-4 mt-auto bg-slate-50 dark:bg-black/40 hover:bg-slate-100 dark:hover:bg-black/60 text-slate-800 dark:text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-lg border border-slate-200 dark:border-white/5 transition-all">
                        View Personalized Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KineticNoir;
