import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  PREMIUM_PLAN,
  PREMIUM_FEATURES,
  getPremiumPlan,
  getPremiumFeature,
  getAllPremiumFeatures,
  FREE_TIER_LIMITS,
  startFreeTrial,
  removeFreeTrial,
  isInFreeTrial,
  getFreeTrialRemainingDays,
  savePurchase,
  getPurchase,
  removePurchase,
  isPremiumUser,
  isFeatureUnlocked,
  canAccessContent,
} from './premium-utils';

describe('Premium Utils - Buy Once Model', () => {
  afterEach(async () => {
    // クリーンアップ
    await removeFreeTrial();
    await removePurchase();
  });

  describe('PREMIUM_PLAN', () => {
    it('should have correct plan properties', () => {
      expect(PREMIUM_PLAN.id).toBe('pro');
      expect(PREMIUM_PLAN.price).toBe(3580);
      expect(PREMIUM_PLAN.currency).toBe('JPY');
      expect(PREMIUM_PLAN.billingPeriod).toBe('onetime');
      expect(PREMIUM_PLAN.features.length).toBeGreaterThan(0);
    });

    it('should have permanent access feature', () => {
      expect(PREMIUM_PLAN.features).toContain('永久アクセス（追加料金なし）');
    });
  });

  describe('PREMIUM_FEATURES', () => {
    it('should have multiple premium features', () => {
      expect(PREMIUM_FEATURES.length).toBeGreaterThan(0);
    });

    it('should have features with correct properties', () => {
      PREMIUM_FEATURES.forEach((feature) => {
        expect(feature.id).toBeDefined();
        expect(feature.name).toBeDefined();
        expect(feature.description).toBeDefined();
        expect(feature.icon).toBeDefined();
        expect(typeof feature.requiresPremium).toBe('boolean');
      });
    });

    it('should have at least one free feature', () => {
      const freeFeatures = PREMIUM_FEATURES.filter((f) => !f.requiresPremium);
      expect(freeFeatures.length).toBeGreaterThan(0);
    });

    it('should have at least one premium feature', () => {
      const premiumFeatures = PREMIUM_FEATURES.filter((f) => f.requiresPremium);
      expect(premiumFeatures.length).toBeGreaterThan(0);
    });
  });

  describe('getPremiumPlan', () => {
    it('should return the pro plan', () => {
      const plan = getPremiumPlan();
      expect(plan).toBeDefined();
      expect(plan.id).toBe('pro');
      expect(plan.price).toBe(3580);
    });
  });

  describe('getPremiumFeature', () => {
    it('should return feature by id', () => {
      const feature = getPremiumFeature('all_techniques');
      expect(feature).toBeDefined();
      expect(feature?.id).toBe('all_techniques');
    });

    it('should return undefined for non-existent feature', () => {
      const feature = getPremiumFeature('non-existent');
      expect(feature).toBeUndefined();
    });
  });

  describe('getAllPremiumFeatures', () => {
    it('should return all features', () => {
      const features = getAllPremiumFeatures();
      expect(features).toHaveLength(PREMIUM_FEATURES.length);
    });

    it('should return array of features', () => {
      const features = getAllPremiumFeatures();
      expect(Array.isArray(features)).toBe(true);
    });
  });

  describe('FREE_TIER_LIMITS', () => {
    it('should have correct limits', () => {
      expect(FREE_TIER_LIMITS.techniques).toBe(5);
      expect(FREE_TIER_LIMITS.glossary).toBe(30);
      expect(FREE_TIER_LIMITS.practiceMenus).toBe(10);
      expect(FREE_TIER_LIMITS.training).toBe(10);
      expect(FREE_TIER_LIMITS.proPlayers).toBe(10);
    });
  });

  describe('Free Trial', () => {
    it('should start free trial', async () => {
      await startFreeTrial();
      const inTrial = await isInFreeTrial();
      expect(inTrial).toBe(true);
    });

    it('should get free trial remaining days', async () => {
      await startFreeTrial();
      const days = await getFreeTrialRemainingDays();
      expect(days).toBeGreaterThan(0);
      expect(days).toBeLessThanOrEqual(7);
    });

    it('should remove free trial', async () => {
      await startFreeTrial();
      await removeFreeTrial();
      const inTrial = await isInFreeTrial();
      expect(inTrial).toBe(false);
    });
  });

  describe('Purchase', () => {
    it('should save purchase', async () => {
      await savePurchase('user123');
      const purchase = await getPurchase();
      expect(purchase).toBeDefined();
      expect(purchase?.userId).toBe('user123');
      expect(purchase?.status).toBe('active');
      expect(purchase?.expiryDate).toBeNull();
    });

    it('should get purchase', async () => {
      await savePurchase('user123');
      const purchase = await getPurchase();
      expect(purchase?.userId).toBe('user123');
    });

    it('should remove purchase', async () => {
      await savePurchase('user123');
      await removePurchase();
      const purchase = await getPurchase();
      expect(purchase).toBeNull();
    });
  });

  describe('isPremiumUser', () => {
    it('should return true if purchased', async () => {
      await savePurchase('user123');
      const isPremium = await isPremiumUser();
      expect(isPremium).toBe(true);
    });

    it('should return true if in free trial', async () => {
      await startFreeTrial();
      const isPremium = await isPremiumUser();
      expect(isPremium).toBe(true);
    });

    it('should return false if not purchased and not in trial', async () => {
      const isPremium = await isPremiumUser();
      expect(isPremium).toBe(false);
    });
  });

  describe('isFeatureUnlocked', () => {
    it('should unlock free features for all users', async () => {
      const unlocked = await isFeatureUnlocked('basic_techniques');
      expect(unlocked).toBe(true);
    });

    it('should unlock premium features for premium users', async () => {
      await savePurchase('user123');
      const unlocked = await isFeatureUnlocked('all_techniques');
      expect(unlocked).toBe(true);
    });

    it('should not unlock premium features for free users', async () => {
      const unlocked = await isFeatureUnlocked('all_techniques');
      expect(unlocked).toBe(false);
    });

    it('should unlock premium features for trial users', async () => {
      await startFreeTrial();
      const unlocked = await isFeatureUnlocked('all_techniques');
      expect(unlocked).toBe(true);
    });
  });

  describe('canAccessContent', () => {
    it('should allow access to limited content for free users', async () => {
      // 最初の5つの技術にはアクセス可能
      for (let i = 0; i < 5; i++) {
        const canAccess = await canAccessContent('technique', i);
        expect(canAccess).toBe(true);
      }

      // 6番目の技術にはアクセス不可
      const canAccess = await canAccessContent('technique', 5);
      expect(canAccess).toBe(false);
    });

    it('should allow access to all content for premium users', async () => {
      await savePurchase('user123');

      // すべての技術にアクセス可能
      for (let i = 0; i < 16; i++) {
        const canAccess = await canAccessContent('technique', i);
        expect(canAccess).toBe(true);
      }
    });

    it('should respect glossary limits for free users', async () => {
      // 最初の30個にはアクセス可能
      for (let i = 0; i < 30; i++) {
        const canAccess = await canAccessContent('glossary', i);
        expect(canAccess).toBe(true);
      }

      // 31番目にはアクセス不可
      const canAccess = await canAccessContent('glossary', 30);
      expect(canAccess).toBe(false);
    });

    it('should respect pro player limits for free users', async () => {
      // ランキング1-10位にはアクセス可能
      for (let i = 0; i < 10; i++) {
        const canAccess = await canAccessContent('proPlayer', i);
        expect(canAccess).toBe(true);
      }

      // 11位以降にはアクセス不可
      const canAccess = await canAccessContent('proPlayer', 10);
      expect(canAccess).toBe(false);
    });
  });
});
