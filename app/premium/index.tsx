import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { PREMIUM_PLANS, isPremiumUser, getRemainingDays } from '@/lib/premium-utils';
import { createCheckoutSession } from '@/lib/stripe-client';
import { getCurrentUser } from '@/lib/auth-utils';

export default function PremiumScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkPremiumStatus();
    loadUser();
  }, []);

  const checkPremiumStatus = async () => {
    const premium = await isPremiumUser();
    setIsPremium(premium);

    if (premium) {
      const days = await getRemainingDays();
      setRemainingDays(days);
    }
  };

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handlePurchase = async (planId: string) => {
    if (!user) {
      alert('ログインしてください');
      return;
    }

    setSelectedPlan(planId);
    setLoading(true);

    try {
      const result = await createCheckoutSession(planId, user.email, user.id);

      if (result.success && result.checkoutUrl) {
        alert(`決済ページを開きます: ${result.checkoutUrl}`);
      } else {
        alert('決済セッションの作成に失敗しました');
      }
    } catch (error) {
      alert('エラーが発生しました');
      console.error(error);
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* ヘッダー */}
        <View className="bg-primary px-4 pt-6 pb-8">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-semibold text-lg">← 戻る</Text>
          </Pressable>
          <Text className="text-white text-4xl font-bold mb-2">プレミアム</Text>
          <Text className="text-white opacity-90 text-base">
            すべての機能をアンロック
          </Text>
        </View>

        {/* 現在のステータス */}
        {isPremium && (
          <View className="bg-success bg-opacity-10 border border-success mx-4 mt-6 rounded-lg p-4">
            <Text className="text-success font-bold text-lg mb-2">✓ プレミアム会員</Text>
            <Text className="text-success text-sm">
              残り {remainingDays} 日間のアクセス権があります
            </Text>
          </View>
        )}

        {/* プランセクション */}
        <View className="px-4 py-8">
          <Text className="text-2xl font-bold text-foreground mb-6">
            プランを選択
          </Text>

          {PREMIUM_PLANS.map((plan) => (
            <View
              key={plan.id}
              style={{
                backgroundColor: plan.id === 'yearly' ? '#FFF3E0' : '#FFFFFF',
                borderWidth: 2,
                borderColor: plan.id === 'yearly' ? '#FF6B35' : '#E5E7EB',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              {/* プラン名と価格 */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-foreground">
                    {plan.name}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {plan.description}
                  </Text>
                </View>
                {plan.id === 'yearly' && (
                  <View className="bg-primary px-3 py-1 rounded-full ml-4">
                    <Text className="text-white text-xs font-bold">
                      20%OFF
                    </Text>
                  </View>
                )}
              </View>

              {/* 価格 */}
              <View className="mb-4">
                <Text className="text-3xl font-bold text-primary">
                  ¥{plan.price.toLocaleString()}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  {plan.billingPeriod === 'monthly' ? '毎月' : '毎年'}
                </Text>
              </View>

              {/* 機能リスト */}
              <View className="mb-6 gap-2">
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center gap-2">
                    <Text className="text-primary">✓</Text>
                    <Text className="text-sm text-foreground flex-1">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              {/* 購入ボタン */}
              <Pressable
                onPress={() => handlePurchase(plan.id)}
                disabled={loading && selectedPlan === plan.id}
                style={({ pressed }) => [
                  {
                    backgroundColor: '#FF6B35',
                    paddingVertical: 12,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                {loading && selectedPlan === plan.id ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-center font-bold">
                    {isPremium ? '変更する' : '購入する'}
                  </Text>
                )}
              </Pressable>
            </View>
          ))}
        </View>

        {/* 機能説明セクション */}
        <View className="px-4 py-8 border-t border-border">
          <Text className="text-2xl font-bold text-foreground mb-6">
            プレミアム機能
          </Text>

          <View className="gap-4">
            <View className="flex-row gap-3">
              <Text className="text-3xl">🎯</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">高度な戦術分析</Text>
                <Text className="text-sm text-muted mt-1">
                  AI による詳細な戦術分析と改善提案
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">🎬</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  プロ選手の詳細動画解説
                </Text>
                <Text className="text-sm text-muted mt-1">
                  プロ選手による技術解説ビデオ
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">🎓</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  ビデオレッスン
                </Text>
                <Text className="text-sm text-muted mt-1">
                  プロコーチによる実践的なレッスン動画
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">📋</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  練習計画の自動生成
                </Text>
                <Text className="text-sm text-muted mt-1">
                  AI が最適な練習計画を自動生成
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQ セクション */}
        <View className="px-4 py-8 border-t border-border">
          <Text className="text-2xl font-bold text-foreground mb-6">
            よくある質問
          </Text>

          <View className="gap-4">
            <View>
              <Text className="font-bold text-foreground mb-2">
                いつでもキャンセルできますか？
              </Text>
              <Text className="text-sm text-muted">
                はい、いつでもキャンセルできます。キャンセル後、現在の請求期間が終了するまでアクセスできます。
              </Text>
            </View>

            <View>
              <Text className="font-bold text-foreground mb-2">
                支払い方法は何ですか？
              </Text>
              <Text className="text-sm text-muted">
                クレジットカード、デビットカード、その他の主要な支払い方法に対応しています。
              </Text>
            </View>

            <View>
              <Text className="font-bold text-foreground mb-2">
                返金はできますか？
              </Text>
              <Text className="text-sm text-muted">
                購入から30日以内であれば、全額返金いたします。サポートまでお問い合わせください。
              </Text>
            </View>
          </View>
        </View>

        {/* フッター */}
        <View className="px-4 py-8 border-t border-border">
          <Text className="text-xs text-muted text-center">
            プレミアムプランは自動更新されます。いつでもキャンセルできます。
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
