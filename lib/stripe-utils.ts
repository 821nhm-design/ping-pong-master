/**
 * Stripe統合ユーティリティ
 * プレミアム機能の支払い処理を管理
 */

export type PremiumFeature = 'advanced_tactics' | 'pro_analysis' | 'video_lessons';

export type PremiumPlan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: PremiumFeature[];
  description: string;
};

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'monthly',
    name: '月間プラン',
    price: 499,
    currency: 'JPY',
    features: ['advanced_tactics', 'pro_analysis', 'video_lessons'],
    description: '1ヶ月間、すべてのプレミアム機能が利用できます',
  },
  {
    id: 'yearly',
    name: '年間プラン',
    price: 4990,
    currency: 'JPY',
    features: ['advanced_tactics', 'pro_analysis', 'video_lessons'],
    description: '1年間、すべてのプレミアム機能が利用できます（2ヶ月分お得）',
  },
];

export type PremiumSubscription = {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  startDate: number;
  endDate: number;
  stripeSubscriptionId?: string;
};

/**
 * プレミアムプランを取得
 */
export function getPremiumPlan(planId: string): PremiumPlan | undefined {
  return PREMIUM_PLANS.find((plan) => plan.id === planId);
}

/**
 * サブスクリプションが有効かチェック
 */
export function isSubscriptionActive(subscription: PremiumSubscription): boolean {
  return (
    subscription.status === 'active' &&
    subscription.endDate > Date.now()
  );
}

/**
 * 機能がアンロックされているかチェック
 */
export function isFeatureUnlocked(
  subscription: PremiumSubscription | null,
  feature: PremiumFeature
): boolean {
  if (!subscription) return false;
  
  const plan = getPremiumPlan(subscription.planId);
  if (!plan) return false;
  
  return isSubscriptionActive(subscription) && plan.features.includes(feature);
}

/**
 * 支払い処理のシミュレーション（実装例）
 * 実際のStripe統合では、Stripe SDKを使用します
 */
export async function processPayment(
  planId: string,
  userEmail: string
): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
  try {
    // ここでStripe APIを呼び出します
    // 例: const response = await fetch('/api/create-subscription', { ... })
    
    // シミュレーション用の応答
    return {
      success: true,
      subscriptionId: `sub_${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * サブスクリプションをキャンセル
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // ここでStripe APIを呼び出します
    // 例: const response = await fetch('/api/cancel-subscription', { ... })
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
