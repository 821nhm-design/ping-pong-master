import { describe, it, expect } from 'vitest';
import { proPlayers, proPlayerCategories } from './pro-players-data';

describe('Pro Players Data', () => {
  it('should have pro players data', () => {
    expect(proPlayers).toBeDefined();
    expect(proPlayers.length).toBeGreaterThan(0);
  });

  it('should have correct pro player structure', () => {
    const player = proPlayers[0];
    expect(player).toHaveProperty('id');
    expect(player).toHaveProperty('name');
    expect(player).toHaveProperty('country');
    expect(player).toHaveProperty('team');
    expect(player).toHaveProperty('worldRanking');
    expect(player).toHaveProperty('hand');
    expect(player).toHaveProperty('grip');
    expect(player).toHaveProperty('playingStyle');
    expect(player).toHaveProperty('tactics');
    expect(player).toHaveProperty('bio');
    expect(player).toHaveProperty('achievements');
  });

  it('should have 5 pro players', () => {
    expect(proPlayers.length).toBe(5);
  });

  it('should have tactics for each player', () => {
    proPlayers.forEach((player) => {
      expect(player.tactics).toBeDefined();
      expect(player.tactics.length).toBeGreaterThan(0);
      expect(player.tactics.length).toBeLessThanOrEqual(5);
    });
  });

  it('should have correct tactic structure', () => {
    const player = proPlayers[0];
    const tactic = player.tactics[0];
    expect(tactic).toHaveProperty('name');
    expect(tactic).toHaveProperty('description');
    expect(tactic).toHaveProperty('usage');
    expect(tactic).toHaveProperty('effectiveness');
  });

  it('should have valid effectiveness values', () => {
    proPlayers.forEach((player) => {
      player.tactics.forEach((tactic) => {
        expect(['high', 'medium', 'low']).toContain(tactic.effectiveness);
      });
    });
  });

  it('should have categories', () => {
    expect(proPlayerCategories).toBeDefined();
    expect(proPlayerCategories.length).toBeGreaterThan(0);
  });

  it('should have correct category structure', () => {
    const category = proPlayerCategories[0];
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
  });

  it('should have unique player IDs', () => {
    const ids = proPlayers.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have achievements for each player', () => {
    proPlayers.forEach((player) => {
      expect(player.achievements).toBeDefined();
      expect(player.achievements.length).toBeGreaterThan(0);
    });
  });
});
