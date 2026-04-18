import { NextResponse } from 'next/server';
import { performPing } from '@/lib/ping';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  // Vercel Cron sends a Bearer token matching CRON_SECRET if it's set
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await performPing();

  return NextResponse.json({
    message: 'Ping execution completed',
    timestamp: new Date().toISOString(),
    results,
  });
}
