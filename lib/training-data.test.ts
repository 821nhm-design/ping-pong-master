import { describe, it, expect } from "vitest";
import {
  TRAINING_MENUS,
  TRAINING_CONCEPTS,
  SKILL_LEVELS,
  getTrainingMenusByLevel,
  getTrainingMenuById,
  getTrainingConceptById,
  searchTrainingMenus,
} from "./training-data";

describe("Training Data", () => {
  it("should have training menus", () => {
    expect(TRAINING_MENUS.length).toBeGreaterThan(0);
  });

  it("should have training concepts", () => {
    expect(TRAINING_CONCEPTS.length).toBeGreaterThan(0);
  });

  it("should have skill levels", () => {
    expect(SKILL_LEVELS.length).toBeGreaterThan(0);
  });

  it("should have all required fields in each training menu", () => {
    TRAINING_MENUS.forEach((menu) => {
      expect(menu).toHaveProperty("id");
      expect(menu).toHaveProperty("name");
      expect(menu).toHaveProperty("skillLevel");
      expect(menu).toHaveProperty("trainingType");
      expect(menu).toHaveProperty("duration");
      expect(menu).toHaveProperty("difficulty");
      expect(menu).toHaveProperty("description");
      expect(menu).toHaveProperty("objectives");
      expect(menu).toHaveProperty("procedure");
      expect(menu).toHaveProperty("tips");
      expect(menu).toHaveProperty("requiredEquipment");
      expect(menu).toHaveProperty("variations");
    });
  });

  it("should have all required fields in each training concept", () => {
    TRAINING_CONCEPTS.forEach((concept) => {
      expect(concept).toHaveProperty("id");
      expect(concept).toHaveProperty("name");
      expect(concept).toHaveProperty("description");
      expect(concept).toHaveProperty("overview");
      expect(concept).toHaveProperty("benefits");
      expect(concept).toHaveProperty("procedure");
      expect(concept).toHaveProperty("tips");
      expect(concept).toHaveProperty("examples");
    });
  });

  it("should filter training menus by skill level", () => {
    const beginnerMenus = getTrainingMenusByLevel("beginner");
    expect(beginnerMenus.length).toBeGreaterThan(0);
    expect(beginnerMenus.every((m) => m.skillLevel === "beginner")).toBe(true);
  });

  it("should get training menu by id", () => {
    const menu = getTrainingMenuById("beginner-basic-forehand");
    expect(menu).toBeDefined();
    expect(menu?.name).toBe("フォアハンド基本打ち");
  });

  it("should return undefined for non-existent training menu id", () => {
    const menu = getTrainingMenuById("non-existent");
    expect(menu).toBeUndefined();
  });

  it("should get training concept by id", () => {
    const concept = getTrainingConceptById("single-ball-training");
    expect(concept).toBeDefined();
    expect(concept?.name).toBe("1球練習");
  });

  it("should return undefined for non-existent training concept id", () => {
    const concept = getTrainingConceptById("non-existent");
    expect(concept).toBeUndefined();
  });

  it("should search training menus by name", () => {
    const results = searchTrainingMenus("ドライブ");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should search training menus by description", () => {
    const results = searchTrainingMenus("練習");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should have valid difficulty levels (1-5)", () => {
    TRAINING_MENUS.forEach((menu) => {
      expect(menu.difficulty).toBeGreaterThanOrEqual(1);
      expect(menu.difficulty).toBeLessThanOrEqual(5);
    });
  });

  it("should have at least one objective for each training menu", () => {
    TRAINING_MENUS.forEach((menu) => {
      expect(menu.objectives.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one procedure step for each training menu", () => {
    TRAINING_MENUS.forEach((menu) => {
      expect(menu.procedure.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one tip for each training menu", () => {
    TRAINING_MENUS.forEach((menu) => {
      expect(menu.tips.length).toBeGreaterThan(0);
    });
  });

  it("should have valid skill levels", () => {
    const validLevels = ["beginner", "intermediate", "advanced"];
    TRAINING_MENUS.forEach((menu) => {
      expect(validLevels).toContain(menu.skillLevel);
    });
  });

  it("should have valid training types", () => {
    const validTypes = ["single-ball", "multi-ball", "random", "match", "footwork"];
    TRAINING_MENUS.forEach((menu) => {
      expect(validTypes).toContain(menu.trainingType);
    });
  });

  it("should have at least one benefit for each training concept", () => {
    TRAINING_CONCEPTS.forEach((concept) => {
      expect(concept.benefits.length).toBeGreaterThan(0);
    });
  });

  it("should have at least one example for each training concept", () => {
    TRAINING_CONCEPTS.forEach((concept) => {
      expect(concept.examples.length).toBeGreaterThan(0);
    });
  });
});
