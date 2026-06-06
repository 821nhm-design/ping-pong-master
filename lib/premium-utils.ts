import AsyncStorage from '@react-native-async-storage/async-storage';

export type PremiumPlan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'onetime';
  features: string[];
  description: string;
};

export type PremiumPurchase = {
  userId: string;
  purchaseDate: number;
  expiryDate: number | null; // 買い切り型なので null（永久アクセス）
  status: 'active' | 'expired';
};

export type PremiumFeature = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiresPremium: boolean;
};

const PURCHASE_KEY = 'ping_pong_purchase';
const TRIAL_KEY = 'ping_pong_trial';
const PREMIUM_FEATURES_KEY = 'ping_pong_premium_features';

// 買い切り型プレミアムプラン定義
export const PREMIUM_PLAN: PremiumPlan = {
  id: 'pro',
  name: 'Ping Pong Master Pro',
  price: 3580,
  currency: 'JPY',
  billingPeriod: 'onetime',
  features: [
    'すべてのコンテンツに無制限アクセス',
    'AI戦術分析機能',
    'プロ選手の全100名の情報',
    '動画解説',
    '練習記録管理',
    '永久アクセス（追加料金なし）',
  ],
  description: '一度の購入ですべてのコンテンツに永久アクセス。追加料金なし。',
};

// プレミアム機能定義
export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'all_techniques',
    name: 'すべての基本技術',
    description: '全16種類の基本技術にアクセス',
    icon: '🎯',
    requiresPremium: true,
  },
  {
    id: 'all_glossary',
    name: 'すべての用語辞典',
    description: '全127個の用語を検索・閲覧',
    icon: '📚',
    requiresPremium: true,
  },
  {
    id: 'all_practice_menus',
    name: 'すべての練習メニュー',
    description: '全37種類の練習メニュー',
    icon: '📋',
    requiresPremium: true,
  },
  {
    id: 'all_training',
    name: 'すべての体幹トレーニング',
    description: '全37種類の体幹トレーニング',
    icon: '💪',
    requiresPremium: true,
  },
  {
    id: 'all_pro_players',
    name: 'すべてのプロ選手情報',
    description: '世界ランキング全100名の詳細情報',
    icon: '⭐',
    requiresPremium: true,
  },
  {
    id: 'ai_analysis',
    name: 'AI戦術分析',
    description: 'AI による詳細な戦術分析',
    icon: '🤖',
    requiresPremium: true,
  },
  {
    id: 'video_lessons',
    name: '動画解説',
    description: 'プロ選手による動画解説',
    icon: '🎬',
    requiresPremium: true,
  },
  {
    id: 'practice_tracking',
    name: '練習記録管理',
    description: '練習の記録と進捗管理',
    icon: '📊',
    requiresPremium: true,
  },
  {
    id: 'basic_techniques',
    name: '基本技術（最初の5種類）',
    description: 'フォアハンド、バックハンド等の基本技術',
    icon: '🏓',
    requiresPremium: false,
  },
  {
    id: 'basic_glossary',
    name: '基本用語辞典（最初の30個）',
    description: '基本的な卓球用語の解説',
    icon: '📖',
    requiresPremium: false,
  },
];

/**
 * 7日間無料トライアルを開始
 */
export async function startFreeTrial(): Promise<void> {
  try {
    const trialData = {
      startDate: Date.now(),
      endDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7日間
    };
    await AsyncStorage.setItem(TRIAL_KEY, JSON.stringify(trialData));
  } catch (error) {
    console.error('Error starting free trial:', error);
  }
}

/**
 * 無料トライアル情報を取得
 */
export async function getFreeTrial(): Promise<{ startDate: number; endDate: number } | null> {
  try {
    const data = await AsyncStorage.getItem(TRIAL_KEY);
    if (!data) return null;

    const trial = JSON.parse(data);

    // 有効期限をチェック
    if (trial.endDate < Date.now()) {
      // 期限切れの場合は削除
      await removeFreeTrial();
      return null;
    }

    return trial;
  } catch (error) {
    console.error('Error getting free trial:', error);
    return null;
  }
}

/**
 * 無料トライアルを削除
 */
export async function removeFreeTrial(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TRIAL_KEY);
  } catch (error) {
    console.error('Error removing free trial:', error);
  }
}

/**
 * 無料トライアルが有効かチェック
 */
export async function isInFreeTrial(): Promise<boolean> {
  const trial = await getFreeTrial();
  return trial !== null;
}

/**
 * 無料トライアルの残り日数を計算
 */
export async function getFreeTrialRemainingDays(): Promise<number> {
  const trial = await getFreeTrial();

  if (!trial) {
    return 0;
  }

  const remainingMs = trial.endDate - Date.now();
  return Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
}

/**
 * 購入情報を保存（買い切り型）
 */
export async function savePurchase(userId: string): Promise<void> {
  try {
    const purchase: PremiumPurchase = {
      userId,
      purchaseDate: Date.now(),
      expiryDate: null, // 買い切り型なので永久アクセス
      status: 'active',
    };
    await AsyncStorage.setItem(PURCHASE_KEY, JSON.stringify(purchase));
  } catch (error) {
    console.error('Error saving purchase:', error);
  }
}

/**
 * 購入情報を取得
 */
export async function getPurchase(): Promise<PremiumPurchase | null> {
  try {
    const data = await AsyncStorage.getItem(PURCHASE_KEY);
    if (!data) return null;

    const purchase = JSON.parse(data);
    return purchase;
  } catch (error) {
    console.error('Error getting purchase:', error);
    return null;
  }
}

/**
 * 購入情報を削除
 */
export async function removePurchase(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PURCHASE_KEY);
  } catch (error) {
    console.error('Error removing purchase:', error);
  }
}

/**
 * ユーザーがプレミアムユーザーかチェック（購入済みまたは無料トライアル中）
 */
export async function isPremiumUser(): Promise<boolean> {
  // 購入済みかチェック
  const purchase = await getPurchase();
  if (purchase && purchase.status === 'active') {
    return true;
  }

  // 無料トライアル中かチェック
  const inTrial = await isInFreeTrial();
  return inTrial;
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
export function getPremiumPlan(): PremiumPlan {
  return PREMIUM_PLAN;
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
 * 無料版で見放題にするコンテンツ数を取得
 */
export const FREE_TIER_LIMITS = {
  techniques: 5, // 最初の5種類
  glossary: 30, // 最初の30個
  practiceMenus: 10, // 最初の10個
  training: 10, // 最初の10個
  proPlayers: 10, // ランキング1-10位
};

/**
 * 無料版でアクセス可能なコンテンツかチェック
 */
export async function canAccessContent(
  contentType: 'technique' | 'glossary' | 'practiceMenu' | 'training' | 'proPlayer',
  index: number
): Promise<boolean> {
  const isPremium = await isPremiumUser();
  if (isPremium) {
    return true; // プレミアムユーザーはすべてアクセス可能
  }

  // 無料版の制限をチェック
  const limits = FREE_TIER_LIMITS;
  switch (contentType) {
    case 'technique':
      return index < limits.techniques;
    case 'glossary':
      return index < limits.glossary;
    case 'practiceMenu':
      return index < limits.practiceMenus;
    case 'training':
      return index < limits.training;
    case 'proPlayer':
      return index < limits.proPlayers;
    default:
      return false;
  }
}
