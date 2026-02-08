import { describe, it, expect } from "vitest";
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  getTermsByCategory,
  getTermById,
  searchTerms,
} from "./glossary-data";

describe("Glossary Data", () => {
  it("should have glossary terms", () => {
    expect(GLOSSARY_TERMS.length).toBeGreaterThan(0);
  });

  it("should have glossary categories", () => {
    expect(GLOSSARY_CATEGORIES.length).toBeGreaterThan(0);
  });

  it("should have all required fields in each glossary term", () => {
    GLOSSARY_TERMS.forEach((term) => {
      expect(term).toHaveProperty("id");
      expect(term).toHaveProperty("term");
      expect(term).toHaveProperty("category");
      expect(term).toHaveProperty("furigana");
      expect(term).toHaveProperty("definition");
      expect(term).toHaveProperty("detailedExplanation");
      expect(term).toHaveProperty("relatedTerms");
      expect(term).toHaveProperty("examples");
    });
  });

  it("should filter glossary terms by category", () => {
    const equipmentTerms = getTermsByCategory("equipment");
    expect(equipmentTerms.length).toBeGreaterThan(0);
    expect(equipmentTerms.every((t) => t.category === "equipment")).toBe(true);
  });

  it("should get glossary term by id", () => {
    const term = getTermById("forehand");
    expect(term).toBeDefined();
    expect(term?.term).toBe("フォアハンド");
  });

  it("should return undefined for non-existent glossary term id", () => {
    const term = getTermById("non-existent");
    expect(term).toBeUndefined();
  });

  it("should search glossary terms by name", () => {
    const results = searchTerms("ハンド");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should search glossary terms by definition", () => {
    const results = searchTerms("ラケット");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should have at least one example for each glossary term", () => {
    GLOSSARY_TERMS.forEach((term) => {
      expect(term.examples.length).toBeGreaterThan(0);
    });
  });

  it("should have valid categories", () => {
    const validCategories = ["equipment", "table", "technique", "rule", "other"];
    GLOSSARY_TERMS.forEach((term) => {
      expect(validCategories).toContain(term.category);
    });
  });

  it("should have at least 25 glossary terms", () => {
    expect(GLOSSARY_TERMS.length).toBeGreaterThanOrEqual(25);
  });
});
