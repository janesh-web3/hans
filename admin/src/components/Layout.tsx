import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, Settings2, CalendarDays, LogOut, Inbox, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/hotels", label: "Hotels", icon: Building2 },
  { to: "/content", label: "Site Content", icon: Settings2 },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/security", label: "Security", icon: Shield },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-surface-100 dark:bg-dark-950">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white dark:bg-dark-900 border-r border-surface-200 dark:border-dark-800 flex flex-col">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-surface-200 dark:border-dark-800">
          <img src="/logo.png" alt="HAN Sudurpashchim" className="h-8 w-auto object-contain" />
          <div>
            <p className="font-bold text-surface-900 dark:text-white text-sm leading-none">HAN Admin</p>
            <p className="text-[11px] text-surface-500 dark:text-dark-400 mt-0.5">Sudurpashchim</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-700 text-white"
                    : "text-surface-600 dark:text-dark-300 hover:bg-surface-100 dark:hover:bg-dark-800"
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-surface-200 dark:border-dark-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 dark:text-dark-300 hover:bg-surface-100 dark:hover:bg-dark-800 transition-colors"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-dark-900 border-b border-surface-200 dark:border-dark-800">
          <h1 className="font-semibold text-surface-900 dark:text-white text-sm">Admin Dashboard</h1>
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-surface-900 dark:text-white leading-none">{user.name}</p>
                <p className="text-[11px] text-surface-500 dark:text-dark-400 mt-0.5 capitalize">{user.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
