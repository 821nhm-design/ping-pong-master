import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TextInput } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { registerWithEmail } from '@/lib/auth-utils';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async () => {
    setError('');

    // バリデーション
    if (!name || !email || !password || !confirmPassword) {
      setError('すべてのフィールドを入力してください');
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上である必要があります');
      return;
    }

    if (!agreedToTerms) {
      setError('利用規約に同意する必要があります');
      return;
    }

    setLoading(true);

    const result = await registerWithEmail(email, password, name);

    if (result.success) {
      // 登録成功時はホーム画面へ遷移
      router.replace('/(tabs)');
    } else {
      setError(result.error || '登録に失敗しました');
    }

    setLoading(false);
  };

  const handleLogin = () => {
    router.back();
  };

  return (
    <ScreenContainer className="p-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center">
          {/* ヘッダー */}
          <View className="mb-8">
            <Text style={{ color: '#000000' }} className="text-4xl font-bold mb-2">
              アカウント作成
            </Text>
            <Text style={{ color: '#999999' }} className="text-base">
              新しいアカウントを作成して始めましょう
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

          {/* 名前入力 */}
          <View className="mb-4">
            <Text style={{ color: '#000000' }} className="text-sm font-semibold mb-2">
              名前
            </Text>
            <TextInput
              placeholder="山田太郎"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
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
          <View className="mb-4">
            <Text style={{ color: '#000000' }} className="text-sm font-semibold mb-2">
              パスワード
            </Text>
            <TextInput
              placeholder="6文字以上"
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

          {/* パスワード確認入力 */}
          <View className="mb-6">
            <Text style={{ color: '#000000' }} className="text-sm font-semibold mb-2">
              パスワード（確認）
            </Text>
            <TextInput
              placeholder="パスワードを再入力"
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          {/* 利用規約チェック */}
          <Pressable
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            className="flex-row items-center gap-3 mb-6"
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#FF6B35',
                backgroundColor: agreedToTerms ? '#FF6B35' : '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {agreedToTerms && <Text className="text-white font-bold">✓</Text>}
            </View>
            <Text style={{ color: '#666666' }} className="text-sm flex-1">
              利用規約とプライバシーポリシーに同意します
            </Text>
          </Pressable>

          {/* 登録ボタン */}
          <Pressable
            onPress={handleRegister}
            disabled={loading || !name || !email || !password || !confirmPassword || !agreedToTerms}
            style={({ pressed }) => [
              {
                backgroundColor:
                  loading || !name || !email || !password || !confirmPassword || !agreedToTerms
                    ? '#CCCCCC'
                    : '#FF6B35',
                paddingVertical: 16,
                borderRadius: 8,
                marginBottom: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? '作成中...' : 'アカウントを作成'}
            </Text>
          </Pressable>

          {/* ログインリンク */}
          <View className="flex-row items-center justify-center gap-2">
            <Text style={{ color: '#666666' }} className="text-base">
              既にアカウントをお持ちですか？
            </Text>
            <Pressable onPress={handleLogin}>
              <Text style={{ color: '#FF6B35' }} className="text-base font-bold">
                ログイン
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
