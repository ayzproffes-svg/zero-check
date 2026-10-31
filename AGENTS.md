# Zero check working rules

## Product
Zero check is a decision-support prototype for a hypothetical ₹500 crore comparison of BSE Limited, CDSL, CAMS and KFin Technologies. Outcomes are `BUY_ONE`, `WAIT`, or `NO_INVESTMENT`. The three operating-model templates are exchange, depository and RTA/technology. Human review is required.

## Engineering
- Use strict TypeScript and deterministic, pure calculation functions. Never put AI in a calculation path.
- Never present synthetic fixtures as market facts. Show a persistent `DEMO DATA` label wherever fixture values appear.
- Every material value must carry source, observation and publication dates, reporting period, currency, unit, adjustment, transformation and model version before it is used in a production decision.
- Required unavailable evidence blocks a calculation. Stale and estimated evidence must remain visible and lower confidence.
- Use integer paise or Decimal for production money arithmetic. The prototype's crore values are synthetic research ratios, not accounting totals.
- Do not claim scenario cases bound potential loss or that results are investment advice.
- Run type-check and build before publishing. Keep secrets out of the repository.

## Architecture and deployment
The project is a Next.js App Router prototype. Hosting is Vercel per the owner's request. Firebase/Google Cloud authentication, databases, audit storage and other production services require a project connection and are not active yet. See `docs/ASSUMPTIONS.md` and `docs/ROADMAP.md` before extending this prototype.
