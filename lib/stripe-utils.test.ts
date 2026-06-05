import { describe, it, expect } from 'vitest';
import {
  getPremiumPlan,
  isSubscriptionActive,
  isFeatureUnlocked,
  PREMIUM_PLANS,
  PremiumSubscription,
} from './stripe-utils';

describe('stripe-utils', () => {
  it('should get premium plan by id', () => {
    const plan = getPremiumPlan('monthly');
    expect(plan).toBeDefined();
    expect(plan?.name).toBe('月間プラン');
    expect(plan?.price).toBe(499);
  });

  it('should return undefined for invalid plan id', () => {
    const plan = getPremiumPlan('invalid');
    expect(plan).toBeUndefined();
  });

  it('should check if subscription is active', () => {
    const now = Date.now();
    const activeSubscription: PremiumSubscription = {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'monthly',
      status: 'active',
      startDate: now - 86400000, // 1日前
      endDate: now + 86400000, // 1日後
    };

    expect(isSubscriptionActive(activeSubscription)).toBe(true);
  });

  it('should check if subscription is expired', () => {
    const now = Date.now();
    const expiredSubscription: PremiumSubscription = {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'monthly',
      status: 'active',
      startDate: now - 86400000 * 2,
      endDate: now - 86400000, // 1日前に終了
    };

    expect(isSubscriptionActive(expiredSubscription)).toBe(false);
  });

  it('should check if subscription is canceled', () => {
    const now = Date.now();
    const canceledSubscription: PremiumSubscription = {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'monthly',
      status: 'canceled',
      startDate: now - 86400000,
      endDate: now + 86400000,
    };

    expect(isSubscriptionActive(canceledSubscription)).toBe(false);
  });

  it('should check if feature is unlocked', () => {
    const now = Date.now();
    const subscription: PremiumSubscription = {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'monthly',
      status: 'active',
      startDate: now - 86400000,
      endDate: now + 86400000,
    };

    expect(isFeatureUnlocked(subscription, 'advanced_tactics')).toBe(true);
    expect(isFeatureUnlocked(subscription, 'pro_analysis')).toBe(true);
    expect(isFeatureUnlocked(subscription, 'video_lessons')).toBe(true);
  });

  it('should not unlock feature for null subscription', () => {
    expect(isFeatureUnlocked(null, 'advanced_tactics')).toBe(false);
  });

  it('should not unlock feature for expired subscription', () => {
    const now = Date.now();
    const expiredSubscription: PremiumSubscription = {
      id: 'sub-1',
      userId: 'user-1',
      planId: 'monthly',
      status: 'active',
      startDate: now - 86400000 * 2,
      endDate: now - 86400000,
    };

    expect(isFeatureUnlocked(expiredSubscription, 'advanced_tactics')).toBe(false);
  });

  it('should have correct premium plans', () => {
    expect(PREMIUM_PLANS).toHaveLength(2);
    expect(PREMIUM_PLANS[0].id).toBe('monthly');
    expect(PREMIUM_PLANS[1].id).toBe('yearly');
  });

  it('should have all features in plans', () => {
    PREMIUM_PLANS.forEach((plan) => {
      expect(plan.features).toContain('advanced_tactics');
      expect(plan.features).toContain('pro_analysis');
      expect(plan.features).toContain('video_lessons');
    });
  });
});
