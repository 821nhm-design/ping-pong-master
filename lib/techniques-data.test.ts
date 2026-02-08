import { describe, it, expect } from "vitest";
import {
  TECHNIQUES,
  CATEGORIES,
  getTechniquesByCategory,
  getTechniqueById,
  searchTechniques,
} from "./techniques-data";

describe("Techniques Data", () => {
  it("should have all techniques", () => {
    expect(TECHNIQUES.length).toBeGreaterThan(0);
  });

  it("should have multiple categories", () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("should have all required fields in each technique", () => {
    TECHNIQUES.forEach((technique) => {
      expect(technique).toHaveProperty("id");
      expect(technique).toHaveProperty("name");
      expect(technique).toHaveProperty("category");
      expect(technique).toHaveProperty("description");
      expect(technique).toHaveProperty("difficulty");
      expect(technique).toHaveProperty("learningTime");
      expect(technique).toHaveProperty("overview");
      expect(technique).toHaveProperty("steps");
      expect(technique).toHaveProperty("tips");
      expect(technique).toHaveProperty("proPlayers");
    });
  });

  it("should filter techniques by category", () => {
    const attackTechniques = getTechniquesByCategory("attack");
    expect(attackTechniques.length).toBeGreaterThan(0);
    expect(attackTechniques.every((t) => t.category === "attack")).toBe(true);
  });

  it("should get technique by id", () => {
    const technique = getTechniqueById("drive");
    expect(technique).toBeDefined();
    expect(technique?.name).toBe("ドライブ");
    expect(technique?.category).toBe("attack");
  });

  it("should return undefined for non-existent technique id", () => {
    const technique = getTechniqueById("non-existent");
    expect(technique).toBeUndefined();
  });

  it("should search techniques by name", () => {
    const results = searchTechniques("ドライブ");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((t) => t.name.includes("ドライブ"))).toBe(true);
  });

  it("should search techniques by description", () => {
    const results = searchTechniques("攻撃");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should have valid difficulty levels (1-5)", () => {
    TECHNIQUES.forEach((technique) => {
      expect(technique.difficulty).toBeGreaterThanOrEqual(1);
      expect(technique.difficulty).toBeLessThanOrEqual(5);
    });
  });

  it("should have at least one step for each technique", () => {
    TECHNIQUES.forEach((technique) => {
      expect(technique.steps.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one tip for each technique", () => {
    TECHNIQUES.forEach((technique) => {
      expect(technique.tips.length).toBeGreaterThan(0);
    });
  });

  it("should have valid category ids", () => {
    const validCategories = ["attack", "tabletop", "defense", "serve", "other"];
    TECHNIQUES.forEach((technique) => {
      expect(validCategories).toContain(technique.category);
    });
  });

  it("should have category colors in hex format", () => {
    CATEGORIES.forEach((category) => {
      expect(category.color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});
