# Timestamp microservice

Converts Unix timestamps in **seconds** and natural dates to UTC. The existing v1 response contract and aliases are preserved:

- `GET /api/ts/1451606400` or `GET /api/timestamp/January%201,%202016`
- Aliases include `/api/timestring` and `/api/v1/ts`.
- No timestamp returns the current time.
- Invalid dates return `{ "unix": null, "natural": null }`.

Example response:

```json
{ "unix": 1451606400, "natural": "January 01, 2016" }
```

## Local development and checks

Use Node 24 (`.nvmrc`), then `npm ci`, `npm test`, `npm run build`, and `npm start`.
Open http://localhost:3000. Set `PORT` to change the port.
`GET /health` returns `{ "status": "ok" }`.

The service runs directly from CommonJS source. Babel and a mandatory Redis connection are no longer required.
API requests are limited to 100 per IP per 15 minutes in each process. The in-memory limiter is a local abuse guard; distributed deployments should use provider firewall rules for fleet-wide limits. No credentials are required.

## Deployment

The former Glitch URL returns HTTP 410 and cannot host this app.
This repository is prepared for Vercel's Express framework with Node 24, which serves `public/` assets and detects the exported Express app in `src/server.js`.
See [Vercel's Express guide](https://vercel.com/docs/frameworks/backend/express).

After production approval, import `abhisekp/FCC-Project-Timestamp` in the intended Vercel team, select `glitch` as the production branch, and use the repository root with the Express preset.
Deploy a preview first. Verify the home page, CSS, `/health`, valid dates, invalid dates, and current-time routes before production activation.
Update the repository homepage to the verified production URL after deployment.
The old Glitch host is not transferable through this repository.

GitHub Actions runs the HTTP regression tests and entry-point syntax check on Node 24.
No production deployment has been performed by adding this configuration.
