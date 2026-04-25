# Supabase Pinger — Claude Context

## What this project is
Monitors Supabase projects by pinging them on a schedule to prevent cold starts. Shows status dashboard.

## Running
- **Mode:** Production (`next start`)
- **Port:** 3001
- **Started by:** botuser via nohup
- **URL:** https://pinger.heyturgay.com (Cloudflare tunnel)
- **Tunnel config:** /root/.cloudflared/pinger-config.yml (ID: e20c882b-f6bf-4ac8-a280-d9feac65e42f)

## Stack
- Next.js 16 App Router, TypeScript
- Light warm theme (CSS vars in `src/app/globals.css`)
- node-cron for scheduled pinging
- Cookie-based auth

## Auth
- Cookie name: `pinger-auth`
- Middleware: `src/middleware.ts`
- `secure: false` on cookie — Cloudflare terminates SSL before Node.js
- Credentials in `.env.local` (not committed)

## Key files
- `src/app/page.tsx` — dashboard with stats, project cards, logout button
- `src/app/login/page.tsx` — login form (checks `res.ok` then `window.location.href = "/"`)
- `src/app/api/auth/login/route.ts` — returns JSON `{ok:true}` + sets cookie
- `src/app/api/auth/logout/route.ts` — clears cookie
- `src/app/api/ping/route.ts` — ping endpoint
- `src/app/icon.svg` — favicon (green S on dark bg)

## Restart after build
```bash
# Must run as botuser
su - botuser -s /bin/bash -c "cd /home/repos/supabase-pinger && PORT=3001 nohup node_modules/.bin/next start > /home/botuser/pinger.log 2>&1 &"
```
