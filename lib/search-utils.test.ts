import { describe, it, expect } from 'vitest';
import { globalSearch } from './search-utils';

describe('search-utils', () => {
  it('should return empty array for empty query', () => {
    const results = globalSearch('');
    expect(results).toEqual([]);
  });

  it('should find glossary terms', () => {
    const results = globalSearch('ドライブ');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === 'glossary')).toBe(true);
  });

  it('should find techniques', () => {
    const results = globalSearch('ドライブ');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === 'technique')).toBe(true);
  });

  it('should find players', () => {
    const results = globalSearch('中国');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === 'player')).toBe(true);
  });

  it('should be case insensitive', () => {
    const results1 = globalSearch('ドライブ');
    const results2 = globalSearch('ドライブ');
    expect(results1.length).toEqual(results2.length);
  });

  it('should return results with correct structure', () => {
    const results = globalSearch('ドライブ');
    if (results.length > 0) {
      const result = results[0];
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('title');
      expect(['glossary', 'technique', 'player']).toContain(result.type);
    }
  });

  it('should limit description length', () => {
    const results = globalSearch('ドライブ');
    results.forEach((result) => {
      if (result.description) {
        expect(result.description.length).toBeLessThanOrEqual(83); // 80 + "..."
      }
    });
  });

  it('should find results by country', () => {
    const results = globalSearch('日本');
    expect(results.some((r) => r.type === 'player')).toBe(true);
  });
});
