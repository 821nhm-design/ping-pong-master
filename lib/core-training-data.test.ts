import { describe, it, expect } from "vitest";
import {
  CORE_TRAINING_MENUS,
  SKILL_LEVELS,
  getCoreTrainingMenusByLevel,
  getCoreTrainingMenuById,
  searchCoreTrainingMenus,
} from "./core-training-data";

describe("Core Training Data", () => {
  it("should have core training menus", () => {
    expect(CORE_TRAINING_MENUS.length).toBeGreaterThan(0);
  });

  it("should have skill levels", () => {
    expect(SKILL_LEVELS.length).toBeGreaterThan(0);
  });

  it("should have all required fields in each core training menu", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu).toHaveProperty("id");
      expect(menu).toHaveProperty("name");
      expect(menu).toHaveProperty("skillLevel");
      expect(menu).toHaveProperty("duration");
      expect(menu).toHaveProperty("difficulty");
      expect(menu).toHaveProperty("description");
      expect(menu).toHaveProperty("objectives");
      expect(menu).toHaveProperty("procedure");
      expect(menu).toHaveProperty("tips");
      expect(menu).toHaveProperty("requiredEquipment");
      expect(menu).toHaveProperty("variations");
      expect(menu).toHaveProperty("benefits");
    });
  });

  it("should filter core training menus by skill level", () => {
    const beginnerMenus = getCoreTrainingMenusByLevel("beginner");
    expect(beginnerMenus.length).toBeGreaterThan(0);
    expect(beginnerMenus.every((m) => m.skillLevel === "beginner")).toBe(true);
  });

  it("should get core training menu by id", () => {
    const menu = getCoreTrainingMenuById("beginner-plank");
    expect(menu).toBeDefined();
    expect(menu?.name).toBe("プランク（基本）");
  });

  it("should return undefined for non-existent core training menu id", () => {
    const menu = getCoreTrainingMenuById("non-existent");
    expect(menu).toBeUndefined();
  });

  it("should search core training menus by name", () => {
    const results = searchCoreTrainingMenus("プランク");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should search core training menus by description", () => {
    const results = searchCoreTrainingMenus("体幹");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should have valid difficulty levels (1-5)", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu.difficulty).toBeGreaterThanOrEqual(1);
      expect(menu.difficulty).toBeLessThanOrEqual(5);
    });
  });

  it("should have at least one objective for each core training menu", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu.objectives.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one procedure step for each core training menu", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu.procedure.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one tip for each core training menu", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu.tips.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one benefit for each core training menu", () => {
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(menu.benefits.length).toBeGreaterThan(0);
    });
  });

  it("should have valid skill levels", () => {
    const validLevels = ["beginner", "intermediate", "advanced"];
    CORE_TRAINING_MENUS.forEach((menu) => {
      expect(validLevels).toContain(menu.skillLevel);
    });
  });

  it("should have at least 10 core training menus", () => {
    expect(CORE_TRAINING_MENUS.length).toBeGreaterThanOrEqual(10);
  });

  it("should have menus for each skill level", () => {
    const beginnerMenus = getCoreTrainingMenusByLevel("beginner");
    const intermediateMenus = getCoreTrainingMenusByLevel("intermediate");
    const advancedMenus = getCoreTrainingMenusByLevel("advanced");

    expect(beginnerMenus.length).toBeGreaterThan(0);
    expect(intermediateMenus.length).toBeGreaterThan(0);
    expect(advancedMenus.length).toBeGreaterThan(0);
  });
});
