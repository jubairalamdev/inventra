const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

export async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? (await import("@/lib/auth-client")).authClient.getSession?.()?.then((s) => s.data?.session?.token)
      : undefined

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  const resolvedToken = await token
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`
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
