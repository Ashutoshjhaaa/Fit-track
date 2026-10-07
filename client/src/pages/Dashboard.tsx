import { useEffect } from "react"
import { Flame, TrendingUp, Utensils, Activity, ArrowRight } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Card from "../components/ui/Card"
import ProgressBar from "../components/ui/ProgressBar"
import CaloriesChart from "../components/CaloriesChart"
import { getMotivationalMessage } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user, allFoodLogs, allActivityLogs, fetchFoodLogs, fetchActivityLogs } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchFoodLogs()
    fetchActivityLogs()
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const todayFoodLogs = allFoodLogs.filter((log) => log.date === today || log.createdAt?.split("T")[0] === today)
  const todayActivityLogs = allActivityLogs.filter((log) => log.date === today || log.createdAt?.split("T")[0] === today)

  const caloriesConsumed = todayFoodLogs.reduce((sum, item) => sum + item.calories, 0)
  const caloriesBurned = todayActivityLogs.reduce((sum, item) => sum + (item.calories || 0), 0)
  const activeMinutes = todayActivityLogs.reduce((sum, item) => sum + (item.duration || 0), 0)
  const DAILY_CALORIE_LIMIT = user?.dailyCalorieIntake || 2200
  const DAILY_BURN_GOAL = user?.dailyCalorieBurn || 400
  const netCalories = caloriesConsumed - caloriesBurned
  const motivational = getMotivationalMessage(caloriesConsumed, activeMinutes, DAILY_CALORIE_LIMIT)

  return (
    <div className="page-container bg-[#15161D] text-white">
      
      {/* ── FITBOD STEALTH HERO HEADER ── */}
      <div className="dashboard-header border-b border-white/10 bg-gradient-to-r from-[#1C1D26] via-[#21222A] to-[#15161D] relative overflow-hidden">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-l from-[#F2305A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8E8EA0] block mb-1">
              Welcome back
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white flex items-center gap-2 font-roobert">
              {user?.username || "Athlete"} <span className="text-2xl not-italic">👋</span>
            </h1>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#A5A5B5]">
              <span className="text-sm">{motivational.emoji}</span>
              <span>{motivational.text}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/food")}
              className="px-4 py-2.5 rounded-xl bg-[#21222A] border border-white/10 hover:border-white/25 text-xs font-bold text-white uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Utensils className="w-3.5 h-3.5 text-[#F2305A]" />
              Log Meal
            </button>
            <button
              onClick={() => navigate("/activity")}
              className="px-4 py-2.5 rounded-xl bg-[#F2305A] hover:bg-[#ff3b68] text-xs font-black italic uppercase tracking-wider text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F2305A]/30"
            >
              <Flame className="w-3.5 h-3.5 fill-white" />
              Log Workout
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS & CHARTS GRID ── */}
      <div className="dashboard-grid">
        
        {/* 4 Calorie & Metric Cards */}
        <div className="dashboard-card-grid">
          
          {/* Card 1: Consumed */}
          <Card className="p-5 border border-white/10 hover:border-[#F2305A]/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8EA0]">
                Consumed
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F2305A]/15 border border-[#F2305A]/30 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-[#F2305A]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black italic text-white font-roobert">{caloriesConsumed}</span>
              <span className="text-xs text-[#8E8EA0] font-medium">/ {DAILY_CALORIE_LIMIT} kcal</span>
            </div>
            <ProgressBar value={caloriesConsumed} max={DAILY_CALORIE_LIMIT} className="mt-4" />
          </Card>

          {/* Card 2: Burned */}
          <Card className="p-5 border border-white/10 hover:border-[#FF8552]/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8EA0]">
                Burned
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#FF8552]/15 border border-[#FF8552]/30 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#FF8552]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black italic text-white font-roobert">{caloriesBurned}</span>
              <span className="text-xs text-[#8E8EA0] font-medium">/ {DAILY_BURN_GOAL} kcal</span>
            </div>
            <ProgressBar value={caloriesBurned} max={DAILY_BURN_GOAL} className="mt-4" />
          </Card>

          {/* Card 3: Net Calories */}
          <Card className="p-5 border border-white/10 hover:border-[#38BDF8]/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8EA0]">
                Net Cal
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-black italic font-roobert ${netCalories > DAILY_CALORIE_LIMIT ? "text-[#F2305A]" : "text-white"}`}>
                {netCalories}
              </span>
              <span className="text-xs text-[#8E8EA0] font-medium">intake - burn</span>
            </div>
            <p className="text-[10px] font-bold text-[#8E8EA0] uppercase tracking-wider mt-4">
              Daily Target Status
            </p>
          </Card>

          {/* Card 4: Active Minutes */}
          <Card className="p-5 border border-white/10 hover:border-[#A855F7]/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8EA0]">
                Active Time
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#A855F7]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black italic text-white font-roobert">{activeMinutes}</span>
              <span className="text-xs text-[#8E8EA0] font-medium">minutes today</span>
            </div>
            <p className="text-[10px] font-bold text-[#8E8EA0] uppercase tracking-wider mt-4">
              Intensity Logged
            </p>
          </Card>
        </div>

        {/* ── WEEKLY OVERVIEW CHART ── */}
        <Card className="chart-card p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-roobert font-black text-lg text-white uppercase italic tracking-wide">
                Weekly Overview
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-0.5">
                Calorie intake vs burn over the last 7 days
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2305A]" />
              <span className="text-xs text-[#8E8EA0] font-bold">Intake</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8552] ml-2" />
              <span className="text-xs text-[#8E8EA0] font-bold">Burn</span>
            </div>
          </div>
          <CaloriesChart />
        </Card>

        {/* ── TODAY'S MEALS ── */}
        <Card className="meals-card p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-roobert font-black text-base text-white uppercase italic tracking-wide">
              Today's Meals
            </h3>
            <button 
              onClick={() => navigate("/food")} 
              className="text-[#F2305A] text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {todayFoodLogs.length === 0 ? (
            <div className="text-center py-8 bg-[#181922] rounded-xl border border-white/5">
              <Utensils className="w-6 h-6 text-[#8E8EA0] mx-auto mb-2 opacity-50" />
              <p className="text-xs text-[#8E8EA0]">No meals logged today.</p>
              <button 
                onClick={() => navigate("/food")}
                className="text-xs text-[#F2305A] font-bold hover:underline mt-2 inline-block cursor-pointer"
              >
                + Add your first meal
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {todayFoodLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="food-entry-item">
                  <div>
                    <p className="text-xs font-bold text-white">{log.name}</p>
                    <p className="text-[10px] text-[#8E8EA0] uppercase tracking-wider mt-0.5">{log.mealType}</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#F2305A] bg-[#F2305A]/10 border border-[#F2305A]/20 px-2 py-0.5 rounded-md">
                    {log.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ── TODAY'S ACTIVITIES ── */}
        <Card className="activities-card p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-roobert font-black text-base text-white uppercase italic tracking-wide">
              Today's Activities
            </h3>
            <button 
              onClick={() => navigate("/activity")} 
              className="text-[#FF8552] text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {todayActivityLogs.length === 0 ? (
            <div className="text-center py-8 bg-[#181922] rounded-xl border border-white/5">
              <Flame className="w-6 h-6 text-[#8E8EA0] mx-auto mb-2 opacity-50" />
              <p className="text-xs text-[#8E8EA0]">No activities logged today.</p>
              <button 
                onClick={() => navigate("/activity")}
                className="text-xs text-[#FF8552] font-bold hover:underline mt-2 inline-block cursor-pointer"
              >
                + Log an activity
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {todayActivityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="activity-entry-item">
                  <div>
                    <p className="text-xs font-bold text-white">{log.name}</p>
                    <p className="text-[10px] text-[#8E8EA0] uppercase tracking-wider mt-0.5">{log.duration} min</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF8552] bg-[#FF8552]/10 border border-[#FF8552]/20 px-2 py-0.5 rounded-md">
                    {log.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>
    </div>
  )
}

export default Dashboard
