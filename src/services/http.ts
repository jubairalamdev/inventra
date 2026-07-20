import { authClient } from "@/lib/auth-client"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

let cachedToken: string | null | undefined = undefined

export async function getAuthToken(): Promise<string | null> {
  if (cachedToken !== undefined) return cachedToken
  try {
    const res = await authClient.getSession()
    cachedToken = res.data?.session?.token ?? null
    return cachedToken
  } catch {
    cachedToken = null
    return null
  }
}

export function clearTokenCache() {
  cachedToken = undefined
}

export async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (typeof window !== "undefined") {
    const token = await getAuthToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || "Request failed")
  }

  return res.json()
}
