import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/cart", "/checkout", "/orders", "/support", "/admin"]
const authRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuth = authRoutes.some((route) => pathname.startsWith(route))
  const sessionCookie = request.cookies.get("better-auth.session_token")

  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuth && sessionCookie) {
    return NextResponse.redirect(new URL("/shop", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
}
