import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { PREMIUM_PLAN, isPremiumUser, getPurchase, startFreeTrial, isInFreeTrial } from '@/lib/premium-utils';
import { createCheckoutSession } from '@/lib/stripe-client';
import { getCurrentUser } from '@/lib/auth-utils';

export default function PremiumScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [inTrial, setInTrial] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
    loadUser();
  }, []);

  const checkPremiumStatus = async () => {
    const premium = await isPremiumUser();
    setIsPremium(premium);

    const trial = await isInFreeTrial();
    setInTrial(trial);
  };

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handleStartTrial = async () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }

    setLoading(true);
    try {
      await startFreeTrial();
      setInTrial(true);
      setIsPremium(true);
      alert('7日間の無料トライアルを開始しました！');
    } catch (error) {
      alert('エラーが発生しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }

    setLoading(true);

    try {
      const result = await createCheckoutSession('pro', user.email, user.id);

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
            {inTrial ? (
              <Text className="text-success text-sm">
                7日間の無料トライアル中です
              </Text>
            ) : (
              <Text className="text-success text-sm">
                永久アクセス（買い切り型）
              </Text>
            )}
          </View>
        )}

        {/* プランセクション */}
        <View className="px-4 py-8">
          <Text className="text-2xl font-bold text-foreground mb-6">
            Ping Pong Master Pro
          </Text>

          <View
            style={{
              backgroundColor: '#FFF3E0',
              borderWidth: 2,
              borderColor: '#FF6B35',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            {/* プラン名と価格 */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-foreground">
                    {PREMIUM_PLAN.name}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {PREMIUM_PLAN.description}
                  </Text>
                </View>
                <View className="bg-primary px-3 py-1 rounded-full ml-4">
                  <Text className="text-white text-xs font-bold">
                    買い切り型
                  </Text>
                </View>
              </View>

              {/* 価格 */}
              <View className="mb-4">
                <Text className="text-4xl font-bold text-primary">
                  ¥{PREMIUM_PLAN.price.toLocaleString()}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  一度の支払いで永久アクセス
                </Text>
              </View>
            </View>

            {/* 機能リスト */}
            <View className="mb-6 gap-2">
              {PREMIUM_PLAN.features.map((feature: string, index: number) => (
                <View key={index} className="flex-row items-center gap-2">
                  <Text className="text-primary">✓</Text>
                  <Text className="text-sm text-foreground flex-1">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* 購入ボタン */}
            {!isPremium && (
              <>
                <Pressable
                  onPress={handlePurchase}
                  disabled={loading}
                  style={({ pressed }) => [
                    {
                      backgroundColor: '#FF6B35',
                      paddingVertical: 12,
                      borderRadius: 8,
                      marginBottom: 12,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-white text-center font-bold text-lg">
                      購入する - ¥{PREMIUM_PLAN.price.toLocaleString()}
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleStartTrial}
                  disabled={loading}
                  style={({ pressed }) => [
                    {
                      backgroundColor: '#FFFFFF',
                      borderWidth: 2,
                      borderColor: '#FF6B35',
                      paddingVertical: 12,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-primary text-center font-bold text-lg">
                    7日間無料で試す
                  </Text>
                </Pressable>
              </>
            )}
          </View>
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
                <Text className="font-bold text-foreground">すべてのコンテンツ</Text>
                <Text className="text-sm text-muted mt-1">
                  基本技術16種類、用語辞典127個、練習メニュー37個、体幹トレーニング37個
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">⭐</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  プロ選手情報（全100名）
                </Text>
                <Text className="text-sm text-muted mt-1">
                  世界ランキング上位100名の詳細情報と戦術分析
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">🤖</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  AI戦術分析
                </Text>
                <Text className="text-sm text-muted mt-1">
                  AI による詳細な戦術分析と改善提案
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">🎬</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  動画解説
                </Text>
                <Text className="text-sm text-muted mt-1">
                  プロ選手による技術解説ビデオ
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">📊</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  練習記録管理
                </Text>
                <Text className="text-sm text-muted mt-1">
                  練習の記録と進捗管理
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Text className="text-3xl">♾️</Text>
              <View className="flex-1">
                <Text className="font-bold text-foreground">
                  永久アクセス
                </Text>
                <Text className="text-sm text-muted mt-1">
                  追加料金なし。一度購入すればずっと使用可能
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
                買い切り型とは何ですか？
              </Text>
              <Text className="text-sm text-muted">
                一度の支払いで、永久にすべての機能にアクセスできます。毎月の支払いは不要です。
              </Text>
            </View>

            <View>
              <Text className="font-bold text-foreground mb-2">
                7日間無料トライアルとは？
              </Text>
              <Text className="text-sm text-muted">
                購入前に7日間、すべての機能を無料で試すことができます。その後、購入するか決めることができます。
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

            <View>
              <Text className="font-bold text-foreground mb-2">
                将来、新しいコンテンツが追加されたら？
              </Text>
              <Text className="text-sm text-muted">
                新しいコンテンツが追加されても、追加料金は不要です。永久にアクセスできます。
              </Text>
            </View>
          </View>
        </View>

        {/* フッター */}
        <View className="px-4 py-8 border-t border-border">
          <Text className="text-xs text-muted text-center">
            安全な決済システムを使用しています。ご不明な点はサポートまでお問い合わせください。
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
