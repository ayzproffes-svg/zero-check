import assert from 'node:assert/strict';
import test from 'node:test';
import { decide, evaluateCompany } from '../lib/model.ts';

const metrics = ['quality_score', 'market_price_inr', 'base_value_inr', 'adv_inr_cr', 'bear_value_inr'];
const values = [81, 100, 128, 120, 75];
const evidence = metrics.map((metric, index) => ({
  id: metric, company: 'BSE', metric, value: values[index], unit: 'DEMO', state: 'AVAILABLE',
  source: 'Synthetic fixture', sourceType: 'demo_fixture', observedAt: '2026-01-01', publishedAt: '2026-01-01',
  period: 'DEMO', currency: 'INR', adjustment: 'none', transformation: 'fixture', modelVersion: 'demo'
}));
const mandate = { asOf: '2026-01-01', allocationCr: 500, horizonMonths: 12, hurdlePct: 15, maxDays: 45, participationPct: 10, maxStressLossPct: 30 };

test('eligible evidence can produce BUY_ONE with disclosed gates', () => {
  const result = evaluateCompany('BSE', evidence, mandate);
  assert.equal(result.valuationGapPct, 28);
  assert.equal(result.daysToBuild, 42);
  assert.equal(result.bearLossPct, 25);
  assert.equal(decide([result]).outcome, 'BUY_ONE');
});

test('stale and unavailable evidence prevent a buy outcome', () => {
  for (const state of ['STALE', 'UNAVAILABLE']) {
    const changed = evidence.map(fact => fact.metric === 'quality_score' ? { ...fact, state } : fact);
    assert.equal(decide([evaluateCompany('BSE', changed, mandate)]).outcome, 'WAIT');
  }
});

test('published-after-as-of values cannot enter a historical decision', () => {
  const future = evidence.map(fact => fact.metric === 'base_value_inr' ? { ...fact, publishedAt: '2026-01-02' } : fact);
  const result = evaluateCompany('BSE', future, mandate);
  assert.equal(result.valuationGapPct, null);
  assert.equal(result.evidenceState, 'UNAVAILABLE');
});

test('a mandate with no eligible company returns NO_INVESTMENT', () => {
  const result = evaluateCompany('BSE', evidence, { ...mandate, maxDays: 1 });
  assert.equal(result.eligible, false);
  assert.equal(decide([result]).outcome, 'NO_INVESTMENT');
});
