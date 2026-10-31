export type CompanyId = "BSE" | "CDSL" | "CAMS" | "KFIN";
export type EvidenceState = "AVAILABLE" | "STALE" | "ESTIMATED" | "UNAVAILABLE";
export type Evidence = {
  id: string; company: CompanyId; metric: string; value: number | null; unit: string;
  state: EvidenceState; source: string; sourceType: "demo_fixture" | "user_entry";
  observedAt: string; publishedAt: string; period: string; currency: string;
  adjustment: string; transformation: string; modelVersion: string;
};
export type Mandate = {
  asOf: string; allocationCr: number; horizonMonths: number; hurdlePct: number;
  maxDays: number; participationPct: number; maxStressLossPct: number;
};
export type Result = { company: CompanyId; quality: number | null; valuationGapPct: number | null; daysToBuild: number | null; bearLossPct: number | null; evidenceState: EvidenceState; eligible: boolean; reasons: string[] };
const required = ["quality_score", "market_price_inr", "base_value_inr", "adv_inr_cr", "bear_value_inr"];

export function evaluateCompany(company: CompanyId, evidence: Evidence[], mandate: Mandate): Result {
  const facts = evidence.filter(item => item.company === company && item.publishedAt <= mandate.asOf);
  const get = (metric: string) => facts.filter(item => item.metric === metric).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))[0];
  const missing = required.filter(metric => !get(metric) || get(metric)?.value === null || get(metric)?.state === "UNAVAILABLE");
  const states = required.map(metric => get(metric)?.state);
  const evidenceState: EvidenceState = missing.length ? "UNAVAILABLE" : states.includes("STALE") ? "STALE" : states.includes("ESTIMATED") ? "ESTIMATED" : "AVAILABLE";
  if (missing.length) return { company, quality: null, valuationGapPct: null, daysToBuild: null, bearLossPct: null, evidenceState, eligible: false, reasons: [`Missing required evidence: ${missing.join(", ")}`] };
  const num = (metric: string) => get(metric)!.value!;
  const price = num("market_price_inr");
  const gap = Math.round(((num("base_value_inr") / price) - 1) * 1000) / 10;
  const days = Math.ceil(mandate.allocationCr / ((mandate.participationPct / 100) * num("adv_inr_cr")));
  const bearLoss = Math.round((1 - num("bear_value_inr") / price) * 1000) / 10;
  const reasons: string[] = [];
  if (evidenceState !== "AVAILABLE") reasons.push(`Evidence is ${evidenceState.toLowerCase()}`);
  if (gap < mandate.hurdlePct * mandate.horizonMonths / 12) reasons.push("Valuation gap is below the mandate hurdle");
  if (days > mandate.maxDays) reasons.push(`Build requires ${days} days at the selected participation rate`);
  if (bearLoss > mandate.maxStressLossPct) reasons.push("Bear-case loss exceeds the risk budget");
  return { company, quality: num("quality_score"), valuationGapPct: gap, daysToBuild: days, bearLossPct: bearLoss, evidenceState, eligible: reasons.length === 0, reasons };
}

export function decide(results: Result[]): { outcome: "BUY_ONE" | "WAIT" | "NO_INVESTMENT"; company?: CompanyId; rationale: string } {
  const eligible = results.filter(result => result.eligible).sort((a,b) => (b.quality ?? 0) - (a.quality ?? 0));
  if (eligible.length) return { outcome: "BUY_ONE", company: eligible[0].company, rationale: "Passes the configured evidence, valuation, risk and execution gates. Requires human review." };
  if (results.some(result => result.evidenceState !== "AVAILABLE")) return { outcome: "WAIT", rationale: "Required evidence is missing, stale or estimated. Refresh and review it before a decision." };
  return { outcome: "NO_INVESTMENT", rationale: "No company passes the current mandate gates." };
}
