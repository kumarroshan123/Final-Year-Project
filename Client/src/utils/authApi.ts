// src/utils/authApi.ts
// Utility functions for authentication API calls

const API_BASE = 'http://localhost:5001/api/auth';

export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function login({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

export async function updateMe(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Update failed');
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}
