const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

export function getStoredToken() {
  return localStorage.getItem("rehabics_token") || sessionStorage.getItem("rehabics_token");
}

export function getStoredUser() {
  const raw = localStorage.getItem("rehabics_user") || sessionStorage.getItem("rehabics_user");
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export async function physioRequest(path, options = {}) {
  const token = getStoredToken();
  const response = await fetch(`${API_URL}/physiotherapist-portal${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    localStorage.removeItem("rehabics_token"); localStorage.removeItem("rehabics_user");
    sessionStorage.removeItem("rehabics_token"); sessionStorage.removeItem("rehabics_user");
    window.location.assign("/login");
    throw new Error("Your session has expired. Please sign in again.");
  }
  if (!response.ok || data.success === false) throw new Error(data.message || "The request could not be completed.");
  return data;
}

export const sendJson = (method, body) => ({ method, body: JSON.stringify(body) });
