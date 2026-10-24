const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export function getStoredUser() {
  const raw =
    localStorage.getItem("rehabics_user") ||
    sessionStorage.getItem("rehabics_user") ||
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return (
    localStorage.getItem("rehabics_token") ||
    sessionStorage.getItem("rehabics_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    ""
  );
}

export async function adminRequest(path, options = {}) {
  const token = getStoredToken();
  if (!token)
    throw new Error("Your session has expired. Please sign in again.");
  const response = await fetch(
    `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    },
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      body.message || body.error || `Request failed (${response.status})`,
    );
  return body;
}

export function unwrapList(body) {
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.users)) return body.users;
  if (Array.isArray(body?.appointments)) return body.appointments;
  if (Array.isArray(body?.records)) return body.records;
  if (Array.isArray(body)) return body;
  return [];
}
export const normalizeStatus = (value) =>
  String(value || "pending").toLowerCase();
export const dateLabel = (value) => {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};
