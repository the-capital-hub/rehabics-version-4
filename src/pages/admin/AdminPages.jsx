import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Users,
  Stethoscope,
  CalendarDays,
  CreditCard,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock3,
  ArrowUpRight,
  UserRound,
  ChevronDown,
  WalletCards,
} from "lucide-react";
import {
  adminRequest,
  unwrapList,
  normalizeStatus,
  dateLabel,
} from "./adminApi";

function PageHeader({ eyebrow, title, description, onRefresh, busy }) {
  return (
    <div className="rv4-admin-page-head">
      <div>
        <div className="rv4-admin-eyebrow">
          <span />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <button
        className="rv4-admin-button rv4-admin-button-secondary"
        onClick={onRefresh}
        disabled={busy}
      >
        <RefreshCw size={16} className={busy ? "rv4-spin" : ""} /> Refresh
      </button>
    </div>
  );
}
function Alert({ error, notice, onDismiss }) {
  if (!error && !notice) return null;
  return (
    <div className={`rv4-admin-alert ${error ? "is-error" : "is-success"}`}>
      <span>
        {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      </span>
      <div>{error || notice}</div>
      <button onClick={onDismiss} aria-label="Dismiss message">
        ×
      </button>
    </div>
  );
}
function StatCard({ label, value, note, icon: Icon, tone = "lime" }) {
  return (
    <article className="rv4-admin-stat">
      <div className="rv4-admin-stat-top">
        <span>{label}</span>
        <span className={`rv4-admin-stat-icon ${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <strong>{value ?? "—"}</strong>
      <small>{note}</small>
    </article>
  );
}
function StatusPill({ status }) {
  const s = normalizeStatus(status);
  return (
    <span className={`rv4-admin-status status-${s.replace(/[^a-z]/g, "")}`}>
      {status || "Pending"}
    </span>
  );
}
function EmptyState({
  title = "No records found",
  text = "Records will appear here when available.",
}) {
  return (
    <div className="rv4-admin-empty">
      <span>
        <Activity size={22} />
      </span>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}
function TableFrame({ title, subtitle, children }) {
  return (
    <section className="rv4-admin-panel">
      <div className="rv4-admin-panel-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export function AdminOverview() {
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billing, setBilling] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const [o, u, a, b] = await Promise.all([
        adminRequest("/admin/overview"),
        adminRequest("/admin/users"),
        adminRequest("/admin/appointments"),
        adminRequest("/admin/billing"),
      ]);
      setOverview(o.data || o.overview || o);
      setUsers(unwrapList(u));
      setAppointments(unwrapList(a));
      setBilling(unwrapList(b));
    } catch (e) {
      setError(e.message || "Unable to load the admin overview.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const metrics = useMemo(
    () => ({
      patients: users.filter((u) => u.role === "patient").length,
      physios:
        overview?.physiotherapists ??
        users.filter((u) => u.role === "physiotherapist").length,
      pending: appointments.filter(
        (a) => normalizeStatus(a.status) === "pending",
      ).length,
      paid:
        overview?.paidBillingTotal ??
        billing
          .filter((b) => normalizeStatus(b.status) === "paid")
          .reduce((s, b) => s + Number(b.amount || 0), 0),
    }),
    [overview, users, appointments, billing],
  );
  const recent = appointments.slice(0, 5);
  return (
    <>
      <PageHeader
        eyebrow="PLATFORM OVERVIEW"
        title="Good to see you."
        description="Monitor platform activity, care delivery and account operations."
        onRefresh={load}
        busy={busy}
      />
      <Alert error={error} onDismiss={() => setError("")} />
      {busy && !overview ? (
        <div className="rv4-admin-loading">
          <span className="rv4-admin-loader" />
          Loading platform data…
        </div>
      ) : (
        <>
          <div className="rv4-admin-welcome">
            <div>
              <span className="rv4-admin-welcome-kicker">
                REHABICS PLATFORM
              </span>
              <h2>Care operations, at a glance.</h2>
              <p>Live summary from your connected backend.</p>
            </div>
            <div className="rv4-admin-welcome-art">
              <span />
              <Activity size={72} />
            </div>
            <div className="rv4-admin-welcome-chip">
              <span />
              Backend connected when data refresh succeeds
            </div>
          </div>
          <div className="rv4-admin-stat-grid">
            <StatCard
              label="Total accounts"
              value={overview?.totalUsers ?? users.length}
              note="Registered platform users"
              icon={Users}
            />
            <StatCard
              label="Physiotherapists"
              value={metrics.physios}
              note="Care professionals"
              icon={Stethoscope}
              tone="blue"
            />
            <StatCard
              label="Appointments"
              value={overview?.totalAppointments ?? appointments.length}
              note={`${metrics.pending} awaiting action`}
              icon={CalendarDays}
              tone="violet"
            />
            <StatCard
              label="Paid billing total"
              value={new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(Number(metrics.paid || 0))}
              note={`${overview?.pendingBilling ?? billing.filter((b) => normalizeStatus(b.status) === "pending").length} pending records`}
              icon={WalletCards}
              tone="amber"
            />
          </div>
          <div className="rv4-admin-overview-grid">
            <TableFrame
              title="Recent appointments"
              subtitle="Latest appointments returned by the server"
            >
              <div className="rv4-admin-table-wrap">
                <table className="rv4-admin-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Physiotherapist</th>
                      <th>Schedule</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((a, i) => (
                      <tr key={a._id || a.id || i}>
                        <td>
                          <b>{a.patient?.name || a.patientName || "Patient"}</b>
                          <small>
                            {a.patient?.email || a.patientEmail || ""}
                          </small>
                        </td>
                        <td>
                          {a.physiotherapist?.name ||
                            a.physiotherapistName ||
                            "Not assigned"}
                        </td>
                        <td>{dateLabel(a.startsAt || a.time || a.date)}</td>
                        <td>
                          <StatusPill status={a.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!recent.length && <EmptyState title="No appointments yet" />}
              </div>
            </TableFrame>
            <TableFrame
              title="Account mix"
              subtitle="Based on current user records"
            >
              <div className="rv4-admin-role-list">
                {[
                  {
                    label: "Patients",
                    count: metrics.patients,
                    icon: UserRound,
                  },
                  {
                    label: "Physiotherapists",
                    count: metrics.physios,
                    icon: Stethoscope,
                  },
                  {
                    label: "Administrators",
                    count: users.filter((u) => u.role === "admin").length,
                    icon: ShieldIcon,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const total = Math.max(users.length, 1);
                  return (
                    <div className="rv4-admin-role-row" key={item.label}>
                      <span className={`rv4-admin-role-icon role-${i}`}>
                        <Icon size={18} />
                      </span>
                      <div className="rv4-admin-role-info">
                        <div>
                          <b>{item.label}</b>
                          <strong>{item.count}</strong>
                        </div>
                        <span className="rv4-admin-progress">
                          <i
                            style={{
                              width: `${Math.min(100, (item.count / total) * 100)}%`,
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rv4-admin-insight">
                <ArrowUpRight size={17} />
                <span>
                  Use User management to review accounts and update permitted
                  statuses.
                </span>
              </div>
            </TableFrame>
          </div>
        </>
      )}
    </>
  );
}
function ShieldIcon(props) {
  return <Activity {...props} />;
}

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState("");
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const r = await adminRequest("/admin/users");
      setUsers(unwrapList(r));
    } catch (e) {
      setError(e.message || "Unable to load users.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          `${u.name || ""} ${u.email || ""} ${u.role || ""}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (role === "all" || u.role === role) &&
          (status === "all" ||
            normalizeStatus(u.status) ===
              (status === "active" ? "active" : status)),
      ),
    [users, query, role, status],
  );
  const update = async (id, next) => {
    setSaving(id);
    setError("");
    setNotice("");
    try {
      await adminRequest(`/admin/users/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: next }),
      });
      setNotice("User status updated successfully.");
      await load();
    } catch (e) {
      setError(e.message || "Unable to update user status.");
    } finally {
      setSaving("");
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="PEOPLE AND ACCESS"
        title="User management"
        description="Search accounts, review roles and manage account status."
        onRefresh={load}
        busy={busy}
      />
      <Alert
        error={error}
        notice={notice}
        onDismiss={() => {
          setError("");
          setNotice("");
        }}
      />
      <section className="rv4-admin-panel">
        <div className="rv4-admin-toolbar">
          <div className="rv4-admin-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email or role"
              aria-label="Search users"
            />
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Filter by role"
          >
            <option value="all">All roles</option>
            <option value="patient">Patients</option>
            <option value="physiotherapist">Physiotherapists</option>
            <option value="admin">Administrators</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <span className="rv4-admin-result-count">
            {filtered.length} accounts
          </span>
        </div>
        <div className="rv4-admin-table-wrap">
          <table className="rv4-admin-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Manage status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => {
                const id = u._id || u.id;
                return (
                  <tr key={id || i}>
                    <td>
                      <div className="rv4-admin-person">
                        <span className="rv4-admin-person-avatar">
                          {(u.name || u.email || "U").charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <b>{u.name || "Unnamed user"}</b>
                          <small>{u.email || "No email provided"}</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`rv4-admin-role-tag role-${u.role || "other"}`}
                      >
                        {u.role || "Unknown"}
                      </span>
                    </td>
                    <td>{dateLabel(u.createdAt)}</td>
                    <td>
                      <StatusPill status={u.status || "active"} />
                    </td>
                    <td>
                      <select
                        className="rv4-admin-inline-select"
                        value={normalizeStatus(u.status || "active")}
                        disabled={!id || saving === id || u.role === "admin"}
                        onChange={(e) => update(id, e.target.value)}
                        aria-label={`Set status for ${u.name || u.email}`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      {saving === id && (
                        <small className="rv4-admin-saving">Saving</small>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {busy && !users.length ? (
            <div className="rv4-admin-loading">
              <span className="rv4-admin-loader" />
              Loading accounts…
            </div>
          ) : (
            !filtered.length && (
              <EmptyState
                title="No matching accounts"
                text="Try changing your search or filters."
              />
            )
          )}
        </div>
      </section>
      <p className="rv4-admin-footnote">
        Account status changes are saved through the protected admin API.
        Administrator accounts cannot be changed from this table.
      </p>
    </>
  );
}

export function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState("");
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const r = await adminRequest("/admin/appointments");
      setItems(unwrapList(r));
    } catch (e) {
      setError(e.message || "Unable to load appointments.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const filtered = useMemo(
    () =>
      items.filter(
        (a) =>
          `${a.patient?.name || a.patientName || ""} ${a.patient?.email || a.patientEmail || ""} ${a.physiotherapist?.name || a.physiotherapistName || ""}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "all" || normalizeStatus(a.status) === filter),
      ),
    [items, query, filter],
  );
  const update = async (id, status) => {
    setSaving(id);
    setError("");
    setNotice("");
    try {
      await adminRequest(`/admin/appointments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice("Appointment status updated.");
      await load();
    } catch (e) {
      setError(e.message || "Unable to update appointment.");
    } finally {
      setSaving("");
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="CARE OPERATIONS"
        title="Appointments"
        description="Review appointment schedules and update their status."
        onRefresh={load}
        busy={busy}
      />
      <Alert
        error={error}
        notice={notice}
        onDismiss={() => {
          setError("");
          setNotice("");
        }}
      />
      <section className="rv4-admin-panel">
        <div className="rv4-admin-toolbar">
          <div className="rv4-admin-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patient or physiotherapist"
              aria-label="Search appointments"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter appointments"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="rv4-admin-result-count">
            {filtered.length} appointments
          </span>
        </div>
        <div className="rv4-admin-table-wrap">
          <table className="rv4-admin-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Physiotherapist</th>
                <th>Schedule</th>
                <th>Appointment</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const id = a._id || a.id;
                return (
                  <tr key={id || i}>
                    <td>
                      <b>{a.patient?.name || a.patientName || "Patient"}</b>
                      <small>{a.patient?.email || a.patientEmail || ""}</small>
                    </td>
                    <td>
                      <b>
                        {a.physiotherapist?.name ||
                          a.physiotherapistName ||
                          "Not assigned"}
                      </b>
                      <small>
                        {a.physiotherapist?.email ||
                          a.physiotherapistEmail ||
                          ""}
                      </small>
                    </td>
                    <td>{dateLabel(a.startsAt || a.time || a.date)}</td>
                    <td>{a.type || a.reason || "Physiotherapy session"}</td>
                    <td>
                      <StatusPill status={a.status} />
                    </td>
                    <td>
                      <select
                        className="rv4-admin-inline-select"
                        value={normalizeStatus(a.status)}
                        disabled={!id || saving === id}
                        onChange={(e) => update(id, e.target.value)}
                        aria-label="Update appointment status"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {saving === id && (
                        <small className="rv4-admin-saving">Saving</small>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {busy && !items.length ? (
            <div className="rv4-admin-loading">
              <span className="rv4-admin-loader" />
              Loading appointments…
            </div>
          ) : (
            !filtered.length && (
              <EmptyState
                title="No appointments found"
                text="Appointments from your backend will appear here."
              />
            )
          )}
        </div>
      </section>
    </>
  );
}

export function AdminBilling() {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    amount: "",
    currency: "INR",
    description: "",
    status: "pending",
    type: "subscription",
  });
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const [b, u] = await Promise.all([
        adminRequest("/admin/billing"),
        adminRequest("/admin/users"),
      ]);
      setRecords(unwrapList(b));
      setUsers(unwrapList(u));
    } catch (e) {
      setError(e.message || "Unable to load billing records.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const create = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await adminRequest("/admin/billing", {
        method: "POST",
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      setNotice("Billing record created. No payment was charged.");
      setForm({
        userId: "",
        amount: "",
        currency: "INR",
        description: "",
        status: "pending",
        type: "subscription",
      });
      await load();
    } catch (e) {
      setError(e.message || "Unable to create billing record.");
    } finally {
      setSaving(false);
    }
  };
  const money = (amount, currency = "INR") => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency || "INR",
        maximumFractionDigits: 2,
      }).format(Number(amount || 0));
    } catch {
      return `${currency} ${amount}`;
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="FINANCIAL RECORDS"
        title="Billing records"
        description="Review billing entries and create administrative records. This does not process payments."
        onRefresh={load}
        busy={busy}
      />
      <Alert
        error={error}
        notice={notice}
        onDismiss={() => {
          setError("");
          setNotice("");
        }}
      />
      <section className="rv4-admin-panel rv4-admin-billing-form-panel">
        <div className="rv4-admin-panel-head">
          <div>
            <h2>Create a billing record</h2>
            <p>Creates a record only. No payment will be charged.</p>
          </div>
        </div>
        <form className="rv4-admin-billing-form" onSubmit={create}>
          <label>
            User account
            <select
              required
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            >
              <option value="">Choose a user</option>
              {users.map((u) => (
                <option key={u._id || u.id} value={u._id || u.id}>
                  {u.name || u.email} · {u.email || u.role}
                </option>
              ))}
            </select>
          </label>
          <label>
            Amount
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
            />
          </label>
          <label>
            Currency
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <label>
            Record type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="subscription">Subscription</option>
              <option value="appointment">Appointment</option>
              <option value="refund">Refund</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="rv4-admin-form-wide">
            Description
            <input
              required
              maxLength="240"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe this billing record"
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </label>
          <div className="rv4-admin-form-action">
            <button
              className="rv4-admin-button rv4-admin-button-primary"
              disabled={saving || !users.length}
            >
              {saving ? "Creating…" : "Create record"}
            </button>
          </div>
        </form>
      </section>
      <TableFrame
        title="Billing history"
        subtitle={`${records.length} records returned by the server`}
      >
        <div className="rv4-admin-table-wrap">
          <table className="rv4-admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Description</th>
                <th>Type</th>
                <th>Created</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={r._id || r.id || i}>
                  <td>
                    <b>{r.userId?.name || r.user?.name || "User"}</b>
                    <small>{r.userId?.email || r.user?.email || ""}</small>
                  </td>
                  <td>{r.description || "Billing record"}</td>
                  <td>
                    <span className="rv4-admin-role-tag">
                      {r.type || "other"}
                    </span>
                  </td>
                  <td>{dateLabel(r.createdAt)}</td>
                  <td>
                    <b>{money(r.amount, r.currency)}</b>
                  </td>
                  <td>
                    <StatusPill status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {busy && !records.length ? (
            <div className="rv4-admin-loading">
              <span className="rv4-admin-loader" />
              Loading billing…
            </div>
          ) : (
            !records.length && (
              <EmptyState
                title="No billing records yet"
                text="Create a record above when required."
              />
            )
          )}
        </div>
      </TableFrame>
    </>
  );
}
