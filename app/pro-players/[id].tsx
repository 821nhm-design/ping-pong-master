import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { proPlayers } from '@/lib/pro-players-data';

const rankingColors = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

const effectivenessColors = {
  high: '#00D084',
  medium: '#FFB700',
  low: '#FF4757',
};

export default function ProPlayerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const player = proPlayers.find((p) => p.id === id);

  if (!player) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">選手が見つかりません</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-primary px-6 py-2 rounded-lg">
          <Text className="text-white font-semibold">戻る</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  const getRankingColor = (ranking: number) => {
    if (ranking === 1) return rankingColors[1];
    if (ranking === 2) return rankingColors[2];
    if (ranking === 3) return rankingColors[3];
    return '#FF6B35';
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView className="flex-1">
        {/* ヘッダー */}
        <View style={{ backgroundColor: '#FF6B35' }} className="px-4 pt-6 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-semibold text-lg">← 戻る</Text>
          </Pressable>
          <View className="flex-row items-center gap-4 mb-4">
            <View
              style={{ backgroundColor: getRankingColor(player.worldRanking) }}
              className="w-16 h-16 rounded-full items-center justify-center"
            >
              <Text style={{ color: player.worldRanking === 1 ? '#000000' : '#FFFFFF' }} className="font-bold text-2xl">
                {player.worldRanking}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-3xl font-bold">{player.name}</Text>
              <Text className="text-white text-sm mt-1">{player.country}</Text>
            </View>
          </View>
        </View>

        {/* コンテンツ */}
        <View className="p-4">
          {/* 基本情報 */}
          <View className="bg-surface rounded-lg p-4 mb-6 border-l-4 border-blue-500">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
              基本情報
            </Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text style={{ color: '#333333' }} className="text-sm">
                  所属チーム：
                </Text>
                <Text style={{ color: '#000000' }} className="text-sm font-semibold">
                  {player.team}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{ color: '#333333' }} className="text-sm">
                  プレースタイル：
                </Text>
                <Text style={{ color: '#000000' }} className="text-sm font-semibold">
                  {player.playingStyle}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{ color: '#333333' }} className="text-sm">
                  利き手：
                </Text>
                <Text style={{ color: '#000000' }} className="text-sm font-semibold">
                  {player.hand === 'right' ? '右利き' : '左利き'}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{ color: '#333333' }} className="text-sm">
                  グリップ：
                </Text>
                <Text style={{ color: '#000000' }} className="text-sm font-semibold">
                  {player.grip === 'shakehand' ? 'シェークハンド' : 'ペンホルダー'}
                </Text>
              </View>
            </View>
          </View>

          {/* プロフィール */}
          <View className="bg-surface rounded-lg p-4 mb-6 border-l-4 border-green-500">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
              プロフィール
            </Text>
            <Text style={{ color: '#333333' }} className="text-sm leading-relaxed">
              {player.bio}
            </Text>
          </View>

          {/* 得意な戦術 */}
          <View className="mb-6">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-4">
              得意な戦術（{player.tactics.length}つ）
            </Text>
            <View className="gap-3">
              {player.tactics.map((tactic, idx) => (
                <View key={idx} className="bg-surface rounded-lg p-4 border-l-4" style={{ borderLeftColor: effectivenessColors[tactic.effectiveness] }}>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text style={{ color: '#000000' }} className="text-base font-bold">
                      {tactic.name}
                    </Text>
                    <View
                      style={{ backgroundColor: effectivenessColors[tactic.effectiveness] }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text className="text-white text-xs font-semibold">
                        {tactic.effectiveness === 'high' ? '高' : tactic.effectiveness === 'medium' ? '中' : '低'}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ color: '#333333' }} className="text-sm mb-2">
                    <Text className="font-semibold">説明：</Text>
                    {tactic.description}
                  </Text>
                  <Text style={{ color: '#333333' }} className="text-sm">
                    <Text className="font-semibold">使用場面：</Text>
                    {tactic.usage}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 主な成績 */}
          <View className="bg-surface rounded-lg p-4 border-l-4 border-orange-500 mb-6">
            <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
              主な成績
            </Text>
            <View className="gap-2">
              {player.achievements.map((achievement, idx) => (
                <View key={idx} className="flex-row items-start gap-2">
                  <Text style={{ color: '#FF6B35' }} className="text-lg font-bold">
                    •
                  </Text>
                  <Text style={{ color: '#333333' }} className="text-sm flex-1">
                    {achievement}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
