import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, CalendarDays, Check, Clock3, ClipboardList, Dumbbell, Mail, MessageCircle, Plus, RefreshCw, Search, UsersRound, X } from "lucide-react";
import { physioRequest, sendJson, getStoredUser } from "./physioApi";

const config = {
  dashboard: { eyebrow: "YOUR PRACTICE", title: "Good care starts here", subtitle: "A clear view of your patients, sessions and recovery progress." },
  patients: { eyebrow: "PATIENT CARE", title: "My patients", subtitle: "Review the people currently assigned to your care." },
  appointments: { eyebrow: "SCHEDULE", title: "Appointments", subtitle: "Manage upcoming sessions and update their status." },
  "recovery-plans": { eyebrow: "TREATMENT", title: "Recovery plans", subtitle: "Build and maintain patient recovery plans." },
  exercises: { eyebrow: "MOVEMENT LIBRARY", title: "Exercise library", subtitle: "Manage the exercises you use in recovery plans." },
  messages: { eyebrow: "PATIENT COMMUNICATION", title: "Messages", subtitle: "Keep patient conversations in one place." },
  profile: { eyebrow: "YOUR ACCOUNT", title: "My profile", subtitle: "Review your registered professional details." },
};
const dateText = (value, options = { month: "short", day: "numeric", year: "numeric" }) => value ? new Date(value).toLocaleDateString(undefined, options) : "Not set";
const dateTimeText = (value) => value ? new Date(value).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Not scheduled";
const safe = (value, fallback = "Not specified") => value === undefined || value === null || value === "" ? fallback : value;

function StatCard({ icon: Icon, label, value, note }) {
  return <article className="rp-stat-card"><div className="rp-stat-top"><span className="rp-stat-icon"><Icon size={19} /></span><span className="rp-stat-note">{note}</span></div><strong className="rp-stat-value">{value ?? "…"}</strong><span className="rp-stat-label">{label}</span></article>;
}
function Status({ value }) { const cls = String(value || "pending").toLowerCase().replace(/[^a-z]/g, ""); return <span className={`rp-status rp-status-${cls}`}>{safe(value, "Pending")}</span>; }
function Empty({ title, detail }) { return <div className="rp-empty"><span><Activity size={20} /></span><strong>{title}</strong><p>{detail}</p></div>; }
function Panel({ title, action, children, className = "" }) { return <section className={`rp-panel ${className}`}><div className="rp-panel-heading"><h2>{title}</h2>{action}</div>{children}</section>; }
function Field({ label, children }) { return <label className="rp-field"><span>{label}</span>{children}</label>; }

