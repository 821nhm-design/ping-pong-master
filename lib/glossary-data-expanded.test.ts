import { describe, it, expect } from 'vitest';
import {
  glossaryTerms,
  getGlossaryByCategory,
  getGlossaryByDifficulty,
  searchGlossary,
  glossaryCategories,
} from './glossary-data-expanded';

describe('Glossary Data Expanded', () => {
  it('should have all glossary terms', () => {
    expect(glossaryTerms).toBeDefined();
    expect(glossaryTerms.length).toBeGreaterThan(0);
  });

  it('should have correct total count', () => {
    expect(glossaryTerms.length).toBe(127);
  });

  it('should have correct category distribution', () => {
    const rules = getGlossaryByCategory('rules');
    const equipment = getGlossaryByCategory('equipment');
    const techniques = getGlossaryByCategory('techniques');
    const tactics = getGlossaryByCategory('tactics');
    const other = getGlossaryByCategory('other');

    expect(rules.length).toBe(25);
    expect(equipment.length).toBe(28);
    expect(techniques.length).toBe(40);
    expect(tactics.length).toBe(20);
    expect(other.length).toBe(14);
  });

  it('should have correct glossary categories', () => {
    expect(glossaryCategories.length).toBe(5);
    expect(glossaryCategories[0].id).toBe('rules');
    expect(glossaryCategories[1].id).toBe('equipment');
    expect(glossaryCategories[2].id).toBe('techniques');
    expect(glossaryCategories[3].id).toBe('tactics');
    expect(glossaryCategories[4].id).toBe('other');
  });

  it('should filter by difficulty', () => {
    const beginners = getGlossaryByDifficulty('beginner');
    const intermediates = getGlossaryByDifficulty('intermediate');
    const advanced = getGlossaryByDifficulty('advanced');

    expect(beginners.length).toBeGreaterThan(0);
    expect(intermediates.length).toBeGreaterThan(0);
    expect(advanced.length).toBeGreaterThan(0);
  });

  it('should search glossary by name', () => {
    const results = searchGlossary('ドライブ');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((t) => t.name.includes('ドライブ'))).toBe(true);
  });

  it('should search glossary by description', () => {
    const results = searchGlossary('回転');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should have unique IDs', () => {
    const ids = glossaryTerms.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have required fields for each term', () => {
    glossaryTerms.forEach((term) => {
      expect(term.id).toBeDefined();
      expect(term.name).toBeDefined();
      expect(term.category).toBeDefined();
      expect(term.description).toBeDefined();
      expect(term.difficulty).toBeDefined();
    });
  });

  it('should have valid category values', () => {
    const validCategories = ['rules', 'equipment', 'techniques', 'tactics', 'other'];
    glossaryTerms.forEach((term) => {
      expect(validCategories).toContain(term.category);
    });
  });

  it('should have valid difficulty values', () => {
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    glossaryTerms.forEach((term) => {
      expect(validDifficulties).toContain(term.difficulty);
    });
  });
});
