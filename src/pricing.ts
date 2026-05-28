export type PackageTier = 'Launch' | 'Growth' | 'Scale';

export interface QuoteInput {
  hourlyRate: number;
  estimatedHours: number;
  complexity: number;
  margin: number;
  rush: boolean;
  revisions: number;
}

export interface QuoteResult {
  floorPrice: number;
  recommendedPrice: number;
  deposit: number;
  deliveryDays: number;
  scopePoints: string[];
  tier: PackageTier;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const money = (value: number) => Math.round(value / 25) * 25;

export function calculateQuote(input: QuoteInput): QuoteResult {
  const rate = clamp(input.hourlyRate || 0, 25, 500);
  const hours = clamp(input.estimatedHours || 0, 1, 1000);
  const complexityMultiplier = 1 + clamp(input.complexity, 1, 5) * 0.08;
  const marginMultiplier = 1 + clamp(input.margin, 0, 100) / 100;
  const rushMultiplier = input.rush ? 1.25 : 1;
  const revisionBuffer = 1 + clamp(input.revisions, 0, 10) * 0.035;
  const floorPrice = money(rate * hours * complexityMultiplier);
  const recommendedPrice = money(floorPrice * marginMultiplier * rushMultiplier * revisionBuffer);
  const tier: PackageTier = recommendedPrice >= 12000 ? 'Scale' : recommendedPrice >= 4500 ? 'Growth' : 'Launch';
  const deliveryDays = Math.max(3, Math.ceil(hours / 5) + (input.rush ? -2 : 3));
  return {
    floorPrice,
    recommendedPrice,
    deposit: money(recommendedPrice * 0.4),
    deliveryDays,
    tier,
    scopePoints: buildScope(tier, input.revisions)
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function buildScope(tier: PackageTier, revisions: number): string[] {
  const base = ['Discovery call + written scope', 'Fixed-price proposal with milestone deposit', `${Math.max(1, revisions)} revision round${revisions === 1 ? '' : 's'}`];
  if (tier !== 'Launch') base.push('Conversion-focused copy checklist', 'Client handoff call');
  if (tier === 'Scale') base.push('Priority delivery lane', 'Post-launch optimization sprint');
  return base;
}
