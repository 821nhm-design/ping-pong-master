import AsyncStorage from '@react-native-async-storage/async-storage';

export type PremiumPlan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  description: string;
};

export type PremiumSubscription = {
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  startDate: number;
  endDate: number;
  autoRenew: boolean;
};

export type PremiumFeature = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiresPremium: boolean;
};

const SUBSCRIPTION_KEY = 'ping_pong_subscription';
const PREMIUM_FEATURES_KEY = 'ping_pong_premium_features';

// プレミアムプラン定義
export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'monthly',
    name: '月間プラン',
    price: 980,
    currency: 'JPY',
    billingPeriod: 'monthly',
    features: [
      '高度な戦術分析',
      'プロ選手の詳細動画解説',
      'ビデオレッスン（月10本まで）',
      '練習計画の自動生成',
      '優先サポート',
    ],
    description: '月ごとにキャンセル可能。いつでも解約できます。',
  },
  {
    id: 'yearly',
    name: '年間プラン',
    price: 9800,
    currency: 'JPY',
    billingPeriod: 'yearly',
    features: [
      '高度な戦術分析',
      'プロ選手の詳細動画解説',
      'ビデオレッスン（無制限）',
      '練習計画の自動生成',
      '優先サポート',
      '年間20%割引',
    ],
    description: '年間契約で20%お得。1年間のアクセス権を取得します。',
  },
];

// プレミアム機能定義
export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'advanced_tactics',
    name: '高度な戦術分析',
    description: 'AI による詳細な戦術分析と改善提案',
    icon: '🎯',
    requiresPremium: true,
  },
  {
    id: 'pro_videos',
    name: 'プロ選手の詳細動画解説',
    description: 'プロ選手による技術解説ビデオ',
    icon: '🎬',
    requiresPremium: true,
  },
  {
    id: 'video_lessons',
    name: 'ビデオレッスン',
    description: 'プロコーチによる実践的なレッスン動画',
    icon: '🎓',
    requiresPremium: true,
  },
  {
    id: 'practice_plan',
    name: '練習計画の自動生成',
    description: 'AI が最適な練習計画を自動生成',
    icon: '📋',
    requiresPremium: true,
  },
  {
    id: 'priority_support',
    name: '優先サポート',
    description: '24時間以内のサポート対応',
    icon: '💬',
    requiresPremium: true,
  },
  {
    id: 'basic_glossary',
    name: '基本用語辞典',
    description: '基本的な格闘技用語の解説',
    icon: '📚',
    requiresPremium: false,
  },
];

/**
 * サブスクリプション情報を保存
 */
export async function saveSubscription(subscription: PremiumSubscription): Promise<void> {
  try {
    await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
}

/**
 * サブスクリプション情報を取得
 */
export async function getSubscription(): Promise<PremiumSubscription | null> {
  try {
    const data = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
    if (!data) return null;

    const subscription = JSON.parse(data);

    // 有効期限をチェック
    if (subscription.endDate < Date.now()) {
      // 期限切れの場合は削除
      await removeSubscription();
      return null;
    }

    return subscription;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
}

/**
 * サブスクリプションを削除
 */
export async function removeSubscription(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SUBSCRIPTION_KEY);
  } catch (error) {
    console.error('Error removing subscription:', error);
  }
}

/**
 * ユーザーがプレミアムユーザーかチェック
 */
export async function isPremiumUser(): Promise<boolean> {
  const subscription = await getSubscription();
  return subscription !== null && subscription.status === 'active';
}

/**
 * 特定の機能がアンロックされているかチェック
 */
export async function isFeatureUnlocked(featureId: string): Promise<boolean> {
  const feature = PREMIUM_FEATURES.find((f) => f.id === featureId);

  if (!feature) {
    return false;
  }

  if (!feature.requiresPremium) {
    return true;
  }

  return isPremiumUser();
}

/**
 * プレミアムプランを取得
 */
export function getPremiumPlan(planId: string): PremiumPlan | undefined {
  return PREMIUM_PLANS.find((p) => p.id === planId);
}

/**
 * すべてのプレミアムプランを取得
 */
export function getAllPremiumPlans(): PremiumPlan[] {
  return PREMIUM_PLANS;
}

/**
 * プレミアム機能を取得
 */
export function getPremiumFeature(featureId: string): PremiumFeature | undefined {
  return PREMIUM_FEATURES.find((f) => f.id === featureId);
}

/**
 * すべてのプレミアム機能を取得
 */
export function getAllPremiumFeatures(): PremiumFeature[] {
  return PREMIUM_FEATURES;
}

/**
 * サブスクリプションの残り日数を計算
 */
export async function getRemainingDays(): Promise<number> {
  const subscription = await getSubscription();

  if (!subscription) {
    return 0;
  }

  const remainingMs = subscription.endDate - Date.now();
  return Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
}

/**
 * サブスクリプションの更新日を取得
 */
export async function getNextBillingDate(): Promise<Date | null> {
  const subscription = await getSubscription();

  if (!subscription) {
    return null;
  }

  return new Date(subscription.endDate);
}
