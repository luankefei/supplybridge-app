import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl
  // @ts-ignore
  const token = req.cookies.get('token')?.value
  if (nextUrl.pathname.includes('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(`${nextUrl.origin}/login`)
    }
  }
}