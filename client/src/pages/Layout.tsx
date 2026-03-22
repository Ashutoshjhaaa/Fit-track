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
    // Navigate to the welcome page without logging out
    navigate("/welcome");
  }

  return (
    <div className="layout-container">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 justify-between transition-colors duration-200">
        <div>
          {/* Logo */}
          <div 
            className="flex items-center gap-3 mb-10 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center pointer-events-none">
              <ActivityIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white pointer-events-none">FitTrack</h1>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 w-full cursor-pointer"
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full cursor-pointer"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:overflow-y-auto pb-20 lg:pb-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                console.log("Back button triggered");
                navigate(-1);
              }}
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center lg:hidden"
              title="Go Back"
              type="button"
            >
              <ArrowLeftIcon className="w-6 h-6 text-slate-600 dark:text-slate-300 pointer-events-none" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center pointer-events-none">
                <ActivityIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 dark:text-white pointer-events-none">FitTrack</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              {theme === "dark" ? <SunIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" /> : <MoonIcon className="w-5 h-5 text-slate-500" />}
            </button>
          </div>
        </div>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-2 pb-[env(safe-area-inset-bottom)] transition-colors duration-200 z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
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
                    ? "text-emerald-500 dark:text-emerald-400 scale-110"
                    : "text-slate-400 dark:text-slate-600 scale-100"
                }`}>
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="flex flex-col items-center justify-center gap-1.5 px-3 py-1.5 text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
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
