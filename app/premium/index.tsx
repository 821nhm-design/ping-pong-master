import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { PREMIUM_PLANS, PremiumPlan } from '@/lib/stripe-utils';

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (plan: PremiumPlan) => {
    setLoading(true);
    try {
      // Stripe支払い処理をここに実装
      // const result = await processPayment(plan.id, userEmail);
      
      // シミュレーション用の遅延
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert(`${plan.name}を購入しました！`);
    } catch (error) {
      alert('購入処理に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View className="mb-6">
          <Text style={{ color: '#000000' }} className="text-3xl font-bold mb-2">
            プレミアム機能
          </Text>
          <Text style={{ color: '#999999' }} className="text-base">
            高度な戦術分析とプロ選手の詳細解説を利用できます
          </Text>
        </View>

        {/* 機能紹介 */}
        <View className="bg-surface rounded-lg p-4 mb-6 border border-border">
          <View className="mb-4">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-2">
              📊 高度な戦術分析
            </Text>
            <Text style={{ color: '#333333' }} className="text-sm leading-relaxed">
              プロ選手の戦術をより詳しく分析し、試合での応用方法を学べます
            </Text>
          </View>

          <View className="mb-4">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-2">
              🎥 プロ選手の詳細解説
            </Text>
            <Text style={{ color: '#333333' }} className="text-sm leading-relaxed">
              世界トップ選手の技術と戦術を、動画付きで詳しく解説します
            </Text>
          </View>

          <View>
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-2">
              📚 ビデオレッスン
            </Text>
            <Text style={{ color: '#333333' }} className="text-sm leading-relaxed">
              段階的なビデオレッスンで、初心者から上級者まで学習できます
            </Text>
          </View>
        </View>

        {/* プランの選択 */}
        <View className="mb-6">
          <Text style={{ color: '#000000' }} className="text-xl font-bold mb-4">
            プランを選択
          </Text>

          {PREMIUM_PLANS.map((plan) => (
            <Pressable
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              style={({ pressed }) => [
                {
                  backgroundColor: selectedPlan === plan.id ? '#FFF0E6' : '#FFFFFF',
                  borderWidth: 2,
                  borderColor: selectedPlan === plan.id ? '#FF6B35' : '#E5E7EB',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text style={{ color: '#000000' }} className="text-lg font-bold">
                  {plan.name}
                </Text>
                <Text style={{ color: '#FF6B35' }} className="text-2xl font-bold">
                  ¥{plan.price.toLocaleString()}
                </Text>
              </View>

              <Text style={{ color: '#333333' }} className="text-sm mb-3">
                {plan.description}
              </Text>

              <View className="gap-2">
                {plan.features.map((feature, idx) => (
                  <Text key={idx} style={{ color: '#666666' }} className="text-sm">
                    ✓ {getFeatureLabel(feature)}
                  </Text>
                ))}
              </View>
            </Pressable>
          ))}
        </View>

        {/* 購入ボタン */}
        {selectedPlan && (
          <Pressable
            onPress={() => {
              const plan = PREMIUM_PLANS.find((p) => p.id === selectedPlan);
              if (plan) handlePurchase(plan);
            }}
            disabled={loading}
            style={({ pressed }) => [
              {
                backgroundColor: loading ? '#CCCCCC' : '#FF6B35',
                paddingVertical: 16,
                borderRadius: 8,
                marginBottom: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? '処理中...' : '購入する'}
            </Text>
          </Pressable>
        )}

        {/* 利用規約 */}
        <View className="bg-surface rounded-lg p-4 mb-6">
          <Text style={{ color: '#666666' }} className="text-xs leading-relaxed">
            • 購入後、すぐにプレミアム機能が利用できます
            {'\n'}• いつでもキャンセルできます
            {'\n'}• 返金は利用規約に従います
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function getFeatureLabel(feature: string): string {
  const labels: Record<string, string> = {
    advanced_tactics: '高度な戦術分析',
    pro_analysis: 'プロ選手の詳細解説',
    video_lessons: 'ビデオレッスン',
  };
  return labels[feature] || feature;
}