export default function PhysiotherapistPage({ section }) {
  const [data, setData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const user = getStoredUser();
  const page = config[section] || config.dashboard;

  const load = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true); else setLoading(true);
    setError("");
    try {
      if (section === "dashboard") {
        const [overview, apptData] = await Promise.all([physioRequest("/overview"), physioRequest("/appointments")]);
        setData(overview); setAppointments(apptData.appointments || []);
      } else if (section === "patients") {
        const result = await physioRequest("/patients"); setPatients(result.patients || []);
      } else if (section === "appointments") {
        const result = await physioRequest("/appointments"); setAppointments(result.appointments || []);
        const p = await physioRequest("/patients"); setPatients(p.patients || []);
      } else if (section === "recovery-plans") {
        const [planData, patientData, exerciseData] = await Promise.all([physioRequest("/recovery-plans"), physioRequest("/patients"), physioRequest("/exercises")]);
        setPlans(planData.plans || []); setPatients(patientData.patients || []); setExercises(exerciseData.exercises || []);
      } else if (section === "exercises") {
        const result = await physioRequest("/exercises"); setExercises(result.exercises || []);
      } else if (section === "messages") {
        const [messageData, patientData] = await Promise.all([physioRequest("/messages"), physioRequest("/patients")]);
        setMessages(messageData.messages || []); setPatients(patientData.patients || []);
      } else if (section === "profile") {
        const result = await physioRequest("/profile"); setProfile(result.profile || null);
      }
    } catch (err) { setError(err.message || "Unable to load this section."); }
    finally { setLoading(false); setRefreshing(false); }
  }, [section]);

  useEffect(() => { load(); }, [load]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = section === "patients" ? patients : section === "appointments" ? appointments : section === "recovery-plans" ? plans : section === "exercises" ? exercises : section === "messages" ? messages : [];
    if (!q) return list;
    return list.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
  }, [section, patients, appointments, plans, exercises, messages, search]);

  async function submitAction(event) {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    const fd = new FormData(event.currentTarget); const value = (key) => String(fd.get(key) || "").trim();
    try {
      if (modal === "appointment") {
        await physioRequest("/appointments", sendJson("POST", { patientId: value("patientId"), startsAt: new Date(value("startsAt")).toISOString(), type: value("type"), durationMinutes: Number(value("durationMinutes") || 30), notes: value("notes") }));
      } else if (modal === "plan") {
        await physioRequest("/recovery-plans", sendJson("POST", { patientId: value("patientId"), title: value("title"), clinicalNotes: value("clinicalNotes"), goals: value("goals").split("\n").map(s => s.trim()).filter(Boolean), exercises: value("exerciseNames").split(",").map(s => s.trim()).filter(Boolean), status: "Active", progress: Number(value("progress") || 0), reviewDate: value("reviewDate") || undefined }));
      } else if (modal === "exercise") {
        await physioRequest("/exercises", sendJson("POST", { name: value("name"), category: value("category"), instructions: value("instructions"), durationMinutes: Number(value("durationMinutes") || 10), difficulty: value("difficulty") || "Beginner" }));
      } else if (modal === "message") {
        await physioRequest("/messages", sendJson("POST", { patientId: value("patientId"), text: value("text") }));
      }
      setModal(""); setNotice("Changes saved successfully."); await load(true);
    } catch (err) { setError(err.message || "Unable to save changes."); }
    finally { setSaving(false); }
  }

  async function updateAppointment(id, status) {
    try { await physioRequest(`/appointments/${id}`, sendJson("PATCH", { status })); setNotice("Appointment updated."); await load(true); }
    catch (err) { setError(err.message || "Unable to update appointment."); }
  }
  async function deleteItem(kind, id) {
    const label = kind === "exercise" ? "exercise" : "recovery plan";
    if (!window.confirm(`Remove this ${label}?`)) return;
    try { await physioRequest(kind === "exercise" ? `/exercises/${id}` : `/recovery-plans/${id}`, { method: "DELETE" }); setNotice(`${label === "exercise" ? "Exercise" : "Recovery plan"} removed.`); await load(true); }
    catch (err) { setError(err.message || `Unable to remove ${label}.`); }
  }
  async function markRead(patientId) {
    try { await physioRequest(patientId ? `/messages/${patientId}/read` : "/messages/read", { method: "PATCH" }); await load(true); }
    catch (err) { setError(err.message || "Unable to update messages."); }
  }

  const openButton = (kind, label = "Add new") => <button className="rp-primary-button" onClick={() => setModal(kind)}><Plus size={16} />{label}</button>;
  const searchBar = <label className="rp-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search this list" aria-label="Search this list" /></label>;
  const noPatients = patients.length === 0;

  return <div className="rp-content">
    <div className="rp-page-heading"><div><span className="rp-eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.subtitle}</p></div><button className="rp-refresh-button" onClick={() => load(true)} disabled={refreshing}><RefreshCw size={16} className={refreshing ? "rp-spin" : ""} />Refresh</button></div>
    {error && <div className="rp-alert rp-alert-error" role="alert"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
    {notice && <div className="rp-alert rp-alert-success" role="status"><Check size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}
    {loading ? <div className="rp-loading"><span className="rp-loader" /><strong>Loading your workspace</strong><span>Fetching the latest information from your account.</span></div> : <>
      {section === "dashboard" && <>
        <div className="rp-welcome-strip"><div><span className="rp-welcome-kicker">YOUR DAILY SNAPSHOT</span><h2>Welcome back, {safe(user?.name?.split(" ")[0], "Doctor")}</h2><p>Here is what is happening with your practice today.</p></div><div className="rp-welcome-art"><Activity size={52} strokeWidth={1.3} /><span /></div></div>
        <div className="rp-stat-grid"><StatCard icon={UsersRound} label="Assigned patients" value={data?.stats?.totalPatients ?? 0} note="In your care" /><StatCard icon={CalendarDays} label="Sessions today" value={data?.stats?.todaySessions ?? 0} note="Today's schedule" /><StatCard icon={ClipboardList} label="Active recovery plans" value={data?.stats?.activePlans ?? 0} note="Currently active" /><StatCard icon={MessageCircle} label="Unread messages" value={data?.stats?.unreadMessages ?? 0} note="Awaiting response" /></div>
        <div className="rp-dashboard-grid"><Panel title="Today's appointments" action={<a className="rp-text-link" href="/physiotherapist/appointments">View schedule <ArrowUpRight size={15} /></a>}><AppointmentList items={appointments.filter(a => a.time && new Date(a.time).toDateString() === new Date().toDateString()).slice(0, 5)} /></Panel><Panel title="Recovery progress"><div className="rp-progress-summary"><div className="rp-progress-ring" style={{ "--progress": `${data?.stats?.averageProgress || 0}%` }}><div><strong>{data?.stats?.averageProgress ?? 0}%</strong><small>Average</small></div></div><div><strong>Keep progress moving</strong><p>Review each patient's plan and update progress as they recover.</p><a className="rp-text-link" href="/physiotherapist/recovery-plans">Review plans <ArrowUpRight size={15} /></a></div></div><div className="rp-mini-note"><Activity size={17} /><span>Progress is calculated from the recovery plans assigned to your account.</span></div></Panel></div>
      </>}

      {section === "patients" && <Panel title={`Patient directory · ${patients.length}`}><div className="rp-toolbar">{searchBar}<span className="rp-muted">Patients assigned to your care</span></div>{filtered.length ? <div className="rp-table-wrap"><table className="rp-table"><thead><tr><th>Patient</th><th>Condition</th><th>Recovery plan</th><th>Progress</th><th>Status</th><th>Next review</th></tr></thead><tbody>{filtered.map(p => <tr key={p.id}><td><div className="rp-person-cell"><span className="rp-table-avatar">{(p.name || "P").slice(0,1).toUpperCase()}</span><span><strong>{p.name}</strong><small>{p.email}</small></span></div></td><td>{p.condition}</td><td>{p.plan}</td><td><div className="rp-inline-progress"><span><i style={{ width: `${Math.min(100, Math.max(0, Number(p.progress) || 0))}%` }} /></span><strong>{p.progress || 0}%</strong></div></td><td><Status value={p.status} /></td><td>{dateText(p.nextReview)}</td></tr>)}</tbody></table></div> : <Empty title={search ? "No matching patients" : "No assigned patients yet"} detail={search ? "Try another search term." : "Patients appear here when a recovery plan is assigned to them."} />}</Panel>}

      {section === "appointments" && <Panel title={`Appointments · ${appointments.length}`} action={openButton("appointment", "New appointment")}><div className="rp-toolbar">{searchBar}<span className="rp-muted">Most recent schedule entries</span></div>{filtered.length ? <div className="rp-table-wrap"><table className="rp-table"><thead><tr><th>Patient</th><th>Date and time</th><th>Session</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(a => <tr key={a.id}><td><strong>{a.patient}</strong><small className="rp-cell-sub">{a.patientEmail}</small></td><td>{dateTimeText(a.time)}</td><td>{safe(a.type)}</td><td>{safe(a.durationMinutes, 30)} min</td><td><Status value={a.status} /></td><td><div className="rp-row-actions"><select aria-label={`Update status for ${a.patient}`} value={a.status || "Pending"} onChange={(e) => updateAppointment(a.id, e.target.value)}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></div></td></tr>)}</tbody></table></div> : <Empty title="No appointments found" detail="Create an appointment for one of your patients to get started." />}</Panel>}

      {section === "recovery-plans" && <Panel title={`Recovery plans · ${plans.length}`} action={openButton("plan", "Create plan")}><div className="rp-toolbar">{searchBar}<span className="rp-muted">Care plans for your patients</span></div>{filtered.length ? <div className="rp-plan-grid">{filtered.map(p => <article className="rp-plan-card" key={p.id}><div className="rp-plan-card-top"><span className="rp-plan-icon"><ClipboardList size={19} /></span><Status value={p.status} /></div><h3>{p.title}</h3><p className="rp-plan-patient">For {p.patient}</p><div className="rp-inline-progress rp-plan-progress"><span><i style={{ width: `${Math.min(100, Math.max(0, Number(p.progress) || 0))}%` }} /></span><strong>{p.progress || 0}%</strong></div>{p.goals?.length > 0 && <div className="rp-goals"><strong>Goals</strong>{p.goals.slice(0,3).map((g,i) => <span key={`${g}-${i}`}><Check size={13} />{typeof g === "string" ? g : JSON.stringify(g)}</span>)}</div>}<div className="rp-plan-meta"><span>Review {dateText(p.reviewDate)}</span><button className="rp-danger-link" onClick={() => deleteItem("plan", p.id)}>Remove</button></div></article>)}</div> : <Empty title="No recovery plans yet" detail="Create a plan for an assigned patient to begin tracking recovery." />}</Panel>}

      {section === "exercises" && <Panel title={`Exercise library · ${exercises.length}`} action={openButton("exercise", "Add exercise")}><div className="rp-toolbar">{searchBar}<span className="rp-muted">Your active exercises</span></div>{filtered.length ? <div className="rp-exercise-grid">{filtered.map(ex => <article className="rp-exercise-card" key={ex._id || ex.id}><span className="rp-exercise-icon"><Dumbbell size={19} /></span><div className="rp-exercise-topline"><Status value={ex.difficulty || "Beginner"} /></div><h3>{ex.name}</h3><p>{ex.category}</p><div className="rp-exercise-foot"><span><Clock3 size={14} />{ex.durationMinutes || 10} minutes</span><button className="rp-danger-link" onClick={() => deleteItem("exercise", ex._id || ex.id)}>Remove</button></div>{ex.instructions && <details><summary>View instructions</summary><p>{ex.instructions}</p></details>}</article>)}</div> : <Empty title="Your exercise library is empty" detail="Add exercises you use in your patients' recovery routines." />}</Panel>}

      {section === "messages" && <Panel title={`Patient messages · ${messages.length}`} action={openButton("message", "New message")}><div className="rp-toolbar">{searchBar}<button className="rp-secondary-button" onClick={() => markRead()}><Check size={15} />Mark all read</button></div>{filtered.length ? <div className="rp-message-list">{filtered.map(m => <article className={`rp-message-row ${m.unread ? "unread" : ""}`} key={m.id}><span className="rp-table-avatar"><MessageCircle size={17} /></span><div className="rp-message-main"><div className="rp-message-head"><strong>{m.patient}</strong><span>{dateTimeText(m.createdAt)}</span></div><p>{m.text}</p><div className="rp-message-meta"><span>{m.senderRole === "patient" ? "Patient message" : "You sent this"}</span>{m.unread && <span className="rp-unread-dot">Unread</span>}</div></div>{m.unread && <button className="rp-secondary-button rp-mark-read" onClick={() => markRead(m.patientId)}>Mark read</button>}</article>)}</div> : <Empty title="No messages yet" detail="Messages from your assigned patients will appear here." />}</Panel>}

      {section === "profile" && <div className="rp-profile-grid"><Panel title="Professional details"><div className="rp-profile-hero"><span className="rp-profile-avatar">{(profile?.name || user?.name || "P").slice(0,1).toUpperCase()}</span><div><h2>{safe(profile?.name, user?.name || "Physiotherapist")}</h2><p>{safe(profile?.specialization, "Physiotherapist")}</p><Status value="Active account" /></div></div><div className="rp-profile-details"><ProfileField icon={UsersRound} label="Full name" value={profile?.name} /><ProfileField icon={Mail} label="Email address" value={profile?.email} /><ProfileField icon={Activity} label="Specialization" value={profile?.specialization} /><ProfileField icon={CalendarDays} label="Member since" value={dateText(profile?.createdAt)} /></div></Panel><Panel title="Account access"><div className="rp-account-note"><span><Activity size={19} /></span><div><strong>Protected professional workspace</strong><p>Your dashboard and patient data are available only when you sign in with a physiotherapist account.</p></div></div><div className="rp-account-note"><span><Check size={19} /></span><div><strong>Secure API access</strong><p>Requests use your current Rehabics sign in token and are verified by the backend.</p></div></div></Panel></div>}
    </>}

    {modal && <div className="rp-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(""); }}><section className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-modal-title"><div className="rp-modal-heading"><div><span className="rp-eyebrow">WORKSPACE ACTION</span><h2 id="rp-modal-title">{modal === "appointment" ? "Create appointment" : modal === "plan" ? "Create recovery plan" : modal === "exercise" ? "Add exercise" : "Send patient message"}</h2></div><button className="rp-icon-button" onClick={() => setModal("")} aria-label="Close dialog"><X size={19} /></button></div><form className="rp-modal-form" onSubmit={submitAction}>
      {(modal === "appointment" || modal === "plan" || modal === "message") && <Field label="Patient"><select name="patientId" required defaultValue=""><option value="" disabled>Select a patient</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name} · {p.email}</option>)}</select>{noPatients && <small>Patients must have an assigned recovery plan before they can be selected.</small>}</Field>}
      {modal === "appointment" && <><Field label="Date and time"><input name="startsAt" type="datetime-local" required /></Field><div className="rp-form-row"><Field label="Session type"><input name="type" placeholder="Review session" required /></Field><Field label="Duration in minutes"><input name="durationMinutes" type="number" min="5" max="240" defaultValue="30" required /></Field></div><Field label="Notes"><textarea name="notes" rows="3" placeholder="Session notes" /></Field></>}
      {modal === "plan" && <><Field label="Plan title"><input name="title" placeholder="Shoulder mobility recovery" required /></Field><Field label="Clinical notes"><textarea name="clinicalNotes" rows="3" placeholder="Relevant clinical notes" /></Field><Field label="Recovery goals"><textarea name="goals" rows="3" placeholder="One goal per line" /></Field><Field label="Exercise names"><input name="exerciseNames" placeholder="Stretching, mobility work" /><small>Separate exercise names with commas.</small></Field><div className="rp-form-row"><Field label="Progress percentage"><input name="progress" type="number" min="0" max="100" defaultValue="0" /></Field><Field label="Review date"><input name="reviewDate" type="date" /></Field></div></>}
      {modal === "exercise" && <><Field label="Exercise name"><input name="name" placeholder="Shoulder rotation" required /></Field><Field label="Category"><input name="category" placeholder="Mobility" required /></Field><Field label="Instructions"><textarea name="instructions" rows="3" placeholder="How to perform the exercise" /></Field><div className="rp-form-row"><Field label="Duration in minutes"><input name="durationMinutes" type="number" min="1" max="240" defaultValue="10" /></Field><Field label="Difficulty"><select name="difficulty" defaultValue="Beginner"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field></div></>}
      {modal === "message" && <Field label="Message"><textarea name="text" rows="5" placeholder="Write your message to the patient" required /></Field>}
      {error && <div className="rp-alert rp-alert-error" role="alert">{error}</div>}<div className="rp-modal-actions"><button type="button" className="rp-secondary-button" onClick={() => setModal("")}>Cancel</button><button type="submit" className="rp-primary-button" disabled={saving || noPatients && ["appointment", "plan", "message"].includes(modal)}>{saving ? "Saving…" : modal === "message" ? "Send message" : "Save changes"}</button></div>
    </form></section></div>}
  </div>;
}

function AppointmentList({ items }) {
  if (!items.length) return <Empty title="No sessions scheduled today" detail="Your appointments for today will appear here." />;
  return <div className="rp-appointment-list">{items.map(a => <div className="rp-appointment-item" key={a.id}><span className="rp-appointment-date"><CalendarDays size={17} /></span><div className="rp-appointment-info"><strong>{a.patient}</strong><span>{dateTimeText(a.time)} · {safe(a.type, "Session")}</span></div><Status value={a.status} /></div>)}</div>;
}
function ProfileField({ icon: Icon, label, value }) { return <div className="rp-profile-field"><span className="rp-profile-field-icon"><Icon size={17} /></span><div><small>{label}</small><strong>{safe(value)}</strong></div></div>; }
