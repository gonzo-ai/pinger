'use server';

import { performPing, PingResult } from '@/lib/ping';

export async function pingProjectsAction(): Promise<{ timestamp: string; results: PingResult[] }> {
  const results = await performPing();
  return {
    timestamp: new Date().toISOString(),
    results,
  };
}
