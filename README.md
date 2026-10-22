# NGANYA HIRE — Driver app

Driver portal. Drivers apply, confirm availability for requested dates, and manage their calendar.

**Live:** https://nganya-driver.vercel.app

## Scope
- `/` public driver landing
- `/driver/register` application (account starts as **Pending Verification**)
- `/login`, `/post-login`, `/driver` dashboard with booking requests and availability responses

## Environment
```
DATABASE_URL=postgresql://...   # shared Neon database
AUTH_SECRET=...                 # must match the other two apps
```

## Local
```bash
npm install --legacy-peer-deps
npm run dev
```
