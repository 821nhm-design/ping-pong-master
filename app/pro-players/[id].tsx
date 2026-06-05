import React from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { proPlayersMega } from '@/lib/pro-players-mega';
import { womenProPlayersMega } from '@/lib/pro-players-women-mega';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '@/lib/favorites-utils';

export default function ProPlayerDetailScreen() {
  const router = useRouter();
  const { id, gender } = useLocalSearchParams<{ id: string; gender?: string }>();
  const [isFav, setIsFav] = useState(false);

  const allPlayers = gender === 'female' ? womenProPlayersMega : proPlayersMega;
  const player = allPlayers.find((p: any) => p.id === id);

  // お気に入り状態を確認
  useEffect(() => {
    if (player?.id) {
      isFavorite(player.id, 'player').then(setIsFav);
    }
  }, [player?.id]);

  const handleToggleFavorite = async () => {
    if (!player) return;
    if (isFav) {
      await removeFavorite(player.id, 'player');
    } else {
      await addFavorite({
        id: player.id,
        type: 'player',
        title: player.name,
        gender: gender as 'male' | 'female',
      });
    }
    setIsFav(!isFav);
  };

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
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: player.rank === 1 ? '#000000' : '#FFFFFF' }} className="text-lg font-semibold">
                ← 戻る
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Text className="text-2xl">{isFav ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
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
            {player.specialties.map((specialty: string, idx: number) => (
              <View key={idx} className="bg-blue-100 rounded-lg p-4">
                <Text style={{ color: '#004E89' }} className="text-lg font-bold mb-2">
                  {idx + 1}. {specialty}
                </Text>
                {('specialtiesDetail' in player) && player.specialtiesDetail && player.specialtiesDetail[idx] && (
                  <Text style={{ color: '#333333' }} className="text-sm leading-relaxed">
                    {player.specialtiesDetail[idx]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 説明 */}
        {player.description && (
          <View className="px-4 py-6">
            <Text style={{ color: '#000000' }} className="text-2xl font-bold mb-4">
              プロフィール
            </Text>
            <Text style={{ color: '#333333' }} className="text-base leading-relaxed">
              {player.description}
            </Text>
          </View>
        )}

        {/* 下部のパディング */}
        <View className="px-4 py-6" />
      </ScrollView>
    </ScreenContainer>
  );
}
