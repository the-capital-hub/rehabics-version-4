import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Clock3,
  Dumbbell, HeartPulse, Home, LogOut, Menu, MessageCircle, Plus, ShieldCheck,
  Sparkles, Stethoscope, Target, TrendingUp, UserRound, X,
} from "lucide-react";
import {
  clearPatientSession, getPatientToken, getStoredPatient, patientLogin,
  patientRegister, patientRequest,
} from "../../services/patientApi";
import "./PatientPanel.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "exercises", label: "My exercises", icon: Dumbbell },
  { id: "recovery", label: "Recovery progress", icon: TrendingUp },
  { id: "care", label: "Care plan", icon: ClipboardList },
];

const safeDate = (value, options = { month: "short", day: "numeric", year: "numeric" }) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", options);
};
const fullName = (person) => [person?.firstName, person?.lastName].filter(Boolean).join(" ") || "Patient";
const getErrorMessage = (error) => error?.message || "We could not complete that request. Please try again.";

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      if (mode === "register") {
        const result = await patientRegister(form);
        setNotice(result.message || "Account created. You can now sign in.");
        setMode("login");
      } else {
        const user = await patientLogin(form.email, form.password);
        onLogin(user);
      }
    } catch (err) { setError(getErrorMessage(err)); }
    finally { setBusy(false); }
  };

  return (
    <main className="pp-auth-page">
      <section className="pp-auth-aside">
        <Link to="/" className="pp-brand"><span className="pp-brand-mark"><HeartPulse size={22} /></span><span>Physio<span className="pp-brand-light">Care</span></span></Link>
        <div className="pp-auth-copy">
          <span className="pp-eyebrow"><Sparkles size={14} /> YOUR RECOVERY SPACE</span>
          <h1>Small steps.<br /><em>Stronger you.</em></h1>
          <p>Keep your appointments, home exercises and recovery progress in one calm, supportive space.</p>
          <div className="pp-auth-proof"><span className="pp-proof-icon"><ShieldCheck size={19} /></span><span><strong>Your care, kept personal</strong><small>Sign in to view your own recovery information.</small></span></div>
        </div>
        <div className="pp-aside-foot">A little progress, every day.</div>
      </section>
      <section className="pp-auth-main">
        <Link to="/" className="pp-back-home"><ArrowDownRight size={15} /> Back to website</Link>
        <div className="pp-auth-card">
          <div className="pp-auth-heading"><span className="pp-auth-symbol"><UserRound size={21} /></span><h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2><p>{mode === "login" ? "Sign in to continue your recovery journey." : "Set up your patient account to get started."}</p></div>
          <div className="pp-auth-switch"><button className={mode === "login" ? "active" : ""} type="button" onClick={() => { setMode("login"); setError(""); }}>Sign in</button><button className={mode === "register" ? "active" : ""} type="button" onClick={() => { setMode("register"); setError(""); }}>Create account</button></div>
          <form className="pp-auth-form" onSubmit={submit}>
            {mode === "register" && <div className="pp-form-row"><label>First name<input name="firstName" autoComplete="given-name" value={form.firstName} onChange={update} required /></label><label>Last name<input name="lastName" autoComplete="family-name" value={form.lastName} onChange={update} required /></label></div>}
            <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update} required /></label>
            <label>Password<input type="password" name="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 6 characters" minLength={6} value={form.password} onChange={update} required /></label>
            {error && <div className="pp-alert pp-alert-error" role="alert">{error}</div>}
            {notice && <div className="pp-alert pp-alert-success" role="status">{notice}</div>}
            <button className="pp-button pp-button-primary pp-submit" disabled={busy} type="submit">{busy ? "Please wait…" : mode === "login" ? "Sign in to portal" : "Create patient account"}<ArrowRight size={17} /></button>
          </form>
          <p className="pp-auth-privacy"><ShieldCheck size={14} /> Your health information is for your care team and you.</p>
        </div>
        <p className="pp-auth-help">Need help? <a href="mailto:care@example.com">Contact the care team</a></p>
      </section>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value, note, tone = "blue" }) {
  return <article className={`pp-metric pp-tone-${tone}`}><span className="pp-metric-icon"><Icon size={19} /></span><span className="pp-metric-label">{label}</span><strong>{value}</strong><small>{note}</small></article>;
}

