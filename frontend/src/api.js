const API_BASE = "http://localhost:4000/api";

export const logActivity = (activity) =>
  fetch(`${API_BASE}/activity`, {  // ✅ singular
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity),
  }).then(res => res.json());

export async function getSummary(petName) {
  const res = await fetch(
    `${API_BASE}/summary?petName=${encodeURIComponent(petName)}` // ✅ singular
  );
  return res.json();
}

export const sendChat = (message) =>
  fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  }).then(res => res.json());

export const getChatHistory = () =>
  fetch(`${API_BASE}/chat`).then(res => res.json());
