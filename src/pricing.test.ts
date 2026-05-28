import { describe, expect, it } from 'vitest';
import { calculateQuote, formatCurrency } from './pricing';

describe('calculateQuote', () => {
  it('calculates profitable quote with deposit and scope', () => {
    const quote = calculateQuote({ hourlyRate: 100, estimatedHours: 40, complexity: 3, margin: 40, rush: true, revisions: 2 });
    expect(quote.floorPrice).toBeGreaterThanOrEqual(4900);
    expect(quote.recommendedPrice).toBeGreaterThan(quote.floorPrice);
    expect(quote.deposit).toBeGreaterThan(0);
    expect(quote.scopePoints.length).toBeGreaterThanOrEqual(3);
  });

  it('formats currency for proposal copy', () => {
    expect(formatCurrency(12500)).toBe('$12,500');
  });
});
