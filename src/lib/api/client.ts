'use client';

import { auth } from '@/lib/firebase/client';

async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

export interface ApiClientOptions extends RequestInit {
  /** If true (default), attaches Authorization: Bearer <idToken>. Set false for public endpoints. */
  authenticated?: boolean;
}

/**
 * Fetch wrapper that attaches Firebase ID token to requests.
 * Use for all calls to /api/* from the client.
 */
export async function apiFetch(
  path: string,
  options: ApiClientOptions = {}
): Promise<Response> {
  const { authenticated = true, headers: customHeaders = {}, ...rest } = options;

  const headers = new Headers(customHeaders);
  if (rest.body && typeof rest.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (authenticated) {
    const token = await getIdToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const url =
    path.startsWith('http')
      ? path
      : typeof window !== 'undefined'
        ? (path.startsWith('/') ? path : `/${path}`)
        : `${process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000'}${path.startsWith('/') ? path : `/${path}`}`;

  return fetch(url, { ...rest, headers });
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const res = await apiFetch(path, { method: 'GET' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T = unknown>(
  path: string,
  body?: unknown
): Promise<T> {
  const res = await apiFetch(path, {
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export async function apiPatch<T = unknown>(
  path: string,
  body?: unknown
): Promise<T> {
  const res = await apiFetch(path, {
    method: 'PATCH',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export async function apiDelete(path: string): Promise<void> {
  const res = await apiFetch(path, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? 'Request failed');
  }
}
