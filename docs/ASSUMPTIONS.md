# Assumptions and current scope

- The owner's instruction to publish on Vercel supersedes the source brief's Firebase App Hosting target. Google/Firebase remains the planned authentication and data layer.
- The owner explicitly authorized publishing the prototype source in a public GitHub repository.
- No Google/Firebase project or live market-data licence was supplied. The site contains synthetic demonstration fixtures only; it does not ingest or imply real security prices or fundamentals.
- The interactive lab is a client-side prototype. Inputs are ephemeral and are not saved, shared or audited server-side.
- The model is intentionally narrow: it compares entered quality, price, base value, bear value and average daily traded value against mandate gates. It does not yet calculate fundamental KPIs, DCF, peer multiples, Monte Carlo, correlated stress, full impact cost, historical backtests, CPR, DOCX/PDF exports, or monitoring.
- `BUY_ONE` is a model state for the synthetic example, not a trade recommendation. Human approval is required.
- The public access offering is descriptive. There is no connected request form, newsletter or billing flow.
- The reference landing page was inspected for structure, content order, responsive layout and interactions. The new landing page uses original Zero check content and CSS/SVG artwork; reference copy, logos, testimonials, assets and code were not reused. The desktop (1440 px) and mobile (375 px) layouts and core interactions were checked in the ChatGPT in-app browser. Pixel-level matching and the brief's full seven-width visual gate remain incomplete.
- Production security, multi-tenant roles, SSO, Firestore rules, Cloud SQL, Cloud Tasks and Cloud Run are deferred until cloud resources exist.
