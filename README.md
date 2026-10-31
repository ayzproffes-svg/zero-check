# Zero check

Evidence-first decision-support prototype for a hypothetical ₹500 crore allocation across BSE Limited, CDSL, CAMS and KFin Technologies.

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. The landing page includes a responsive interactive repository viewer, terminal, tier selector, FAQ, menu and scroll/cursor motion. The interactive synthetic decision lab is at `/lab`.

## Verification

```sh
npm run typecheck
npm test
npm run build
```

All default values are synthetic `demo_fixture` inputs. The model calculates a quality ranking, base-value gap, bear scenario loss and days-to-build gate. No live financial data, user accounts or persistent database is connected. See `docs/ASSUMPTIONS.md` for exact limits.

## Deployment

The root is a Vercel-compatible Next.js app. Connect the GitHub repository in Vercel and deploy with Framework Preset **Next.js**. No environment variables are required for the demo. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for canonical sitemap entries. Firebase and database variables in `.env.example` are reserved for later work and must be configured before enabling those integrations.
