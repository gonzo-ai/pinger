import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (email !== process.env.AUTH_EMAIL || password !== process.env.AUTH_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('pinger-auth', process.env.AUTH_SECRET!, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return response
}
