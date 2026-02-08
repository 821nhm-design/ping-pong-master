import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { proPlayersMega } from '@/lib/pro-players-mega';

export default function ProPlayerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const player = proPlayersMega.find((p) => p.id === id);

  if (!player) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground text-lg">選手が見つかりません</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">戻る</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  const getRankingColor = (ranking: number) => {
    if (ranking === 1) return '#FFD700';
    if (ranking === 2) return '#C0C0C0';
    if (ranking === 3) return '#CD7F32';
    return '#FF6B35';
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView className="flex-1">
        {/* ヘッダー */}
        <View style={{ backgroundColor: getRankingColor(player.rank) }} className="px-4 pt-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ color: player.rank === 1 ? '#000000' : '#FFFFFF' }} className="text-4xl font-bold">
              #{player.rank}
            </Text>
            <Pressable onPress={() => router.back()} className="p-2">
              <Text style={{ color: player.rank === 1 ? '#000000' : '#FFFFFF' }} className="text-2xl">
                ✕
              </Text>
            </Pressable>
          </View>
          <Text style={{ color: player.rank === 1 ? '#000000' : '#FFFFFF' }} className="text-3xl font-bold mb-2">
            {player.name}
          </Text>
          <Text style={{ color: player.rank === 1 ? '#000000' : '#FFFFFF' }} className="text-lg opacity-90">
            {player.nameEnglish}
          </Text>
        </View>

        {/* 基本情報 */}
        <View className="px-4 py-6 gap-4">
          <View className="bg-surface rounded-lg p-4">
            <Text style={{ color: '#666666' }} className="text-sm mb-2">
              国
            </Text>
            <Text style={{ color: '#000000' }} className="text-xl font-bold">
              {player.country}
            </Text>
          </View>

          <View className="bg-surface rounded-lg p-4">
            <Text style={{ color: '#666666' }} className="text-sm mb-2">
              戦型
            </Text>
            <Text style={{ color: '#000000' }} className="text-xl font-bold">
              {player.playingStyle}
            </Text>
          </View>

          {player.points && (
            <View className="bg-surface rounded-lg p-4">
              <Text style={{ color: '#666666' }} className="text-sm mb-2">
                ランキングポイント
              </Text>
              <Text style={{ color: '#000000' }} className="text-xl font-bold">
                {player.points.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* 得意戦術 */}
        <View className="px-4 py-6">
          <Text style={{ color: '#000000' }} className="text-2xl font-bold mb-4">
            得意な戦術
          </Text>
          <View className="gap-3">
            {player.specialties.map((specialty, idx) => (
              <View key={idx} className="bg-blue-100 rounded-lg p-4">
                <Text style={{ color: '#004E89' }} className="text-lg font-bold">
                  {idx + 1}. {specialty}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 説明 */}
        <View className="px-4 py-6">
          <Text style={{ color: '#000000' }} className="text-2xl font-bold mb-4">
            プロフィール
          </Text>
          <Text style={{ color: '#333333' }} className="text-base leading-relaxed">
            {player.description}
          </Text>
        </View>

        {/* 戻るボタン */}
        <View className="px-4 py-6">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#E55100' : '#FF6B35',
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderRadius: 8,
              },
            ]}
          >
            <Text className="text-white text-center font-bold text-lg">戻る</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
