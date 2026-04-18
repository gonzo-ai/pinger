export type PingResult = { name: string; url: string; success: boolean; error?: string };

export async function performPing(): Promise<PingResult[]> {
  const results: PingResult[] = [];

  for (let i = 1; i <= 10; i++) {
    const url = process.env[`SUPABASE_${i}_URL`];
    const key = process.env[`SUPABASE_${i}_KEY`];

    if (url && key) {
      try {
        const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/`, {
          method: 'GET',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
          },
          signal: AbortSignal.timeout(5000), 
          cache: 'no-store'
        });

        if (response.ok) {
          results.push({ name: `Project ${i}`, url, success: true });
        } else {
          results.push({ name: `Project ${i}`, url, success: false, error: `HTTP ${response.status}` });
        }
      } catch (err: any) {
        results.push({ name: `Project ${i}`, url, success: false, error: err.message });
      }
    }
  }
  return results;
}
