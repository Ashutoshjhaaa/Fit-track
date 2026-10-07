import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { ActivityIcon, HomeIcon, LogOutIcon, MoonIcon, SunIcon, UtensilsIcon, UserIcon, ArrowLeftIcon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useAppContext } from "../context/AppContext"

const navItems = [
  { to: "/", icon: HomeIcon, label: "Dashboard" },
  { to: "/food", icon: UtensilsIcon, label: "Food" },
  { to: "/activity", icon: ActivityIcon, label: "Activity" },
  { to: "/profile", icon: UserIcon, label: "Profile" },
]

const Layout = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAppContext()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/welcome");
  }

  return (
    <div className="layout-container bg-[#15161D] text-white min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-[#1C1D26] p-6 justify-between transition-colors duration-200 select-none">
        <div>
          {/* Fitbod Brand Logo */}
          <div 
            className="flex items-center gap-3 mb-10 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F2305A] to-[#FF6B8B] flex items-center justify-center shadow-lg shadow-[#F2305A]/30 group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L18 4L14 20L2 20L6 4Z" fill="white" />
                <path d="M12 4L22 4L18 20L8 20L12 4Z" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black text-white uppercase italic tracking-wider">
                Fit<span className="text-[#F2305A]">Track</span>
              </h1>
              <span className="text-[9px] font-bold text-[#8E8EA0] uppercase tracking-widest -mt-1">
                Workout Planner
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#F2305A] text-white shadow-lg shadow-[#F2305A]/30"
                      : "text-[#8E8EA0] hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-2 border-t border-white/10 pt-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-[#8E8EA0] hover:bg-white/5 hover:text-white transition-all duration-200 w-full cursor-pointer uppercase tracking-wider"
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-[#F2305A] hover:bg-[#F2305A]/10 transition-all duration-200 w-full cursor-pointer uppercase tracking-wider"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:overflow-y-auto pb-20 lg:pb-0 bg-[#15161D]">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-[#1C1D26] border-b border-white/10 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center text-[#8E8EA0] hover:text-white"
              title="Go Back"
              type="button"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F2305A] to-[#FF6B8B] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L18 4L14 20L2 20L6 4Z" fill="white" />
                  <path d="M12 4L22 4L18 20L8 20L12 4Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="font-black italic text-white uppercase tracking-wider text-sm">Fit<span className="text-[#F2305A]">Track</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/5 text-[#8E8EA0] hover:text-white transition-colors cursor-pointer">
              {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1C1D26]/95 backdrop-blur-md border-t border-white/10 px-2 pb-[env(safe-area-inset-bottom)] transition-colors duration-200 z-[100]">
        <div className="flex justify-around items-center py-2 h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
            >
              {({ isActive }) => (
                <div className={`flex flex-col items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-[#F2305A] scale-105 font-black"
                    : "text-[#8E8EA0] scale-100"
                }`}>
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="flex flex-col items-center justify-center gap-1.5 px-3 py-1.5 text-[#8E8EA0] hover:text-[#F2305A] text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            <LogOutIcon className="w-5 h-5 stroke-[2px]" />
            <span>Out</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Layout
