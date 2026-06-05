import { describe, it, expect, beforeEach } from 'vitest';
import {
  PREMIUM_PLANS,
  PREMIUM_FEATURES,
  getPremiumPlan,
  getAllPremiumPlans,
  getPremiumFeature,
  getAllPremiumFeatures,
} from './premium-utils';

describe('Premium Utils', () => {
  describe('PREMIUM_PLANS', () => {
    it('should have monthly and yearly plans', () => {
      expect(PREMIUM_PLANS).toHaveLength(2);
      expect(PREMIUM_PLANS.map((p) => p.id)).toContain('monthly');
      expect(PREMIUM_PLANS.map((p) => p.id)).toContain('yearly');
    });

    it('monthly plan should have correct properties', () => {
      const monthly = PREMIUM_PLANS.find((p) => p.id === 'monthly');
      expect(monthly).toBeDefined();
      expect(monthly?.price).toBe(980);
      expect(monthly?.billingPeriod).toBe('monthly');
      expect(monthly?.features.length).toBeGreaterThan(0);
    });

    it('yearly plan should have correct properties', () => {
      const yearly = PREMIUM_PLANS.find((p) => p.id === 'yearly');
      expect(yearly).toBeDefined();
      expect(yearly?.price).toBe(9800);
      expect(yearly?.billingPeriod).toBe('yearly');
      expect(yearly?.features.length).toBeGreaterThan(0);
    });

    it('yearly plan should be cheaper per month than monthly', () => {
      const monthly = PREMIUM_PLANS.find((p) => p.id === 'monthly');
      const yearly = PREMIUM_PLANS.find((p) => p.id === 'yearly');

      if (monthly && yearly) {
        const monthlyPerMonth = monthly.price;
        const yearlyPerMonth = yearly.price / 12;
        expect(yearlyPerMonth).toBeLessThan(monthlyPerMonth);
      }
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
    it('should return monthly plan', () => {
      const plan = getPremiumPlan('monthly');
      expect(plan).toBeDefined();
      expect(plan?.id).toBe('monthly');
    });

    it('should return yearly plan', () => {
      const plan = getPremiumPlan('yearly');
      expect(plan).toBeDefined();
      expect(plan?.id).toBe('yearly');
    });

    it('should return undefined for non-existent plan', () => {
      const plan = getPremiumPlan('non-existent');
      expect(plan).toBeUndefined();
    });
  });

  describe('getAllPremiumPlans', () => {
    it('should return all plans', () => {
      const plans = getAllPremiumPlans();
      expect(plans).toHaveLength(PREMIUM_PLANS.length);
    });

    it('should return array of plans', () => {
      const plans = getAllPremiumPlans();
      expect(Array.isArray(plans)).toBe(true);
    });
  });

  describe('getPremiumFeature', () => {
    it('should return feature by id', () => {
      const feature = getPremiumFeature('advanced_tactics');
      expect(feature).toBeDefined();
      expect(feature?.id).toBe('advanced_tactics');
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
});
