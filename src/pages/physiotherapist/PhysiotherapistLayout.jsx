import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Activity, LayoutDashboard, UsersRound, CalendarDays, ClipboardList,
  Dumbbell, MessageCircle, UserRound, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import { getStoredUser } from "./physioApi";

const navItems = [
  { to: "/physiotherapist/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/physiotherapist/patients", label: "My patients", icon: UsersRound },
  { to: "/physiotherapist/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/physiotherapist/recovery-plans", label: "Recovery plans", icon: ClipboardList },
  { to: "/physiotherapist/exercises", label: "Exercise library", icon: Dumbbell },
  { to: "/physiotherapist/messages", label: "Messages", icon: MessageCircle },
  { to: "/physiotherapist/profile", label: "My profile", icon: UserRound },
];

export default function PhysiotherapistLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = (user?.name || "Physio").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  function signOut() {
    localStorage.removeItem("rehabics_token"); localStorage.removeItem("rehabics_user");
    sessionStorage.removeItem("rehabics_token"); sessionStorage.removeItem("rehabics_user");
    navigate("/login", { replace: true });
  }

  return (
    <div className="rp-shell">
      {mobileOpen && <button className="rp-mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`rp-sidebar ${mobileOpen ? "rp-sidebar-open" : ""}`}>
        <div className="rp-brand"><span className="rp-brand-mark"><Activity size={22} /></span><span><strong>rehabics</strong><small>PHYSIO PORTAL</small></span><button className="rp-icon-button rp-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <div className="rp-sidebar-label">WORKSPACE</div>
        <nav className="rp-nav" aria-label="Physiotherapist navigation">
          {navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `rp-nav-link ${isActive ? "active" : ""}`}><Icon size={18} /><span>{label}</span><ChevronRight className="rp-nav-chevron" size={15} /></NavLink>)}
        </nav>
        <div className="rp-sidebar-bottom"><div className="rp-care-note"><span className="rp-care-dot" /><div><strong>Care in progress</strong><small>Every step matters</small></div></div><button className="rp-signout" onClick={signOut}><LogOut size={17} /><span>Sign out</span></button></div>
      </aside>
      <div className="rp-main-column">
        <header className="rp-topbar"><button className="rp-icon-button rp-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="rp-topbar-context"><span>PHYSIOTHERAPIST WORKSPACE</span><strong>Care management</strong></div><div className="rp-topbar-user"><div className="rp-avatar">{initials}</div><div><strong>{user?.name || "Physiotherapist"}</strong><small>{user?.specialization || "Physiotherapist"}</small></div></div></header>
        <div className="rp-page-wrap"><Outlet /></div>
        <footer className="rp-footer"><span>Rehabics care workspace</span><span>Built around better recovery</span></footer>
      </div>
    </div>
  );
}
