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

Glitch no longer provides app hosting. The deployment targets are **Render for the API** and **Vercel for the static UI**. Both use the repository root and the `glitch` branch.

### Render API

- Node 24, Singapore region, Free instance.
- Build: `npm ci && npm run build && npm test`.
- Start: `npm start`; health check: `/health`.
- Assigned API address: `https://fcc-timestamp-api-uahh.onrender.com`.
- Render sets `PORT` and `RENDER` automatically. No secrets or database are required.
- The API allows cross-origin GET requests without credentials. The UI calls Render directly so conversion requests do not share the Vercel proxy's rate-limit bucket.
- One nearest hosting proxy is trusted for IP rate limiting on Render; direct local hosting trusts none. Keep the API behind the provider's proxy.
- Free instances sleep after inactivity, so initial requests can take about a minute. The UI displays a wake-up message and allows 90 seconds before timing out.

### Vercel UI

- Team: `eaglevision` (Abhisek Pattnaik's projects); project: `fcc-project-timestamp`.
- Framework: Other; build: `node scripts/build-ui.js`; output: `dist`.
- `vercel.json` supplies the static build, security headers and compatibility rewrites for `/api/*` and `/health`.
- `scripts/build-ui.js` copies the UI and writes its public API origin to `dist/config.js`. Update the API address there and in `vercel.json` if the Render service moves.
- Local development serves `public/config.js`, which uses the local API. The UI supports dates, Unix seconds, epoch zero, current time, invalid inputs, network errors and JSON copying.
- API aliases and response fields retain their original v1 behavior.

GitHub Actions runs HTTP regression tests and syntax checks on Node 24. Verify `/health`, known dates, invalid dates and the interactive converter on the deployed URLs after every release. Provider deployment status and live verification are reported separately from this configuration.
