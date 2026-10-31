# Assumptions and current scope

- The owner's instruction to publish on Vercel supersedes the source brief's Firebase App Hosting target. Google/Firebase remains the planned authentication and data layer.
- No Google/Firebase project or live market-data licence was supplied. The site contains synthetic demonstration fixtures only; it does not ingest or imply real security prices or fundamentals.
- The interactive lab is a client-side prototype. Inputs are ephemeral and are not saved, shared or audited server-side.
- The model is intentionally narrow: it compares entered quality, price, base value, bear value and average daily traded value against mandate gates. It does not yet calculate fundamental KPIs, DCF, peer multiples, Monte Carlo, correlated stress, full impact cost, historical backtests, CPR, DOCX/PDF exports, or monitoring.
- `BUY_ONE` is a model state for the synthetic example, not a trade recommendation. Human approval is required.
- The public access offering is descriptive. There is no connected request form, newsletter or billing flow.
- The reference landing page was inspected for structure and content order. Its art, copy, testimonials, counts, logos and code were not reused. Pixel-level matching and its seven-width visual gate were not completed.
- Production security, multi-tenant roles, SSO, Firestore rules, Cloud SQL, Cloud Tasks and Cloud Run are deferred until cloud resources exist.
