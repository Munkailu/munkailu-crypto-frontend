# Munkailu Crypto App — Frontend

**Student Project** | Full-Stack Integration Interim Assessment  
Built with **React + Vite + Tailwind CSS**

> ⚠️ This is a student project. It is **not affiliated with Coinbase, Inc.** in any way.  
> Do not enter real personal information.

---

## Netlify Deployment Checklist (Lecturer Requirements)

- [x] Site name: `munkailu-crypto-app.netlify.app` — no "coinbase" in domain
- [x] Page title: `Crypto App | Student Project`
- [x] Warning banner: `StudentBanner.jsx` shown at the top of every page
- [x] Footer disclaimer: `FooterDisclaimer.jsx` shown on every page
- [x] Demo note on login and register pages: "Demo app – do not use your real password"

---

## Features

- JWT Authentication (register, login, protected profile)
- Crypto data: all coins, top gainers, new listings
- Add cryptocurrency form (authenticated)
- Fully connected to Node.js/MongoDB backend

---

## Local Setup

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE
npm run dev
```

## Deploy to Netlify

1. Push to GitHub, connect to Netlify.
2. Build: `npm run build` | Publish: `dist`
3. Env var: `VITE_API_BASE=https://your-render-url.onrender.com`
4. Create `public/_redirects` containing: `/* /index.html 200`
5. Site name: `munkailu-crypto-app` (no "coinbase")
