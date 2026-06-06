import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter, useFocusEffect } from 'expo-router';
import { getCurrentUser, logout } from '@/lib/auth-utils';
import { isPremiumUser, getPurchase, getFreeTrialRemainingDays } from '@/lib/premium-utils';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
  const [trialRemainingDays, setTrialRemainingDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadProfileData();
    }, [])
  );

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const premium = await isPremiumUser();
        setIsPremium(premium);

        if (premium) {
          const purchase = await getPurchase();
          if (purchase) {
            setPurchaseDate(new Date(purchase.purchaseDate));
          } else {
            // 無料トライアル中の場合
            const days = await getFreeTrialRemainingDays();
            setTrialRemainingDays(days);
          }
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      alert('ログアウトに失敗しました');
    } finally {
      setLoggingOut(false);
    }
  };

  const handleUpgradePremium = () => {
    router.push('/premium');
  };

  const handleManageSubscription = () => {
    // サブスクリプション管理画面へ遷移
    alert('サブスクリプション管理画面は後で実装します');
  };

  if (!user) {
    return (
      <ScreenContainer className="p-4 flex-1 items-center justify-center">
        <Text className="text-foreground text-lg">ログインしてください</Text>
        <Pressable
          onPress={() => router.replace('/auth/login')}
          className="mt-4 bg-primary px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">ログイン</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  if (loading) {
    return (
      <ScreenContainer className="p-4 flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF6B35" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* ヘッダー */}
        <View className="bg-primary px-4 pt-6 pb-8">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-semibold text-lg">← 戻る</Text>
          </Pressable>
          <Text className="text-white text-4xl font-bold mb-2">プロフィール</Text>
          <Text className="text-white opacity-90 text-base">
            アカウント情報とサブスクリプション
          </Text>
        </View>

        {/* ユーザー情報 */}
        <View className="px-4 py-8">
          <View className="bg-surface rounded-lg p-6 border border-border mb-6">
            <View className="flex-row items-center gap-4 mb-6">
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#FF6B35',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text className="text-3xl">👤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-foreground">
                  {user.name}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  {user.email}
                </Text>
              </View>
            </View>

            <View className="gap-3">
              <View className="flex-row items-center justify-between pb-3 border-b border-border">
                <Text className="text-sm text-muted">認証方法</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {user.authProvider === 'email' ? 'メール' : user.authProvider}
                </Text>
              </View>
              <View className="flex-row items-center justify-between pb-3 border-b border-border">
                <Text className="text-sm text-muted">アカウント作成日</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {new Date(user.createdAt).toLocaleDateString('ja-JP')}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">ステータス</Text>
                <View className="bg-success bg-opacity-10 px-3 py-1 rounded-full">
                  <Text className="text-xs font-bold text-success">
                    ✓ アクティブ
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* サブスクリプション情報 */}
        <View className="px-4 pb-8 border-t border-border pt-8">
          <Text className="text-2xl font-bold text-foreground mb-6">
            サブスクリプション
          </Text>

          {isPremium ? (
            <>
              {purchaseDate ? (
                <View className="bg-success bg-opacity-10 border border-success rounded-lg p-6 mb-6">
                  <Text className="text-success font-bold text-lg mb-2">
                    ✓ Ping Pong Master Pro
                  </Text>
                  <Text className="text-success text-sm mb-2">
                    永久アクセス（買い切り型）
                  </Text>
                  <Text className="text-success text-xs">
                    購入日: {purchaseDate.toLocaleDateString('ja-JP')}
                  </Text>
                </View>
              ) : (
                <View className="bg-warning bg-opacity-10 border border-warning rounded-lg p-6 mb-6">
                  <Text className="text-warning font-bold text-lg mb-2">
                    🎁 7日間無料トライアル中
                  </Text>
                  <Text className="text-warning text-sm">
                    残り {trialRemainingDays} 日間
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              <View className="bg-warning bg-opacity-10 border border-warning rounded-lg p-6 mb-6">
                <Text className="text-warning font-bold text-lg mb-2">
                  フリープラン
                </Text>
                <Text className="text-warning text-sm">
                  プレミアム機能をアンロックして、さらに多くの機能を利用できます
                </Text>
              </View>

              <Pressable
                onPress={handleUpgradePremium}
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
                <Text className="text-white text-center font-bold">
                  プレミアムにアップグレード
                </Text>
              </Pressable>
            </>
          )}
        </View>

        {/* 設定セクション */}
        <View className="px-4 pb-8 border-t border-border pt-8">
          <Text className="text-2xl font-bold text-foreground mb-6">
            設定
          </Text>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-foreground font-semibold">
              🔐 パスワードを変更
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-foreground font-semibold">
              📧 メールアドレスを変更
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-foreground font-semibold">
              📋 利用規約
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-foreground font-semibold">
              🔒 プライバシーポリシー
            </Text>
          </Pressable>
        </View>

        {/* ログアウトボタン */}
        <View className="px-4 pb-8">
          <Pressable
            onPress={handleLogout}
            disabled={loggingOut}
            style={({ pressed }) => [
              {
                backgroundColor: loggingOut ? '#CCCCCC' : '#FF4757',
                paddingVertical: 12,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            {loggingOut ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-bold">
                ログアウト
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
