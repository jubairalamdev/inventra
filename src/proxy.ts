import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const protectedRoutes = ["/cart", "/checkout", "/orders", "/support", "/admin"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtected) return NextResponse.next()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) return NextResponse.next()

  const loginUrl = new URL("/login", request.url)
  loginUrl.searchParams.set("callbackUrl", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/cart", "/checkout", "/orders", "/support", "/admin", "/admin/:path*"],
}
