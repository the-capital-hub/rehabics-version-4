import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { getStoredUser } from "./adminApi";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  { to: "/admin/users", label: "User management", icon: Users },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/billing", label: "Billing records", icon: CreditCard },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = getStoredUser();
  const logout = () => {
    ["rehabics_token", "rehabics_user", "token", "user"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    navigate("/login", { replace: true });
  };
  return (
    <div className="rv4-admin-shell">
      {mobileOpen && (
        <button
          className="rv4-admin-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`rv4-admin-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="rv4-admin-brand">
          <span className="rv4-admin-brand-mark">
            <Activity size={23} />
          </span>
          <span>
            <strong>REHABICS</strong>
            <small>ADMIN CONSOLE</small>
          </span>
          <button
            className="rv4-admin-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>
        <div className="rv4-admin-workspace">
          <span className="rv4-admin-workspace-icon">
            <ShieldCheck size={17} />
          </span>
          <span>
            <b>Platform control</b>
            <small>V4 management</small>
          </span>
        </div>
        <div className="rv4-admin-nav-label">WORKSPACE</div>
        <nav className="rv4-admin-nav" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rv4-admin-nav-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.to === "/admin/dashboard" && (
                  <ChevronRight className="rv4-admin-nav-chevron" size={15} />
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="rv4-admin-sidebar-bottom">
          <div className="rv4-admin-secure">
            <span className="rv4-admin-secure-dot" />
            <span>
              <b>Secure session</b>
              <small>Administrator access</small>
            </span>
          </div>
          <button className="rv4-admin-logout" onClick={logout}>
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>
      <div className="rv4-admin-main-wrap">
        <header className="rv4-admin-topbar">
          <button
            className="rv4-admin-menu-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="rv4-admin-breadcrumb">
            <span>Rehabics</span>
            <ChevronRight size={14} />
            <strong>Admin workspace</strong>
          </div>
          <div className="rv4-admin-top-user">
            <span className="rv4-admin-avatar">
              {(user?.name || "A").trim().charAt(0).toUpperCase()}
            </span>
            <span>
              <b>{user?.name || "Administrator"}</b>
              <small>Administrator</small>
            </span>
          </div>
        </header>
        <main className="rv4-admin-content">
          <Outlet />
        </main>
        <footer className="rv4-admin-footer">
          Rehabics V4 <span>•</span> Platform administration
        </footer>
      </div>
    </div>
  );
}
