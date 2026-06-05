import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TextInput } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { loginWithEmail } from '@/lib/auth-utils';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await loginWithEmail(email, password);

    if (result.success) {
      // ログイン成功時はホーム画面へ遷移
      router.replace('/(tabs)');
    } else {
      setError(result.error || 'ログインに失敗しました');
    }

    setLoading(false);
  };

  const handleRegister = () => {
    // 登録画面へ遷移
    router.navigate({ pathname: '/auth/register' } as any);
  };

  return (
    <ScreenContainer className="p-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center">
          {/* ヘッダー */}
          <View className="mb-8">
            <Text style={{ color: '#000000' }} className="text-4xl font-bold mb-2">
              ログイン
            </Text>
            <Text style={{ color: '#999999' }} className="text-base">
              アカウントにログインして、すべての機能を利用できます
            </Text>
          </View>

          {/* エラーメッセージ */}
          {error && (
            <View className="bg-error rounded-lg p-4 mb-6">
              <Text style={{ color: '#FFFFFF' }} className="text-sm">
                {error}
              </Text>
            </View>
          )}

          {/* メールアドレス入力 */}
          <View className="mb-4">
            <Text style={{ color: '#000000' }} className="text-sm font-semibold mb-2">
              メールアドレス
            </Text>
            <TextInput
              placeholder="example@email.com"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: '#000000',
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            />
          </View>

          {/* パスワード入力 */}
          <View className="mb-6">
            <Text style={{ color: '#000000' }} className="text-sm font-semibold mb-2">
              パスワード
            </Text>
            <TextInput
              placeholder="パスワードを入力"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 16,
                color: '#000000',
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            />
          </View>

          {/* ログインボタン */}
          <Pressable
            onPress={handleLogin}
            disabled={loading || !email || !password}
            style={({ pressed }) => [
              {
                backgroundColor: loading || !email || !password ? '#CCCCCC' : '#FF6B35',
                paddingVertical: 16,
                borderRadius: 8,
                marginBottom: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? 'ログイン中...' : 'ログイン'}
            </Text>
          </Pressable>

          {/* OAuth ログイン */}
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-4">
              <View className="flex-1 h-px bg-border" />
              <Text style={{ color: '#999999' }} className="text-sm">
                または
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Google ログイン */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#F5F5F5' : '#FFFFFF',
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  marginBottom: 8,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-center font-semibold text-base">
                🔵 Google でログイン
              </Text>
            </Pressable>

            {/* Apple ログイン */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#F5F5F5' : '#FFFFFF',
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-center font-semibold text-base">
                🍎 Apple でログイン
              </Text>
            </Pressable>
          </View>

          {/* 登録リンク */}
          <View className="flex-row items-center justify-center gap-2">
            <Text style={{ color: '#666666' }} className="text-base">
              アカウントをお持ちでないですか？
            </Text>
            <Pressable onPress={handleRegister}>
              <Text style={{ color: '#FF6B35' }} className="text-base font-bold">
                登録する
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
