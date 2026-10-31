import type { CompanyId, Evidence } from "./model";
export const companies: { id: CompanyId; name: string; model: string; focus: string }[] = [
  { id: "BSE", name: "BSE Limited", model: "Exchange", focus: "Volumes · transaction yield · ancillary mix" },
  { id: "CDSL", name: "CDSL", model: "Depository", focus: "Accounts · issuer mix · service pricing" },
  { id: "CAMS", name: "CAMS", model: "RTA / technology", focus: "AUM serviced · revenue yield · renewals" },
  { id: "KFIN", name: "KFin Technologies", model: "RTA / technology", focus: "AUM serviced · client mix · platform revenue" }
];
const fixture: Record<CompanyId, [number, number, number, number, number]> = {
  BSE: [81, 100, 128, 120, 75], CDSL: [76, 100, 112, 85, 78], CAMS: [73, 100, 121, 74, 83], KFIN: [70, 100, 116, 60, 76]
};
const metrics = ["quality_score", "market_price_inr", "base_value_inr", "adv_inr_cr", "bear_value_inr"];
export const demoEvidence: Evidence[] = companies.flatMap(company => metrics.map((metric, index) => ({
  id: `${company.id}-${metric}`, company: company.id, metric, value: fixture[company.id][index],
  unit: metric === "adv_inr_cr" ? "INR crore/day" : metric === "quality_score" ? "score / 100" : "INR/share",
  state: "AVAILABLE" as const, source: "Synthetic demonstration fixture v1", sourceType: "demo_fixture" as const,
  observedAt: "2026-01-01", publishedAt: "2026-01-01", period: "DEMO point in time", currency: "INR",
  adjustment: "None; synthetic", transformation: "Direct fixture value", modelVersion: "demo-0.1.0"
})));