function EmptyState({ icon: Icon, title, detail, action }) {
  return <div className="pp-empty"><span><Icon size={22} /></span><strong>{title}</strong><p>{detail}</p>{action}</div>;
}

function PatientDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ consultations: [], assignments: [], progress: [], notifications: [], rehabPlan: null, assessment: null });
  const [showBooking, setShowBooking] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);
  const [bookingBusy, setBookingBusy] = useState(false);
  const [checkinBusy, setCheckinBusy] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [booking, setBooking] = useState({ title: "Physiotherapy consultation", date: "", time: "", type: "Video", notes: "" });
  const [checkin, setCheckin] = useState({ pain: "3", movementStatus: "Better", exerciseCompletion: "75", notes: "" });

  const loadData = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true); else setLoading(true);
    setError("");
    const requests = [
      ["consultations", "/consultations/my"], ["assignments", "/exercises/my"],
      ["progress", "/progress/my"], ["notifications", "/notifications"],
      ["rehabPlan", "/rehab-plans/my"], ["assessment", "/assessments/my"],
    ];
    const results = await Promise.allSettled(requests.map(([, path]) => patientRequest(path)));
    const next = { consultations: [], assignments: [], progress: [], notifications: [], rehabPlan: null, assessment: null };
    let failures = 0;
    results.forEach((result, index) => {
      const [key] = requests[index];
      if (result.status === "fulfilled") {
        const payload = result.value;
        if (key === "consultations") next[key] = payload.consultations || [];
        else if (key === "assignments") next[key] = payload.assignments || [];
        else if (key === "progress") next[key] = payload.progress || [];
        else if (key === "notifications") next[key] = payload.notifications || [];
        else next[key] = payload[key] || null;
      } else {
        failures += 1;
        if (result.reason?.message?.toLowerCase().includes("token") || result.reason?.message?.toLowerCase().includes("authorized")) setError("Your session may have expired. Please sign in again.");
      }
    });
    setData(next);
    if (failures === requests.length) setError("We could not reach the patient services. Check that the backend is running and VITE_API_URL is correct.");
    setLoading(false); setRefreshing(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const upcoming = useMemo(() => data.consultations.filter((item) => !["Cancelled", "Completed"].includes(item.status)).sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)), [data.consultations]);
  const latestProgress = data.progress[data.progress.length - 1];
  const unread = data.notifications.filter((item) => !item.read).length;
  const activeExercises = data.assignments.filter((item) => item.status === "Active");
  const displayTab = (id) => { setActiveTab(id); setMobileNav(false); setActionMessage(""); };

  const submitBooking = async (event) => {
    event.preventDefault(); setBookingBusy(true); setActionMessage("");
    try {
      await patientRequest("/consultations", { method: "POST", body: JSON.stringify(booking) });
      setShowBooking(false); setBooking({ title: "Physiotherapy consultation", date: "", time: "", type: "Video", notes: "" });
      setActionMessage("Your appointment request has been sent to the care team."); await loadData(true); setActiveTab("appointments");
    } catch (err) { setActionMessage(getErrorMessage(err)); }
    finally { setBookingBusy(false); }
  };

  const submitCheckin = async (event) => {
    event.preventDefault(); setCheckinBusy(true); setActionMessage("");
    try {
      await patientRequest("/progress/checkin", { method: "POST", body: JSON.stringify({ ...checkin, pain: Number(checkin.pain), exerciseCompletion: Number(checkin.exerciseCompletion) }) });
      setShowCheckin(false); setActionMessage("Your recovery check in has been saved."); await loadData(true); setActiveTab("recovery");
    } catch (err) { setActionMessage(getErrorMessage(err)); }
    finally { setCheckinBusy(false); }
  };

  const markRead = async (id) => {
    try { await patientRequest(`/notifications/${id}/read`, { method: "PATCH", body: JSON.stringify({}) }); await loadData(true); }
    catch (err) { setActionMessage(getErrorMessage(err)); }
  };

  const updateExercise = async (id, status) => {
    try { await patientRequest(`/exercises/assignments/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }); setActionMessage("Exercise status updated."); await loadData(true); }
    catch (err) { setActionMessage(getErrorMessage(err)); }
  };

  if (loading) return <div className="pp-loading"><span className="pp-spinner" /><strong>Preparing your recovery space</strong><p>Loading your care information…</p></div>;

  return (
    <div className="pp-app-shell">
      <aside className={`pp-sidebar ${mobileNav ? "pp-sidebar-open" : ""}`}>
        <Link to="/" className="pp-brand"><span className="pp-brand-mark"><HeartPulse size={22} /></span><span>Physio<span className="pp-brand-light">Care</span></span></Link>
        <div className="pp-sidebar-label">PATIENT SPACE</div>
        <nav className="pp-nav" aria-label="Patient navigation">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => <button key={id} className={`pp-nav-item ${activeTab === id ? "active" : ""}`} onClick={() => displayTab(id)} type="button"><Icon size={18} /><span>{label}</span>{id === "appointments" && upcoming.length > 0 && <small>{upcoming.length}</small>}</button>)}
        </nav>
        <div className="pp-sidebar-support"><span className="pp-support-icon"><CircleHelp size={19} /></span><strong>Need a hand?</strong><p>Your care team is here to help you move forward.</p><a href="mailto:care@example.com">Contact support <ArrowRight size={13} /></a></div>
        <div className="pp-sidebar-bottom"><span className="pp-avatar">{user?.firstName?.[0] || "P"}{user?.lastName?.[0] || ""}</span><span className="pp-user-mini"><strong>{fullName(user)}</strong><small>Patient account</small></span><button className="pp-icon-button" aria-label="Sign out" title="Sign out" onClick={onLogout}><LogOut size={17} /></button></div>
      </aside>

      <div className="pp-main-column">
        <header className="pp-topbar"><div className="pp-topbar-left"><button className="pp-icon-button pp-mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(!mobileNav)}><Menu size={20} /></button><span className="pp-breadcrumb">Patient portal <span>/</span> <strong>{NAV_ITEMS.find((item) => item.id === activeTab)?.label || "Overview"}</strong></span></div><div className="pp-topbar-right"><button className="pp-icon-button pp-notification-button" onClick={() => displayTab("overview")} aria-label={`${unread} unread notifications`}><Bell size={18} />{unread > 0 && <i />}</button><span className="pp-topbar-divider" /><div className="pp-top-user"><span className="pp-avatar pp-avatar-small">{user?.firstName?.[0] || "P"}</span><span><strong>{fullName(user)}</strong><small>My account</small></span><ChevronDown size={14} /></div></div></header>

        <main className="pp-content">
          <div className="pp-page-head"><div><div className="pp-date-line"><span className="pp-live-dot" /> YOUR RECOVERY JOURNEY <span>•</span> {safeDate(new Date(), { weekday: "short", month: "short", day: "numeric" })}</div><h1>{activeTab === "overview" ? <>Good to see you, {user?.firstName || "there"}<span className="pp-wave"> ✨</span></> : NAV_ITEMS.find((item) => item.id === activeTab)?.label}</h1><p>{activeTab === "overview" ? "Every step forward counts. Here is how your recovery is going." : "Your care information, all in one place."}</p></div><button className="pp-button pp-button-primary" onClick={() => setShowBooking(true)}><Plus size={17} /> Book a session</button></div>
          {error && <div className="pp-alert pp-alert-error"><CircleHelp size={17} /> {error} <button onClick={() => loadData(true)} type="button">Try again</button></div>}
          {actionMessage && <div className={`pp-alert ${actionMessage.toLowerCase().includes("could not") || actionMessage.toLowerCase().includes("failed") ? "pp-alert-error" : "pp-alert-success"}`} role="status"><CheckCircle2 size={17} />{actionMessage}<button aria-label="Dismiss message" onClick={() => setActionMessage("")}><X size={15} /></button></div>}

          {activeTab === "overview" && <>
            <section className="pp-welcome-card"><div className="pp-welcome-copy"><span className="pp-welcome-tag"><Sparkles size={13} /> YOUR NEXT STEP</span><h2>Progress is built<br />one day at a time.</h2><p>Stay consistent with your exercises and check in with how your body feels. Your care team is cheering you on.</p><button className="pp-button pp-button-light" onClick={() => setShowCheckin(true)}>Log today's progress <ArrowRight size={16} /></button></div><div className="pp-welcome-art" aria-hidden="true"><div className="pp-art-ring pp-ring-one" /><div className="pp-art-ring pp-ring-two" /><div className="pp-art-person"><Activity size={60} strokeWidth={1.3} /></div><span className="pp-art-pill pp-pill-one"><CheckCircle2 size={15} /> Keep going</span><span className="pp-art-pill pp-pill-two"><HeartPulse size={15} /> Your pace</span></div></section>
            <div className="pp-section-title-row"><div><h2>Your recovery at a glance</h2><p>A snapshot of your care journey</p></div><button className="pp-text-button" onClick={() => loadData(true)} disabled={refreshing}>{refreshing ? "Refreshing…" : "Refresh data"} <ArrowRight size={15} /></button></div>
            <section className="pp-metrics-grid"><MetricCard icon={CalendarDays} label="Upcoming sessions" value={upcoming.length} note={upcoming[0] ? `Next: ${safeDate(upcoming[0].date, { month: "short", day: "numeric" })}` : "No sessions scheduled"} tone="blue" /><MetricCard icon={Dumbbell} label="Active exercises" value={activeExercises.length} note="In your current routine" tone="lavender" /><MetricCard icon={Activity} label="Latest pain score" value={latestProgress ? `${latestProgress.pain}/10` : "—"} note={latestProgress ? safeDate(latestProgress.recordedAt) : "Add your first check in"} tone="peach" /><MetricCard icon={Target} label="Exercise completion" value={latestProgress ? `${latestProgress.exerciseCompletion}%` : "—"} note="From your latest check in" tone="mint" /></section>
            <div className="pp-overview-grid"><section className="pp-panel pp-appointments-panel"><div className="pp-panel-head"><div><h2>Upcoming sessions</h2><p>Plan time for your recovery</p></div><button className="pp-link-button" onClick={() => displayTab("appointments")}>View all <ArrowRight size={14} /></button></div>{upcoming.slice(0, 3).length ? <div className="pp-session-list">{upcoming.slice(0, 3).map((item) => <article className="pp-session-row" key={item._id}><div className="pp-calendar-tile"><strong>{item.date?.slice(8, 10) || "—"}</strong><span>{safeDate(item.date, { month: "short" })}</span></div><div className="pp-session-info"><strong>{item.title || "Physiotherapy consultation"}</strong><span><Clock3 size={13} /> {item.time} <span className="pp-inline-dot">·</span> {item.type || "Video"}</span></div><span className={`pp-status pp-status-${String(item.status).toLowerCase()}`}>{item.status}</span></article>)}</div> : <EmptyState icon={CalendarDays} title="No sessions yet" detail="Book a session when you are ready to connect with your care team." action={<button className="pp-button pp-button-secondary" onClick={() => setShowBooking(true)}>Request a session <Plus size={15} /></button>} />}</section>
              <section className="pp-panel pp-recovery-panel"><div className="pp-panel-head"><div><h2>Recovery progress</h2><p>Your latest self check in</p></div><span className="pp-panel-icon"><TrendingUp size={18} /></span></div>{latestProgress ? <><div className="pp-progress-number"><strong>{latestProgress.exerciseCompletion}%</strong><span>exercise completion</span></div><div className="pp-progress-track"><span style={{ width: `${Math.min(100, Math.max(0, latestProgress.exerciseCompletion || 0))}%` }} /></div><div className="pp-progress-meta"><span><span className="pp-meta-dot pp-dot-blue" /> Pain score</span><strong>{latestProgress.pain}/10</strong></div><div className="pp-progress-meta"><span><span className="pp-meta-dot pp-dot-green" /> Movement</span><strong>{latestProgress.movementStatus || "Same"}</strong></div><p className="pp-last-checkin">Last updated {safeDate(latestProgress.recordedAt)}</p></> : <EmptyState icon={Activity} title="Your story starts here" detail="A quick check in helps you and your care team notice changes over time." action={<button className="pp-button pp-button-secondary" onClick={() => setShowCheckin(true)}>Add check in <Plus size={15} /></button>} />}</section></div>
            <section className="pp-panel pp-notifications-panel"><div className="pp-panel-head"><div><h2>Updates for you</h2><p>Messages from your care journey</p></div><span className="pp-unread-count">{unread} unread</span></div>{data.notifications.slice(0, 3).length ? data.notifications.slice(0, 3).map((item) => <button type="button" className={`pp-notice-row ${item.read ? "is-read" : ""}`} key={item._id} onClick={() => !item.read && markRead(item._id)}><span className="pp-notice-icon"><Bell size={16} /></span><span className="pp-notice-copy"><strong>{item.title}</strong><small>{item.message}</small><em>{safeDate(item.createdAt)}</em></span>{!item.read && <span className="pp-unread-dot" />}</button>) : <p className="pp-quiet-empty">You are all caught up. New care updates will appear here.</p>}</section>
          </>}

          {activeTab === "appointments" && <section className="pp-panel pp-full-panel"><div className="pp-panel-head"><div><h2>Your sessions</h2><p>Requests and confirmed consultations appear here.</p></div><button className="pp-button pp-button-primary" onClick={() => setShowBooking(true)}><Plus size={16} /> Request session</button></div>{data.consultations.length ? <div className="pp-table-wrap"><table className="pp-table"><thead><tr><th>Session</th><th>Date and time</th><th>Format</th><th>Status</th></tr></thead><tbody>{data.consultations.map((item) => <tr key={item._id}><td><strong>{item.title || "Physiotherapy consultation"}</strong><small>{item.careTeam || "Your care team"}</small></td><td>{safeDate(item.date)}<small>{item.time}</small></td><td>{item.type || "Video"}</td><td><span className={`pp-status pp-status-${String(item.status).toLowerCase()}`}>{item.status}</span></td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarDays} title="No appointments found" detail="Request a consultation and your care team will review it." action={<button className="pp-button pp-button-primary" onClick={() => setShowBooking(true)}>Request an appointment <ArrowRight size={15} /></button>} />}</section>}

          {activeTab === "exercises" && <section className="pp-exercise-grid">{data.assignments.length ? data.assignments.map((assignment) => { const exercise = assignment.exercise || {}; return <article className="pp-exercise-card" key={assignment._id}><div className="pp-exercise-top"><span className="pp-exercise-symbol"><Dumbbell size={20} /></span><span className={`pp-status pp-status-${String(assignment.status).toLowerCase()}`}>{assignment.status}</span></div><span className="pp-exercise-category">{exercise.category || "RECOVERY EXERCISE"}</span><h2>{exercise.title || "Assigned exercise"}</h2><p>{exercise.instructions || assignment.instructions || "Follow the instructions shared by your physiotherapist."}</p><div className="pp-exercise-specs"><span><strong>{assignment.sets || exercise.sets || 3}</strong> sets</span><span><strong>{assignment.reps || exercise.reps || 10}</strong> reps</span><span><strong>{assignment.frequency || "Daily"}</strong></span></div>{assignment.status === "Active" ? <button className="pp-button pp-button-secondary pp-exercise-action" onClick={() => updateExercise(assignment._id, "Completed")}><Check size={16} /> Mark complete</button> : <div className="pp-exercise-done"><CheckCircle2 size={16} /> {assignment.status}</div>}</article>; }) : <div className="pp-panel pp-empty-panel"><EmptyState icon={Dumbbell} title="No exercises assigned yet" detail="Your physiotherapist's recommended exercises will show here when they are assigned." /></div>}</section>}

          {activeTab === "recovery" && <div className="pp-recovery-layout"><section className="pp-panel pp-full-panel"><div className="pp-panel-head"><div><h2>Your progress history</h2><p>Each check in helps show how you are feeling over time.</p></div><button className="pp-button pp-button-primary" onClick={() => setShowCheckin(true)}><Plus size={16} /> New check in</button></div>{data.progress.length ? <div className="pp-table-wrap"><table className="pp-table"><thead><tr><th>Date</th><th>Pain score</th><th>Movement</th><th>Exercise completion</th><th>Notes</th></tr></thead><tbody>{[...data.progress].reverse().map((item) => <tr key={item._id}><td>{safeDate(item.recordedAt)}</td><td><span className="pp-pain-score">{item.pain}/10</span></td><td>{item.movementStatus}</td><td><div className="pp-mini-progress"><span style={{ width: `${item.exerciseCompletion}%` }} /></div><small>{item.exerciseCompletion}%</small></td><td>{item.notes || "—"}</td></tr>)}</tbody></table></div> : <EmptyState icon={TrendingUp} title="No progress entries yet" detail="Log your first check in to begin building your recovery timeline." action={<button className="pp-button pp-button-primary" onClick={() => setShowCheckin(true)}>Log progress <ArrowRight size={15} /></button>} />}</section><section className="pp-panel pp-guidance-card"><span className="pp-guidance-icon"><HeartPulse size={20} /></span><h2>Listen to your body</h2><p>Record how you feel honestly. If an exercise causes sharp or unusual pain, stop and contact your care team for advice.</p></section></div>}

          {activeTab === "care" && <section className="pp-panel pp-full-panel pp-care-panel"><div className="pp-panel-head"><div><h2>Your rehabilitation plan</h2><p>Your physiotherapist's plan for your recovery.</p></div><span className="pp-panel-icon"><ClipboardList size={18} /></span></div>{data.rehabPlan ? <><div className="pp-care-summary"><div><span className="pp-care-label">CURRENT PLAN</span><h3>{data.rehabPlan.title}</h3><p>{data.rehabPlan.weeklyFocus || "Follow the exercise routine and guidance shared by your physiotherapist."}</p></div><span className={`pp-status pp-status-${String(data.rehabPlan.status).toLowerCase()}`}>{data.rehabPlan.status}</span></div><div className="pp-care-progress"><div className="pp-care-progress-head"><span>Current phase {data.rehabPlan.currentPhase || 1}</span><strong>{data.rehabPlan.phaseProgress || 0}%</strong></div><div className="pp-progress-track"><span style={{ width: `${Math.min(100, Math.max(0, data.rehabPlan.phaseProgress || 0))}%` }} /></div></div>{data.rehabPlan.phases?.length > 0 && <div className="pp-phase-list">{data.rehabPlan.phases.map((phase) => <article className="pp-phase-row" key={phase.no}><span className={`pp-phase-number ${phase.status === "Completed" ? "done" : ""}`}>{phase.status === "Completed" ? <Check size={15} /> : phase.no}</span><div><strong>{phase.title}</strong><p>{phase.description || "Your physiotherapist will guide you through this phase."}</p></div><span className="pp-phase-status">{phase.status}</span></article>)}</div>}<div className="pp-review-note"><CalendarDays size={17} /><span>Next review</span><strong>{safeDate(data.rehabPlan.nextReviewDate)}</strong></div></> : <EmptyState icon={ClipboardList} title="Your plan is being prepared" detail="When your physiotherapist shares a rehabilitation plan, it will appear here." />}</section>}

          <footer className="pp-footer"><span>© {new Date().getFullYear()} PhysioCare Patient Portal</span><span><ShieldCheck size={13} /> Your recovery information is private</span><a href="mailto:care@example.com">Get help <ArrowUpRight size={13} /></a></footer>
        </main>
      </div>

      {mobileNav && <button className="pp-mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      {showBooking && <div className="pp-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowBooking(false)}><section className="pp-modal" role="dialog" aria-modal="true" aria-labelledby="pp-booking-title"><div className="pp-modal-head"><div><span className="pp-modal-kicker">LET'S GET YOU MOVING</span><h2 id="pp-booking-title">Request a session</h2><p>Your care team will review your request.</p></div><button className="pp-icon-button" aria-label="Close dialog" onClick={() => setShowBooking(false)}><X size={19} /></button></div><form className="pp-modal-form" onSubmit={submitBooking}><label>Session type<input value={booking.title} onChange={(e) => setBooking({ ...booking, title: e.target.value })} required /></label><div className="pp-form-row"><label>Preferred date<input type="date" min={new Date().toISOString().slice(0, 10)} value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} required /></label><label>Preferred time<input type="time" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} required /></label></div><label>Session format<select value={booking.type} onChange={(e) => setBooking({ ...booking, type: e.target.value })}><option>Video</option><option>Phone</option><option>In-person</option></select></label><label>Anything we should know? <span className="pp-optional">Optional</span><textarea rows="3" maxLength={1000} placeholder="Share a concern or a question for your care team…" value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} /></label><div className="pp-modal-note"><ShieldCheck size={16} /> This is a request, not a confirmed booking. The care team will follow up.</div><button className="pp-button pp-button-primary pp-submit" disabled={bookingBusy}>{bookingBusy ? "Sending request…" : "Send appointment request"}<ArrowRight size={16} /></button></form></section></div>}
      {showCheckin && <div className="pp-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowCheckin(false)}><section className="pp-modal" role="dialog" aria-modal="true" aria-labelledby="pp-checkin-title"><div className="pp-modal-head"><div><span className="pp-modal-kicker">A MOMENT FOR YOU</span><h2 id="pp-checkin-title">Today's recovery check in</h2><p>There are no right or wrong answers. Just how you feel today.</p></div><button className="pp-icon-button" aria-label="Close dialog" onClick={() => setShowCheckin(false)}><X size={19} /></button></div><form className="pp-modal-form" onSubmit={submitCheckin}><label>Pain level <strong className="pp-range-value">{checkin.pain} / 10</strong><input type="range" min="0" max="10" value={checkin.pain} onChange={(e) => setCheckin({ ...checkin, pain: e.target.value })} /><div className="pp-range-labels"><span>No pain</span><span>Severe pain</span></div></label><label>How is your movement today?<select value={checkin.movementStatus} onChange={(e) => setCheckin({ ...checkin, movementStatus: e.target.value })}><option>Better</option><option>Same</option><option>Worse</option></select></label><label>How much of your exercise routine did you complete? <strong className="pp-range-value">{checkin.exerciseCompletion}%</strong><input type="range" min="0" max="100" step="5" value={checkin.exerciseCompletion} onChange={(e) => setCheckin({ ...checkin, exerciseCompletion: e.target.value })} /><div className="pp-range-labels"><span>Not yet</span><span>All completed</span></div></label><label>Notes for your care team <span className="pp-optional">Optional</span><textarea rows="3" maxLength={1500} placeholder="How have you been feeling?" value={checkin.notes} onChange={(e) => setCheckin({ ...checkin, notes: e.target.value })} /></label><button className="pp-button pp-button-primary pp-submit" disabled={checkinBusy}>{checkinBusy ? "Saving check in…" : "Save my check in"}<CheckCircle2 size={16} /></button></form></section></div>}
    </div>
  );
}

export default function PatientPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getPatientToken() ? getStoredPatient() : null);
  const [checking, setChecking] = useState(Boolean(getPatientToken()));

  useEffect(() => {
    let active = true;
    if (!getPatientToken()) { setChecking(false); return () => { active = false; }; }
    patientRequest("/users/profile").then((result) => {
      if (!active) return;
      const freshUser = result.user || result.profile || result;
      if (freshUser?.role && freshUser.role !== "patient") throw new Error("This portal is for patient accounts.");
      if (freshUser?.firstName) { localStorage.setItem("physio_patient_user", JSON.stringify(freshUser)); setUser(freshUser); }
    }).catch((err) => {
      if (!active) return;
      if (err.message.toLowerCase().includes("patient accounts") || err.message.toLowerCase().includes("authorized") || err.message.toLowerCase().includes("token")) { clearPatientSession(); setUser(null); }
      // The supplied backend may not expose /users/me. Existing token session remains usable.
      else setUser(getStoredPatient());
    }).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  const logout = () => { clearPatientSession(); setUser(null); navigate("/patient/login"); };
  if (checking) return <div className="pp-loading"><span className="pp-spinner" /><strong>Checking your session</strong></div>;
  if (!user) return <AuthScreen onLogin={setUser} />;
  return <PatientDashboard user={user} onLogout={logout} />;
}
