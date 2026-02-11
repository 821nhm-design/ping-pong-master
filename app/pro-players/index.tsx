import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { proPlayersMega } from '@/lib/pro-players-mega';
import { womenProPlayersAll } from '@/lib/pro-players-women-complete';

const rankingColors = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

export default function ProPlayersScreen() {
  const router = useRouter();
  const [activeGender, setActiveGender] = useState<'male' | 'female'>('male');
  const [activeCategory, setActiveCategory] = useState<string>('top10');

  const allPlayers = activeGender === 'female' ? womenProPlayersAll : proPlayersMega;

  const filteredPlayers = activeCategory === 'top10' 
    ? allPlayers.slice(0, 10).sort((a, b) => a.rank - b.rank)
    : activeCategory === 'top50'
    ? allPlayers.slice(0, 50).sort((a, b) => a.rank - b.rank)
    : allPlayers.sort((a, b) => a.rank - b.rank);

  const getRankingColor = (ranking: number) => {
    if (ranking === 1) return rankingColors[1];
    if (ranking === 2) return rankingColors[2];
    if (ranking === 3) return rankingColors[3];
    return '#FF6B35';
  };

  const renderPlayerItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(`/pro-players/${item.id}?gender=${activeGender}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#FFE8D6' : '#FFFFFF',
          padding: 14,
          marginBottom: 10,
          borderRadius: 12,
          borderLeftWidth: 5,
          borderLeftColor: getRankingColor(item.rank),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
      ]}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-3 flex-1">
          <View
            style={{ backgroundColor: getRankingColor(item.rank) }}
            className="w-10 h-10 rounded-full items-center justify-center"
          >
            <Text style={{ color: item.rank === 1 ? '#000000' : '#FFFFFF' }} className="font-bold text-lg">
              {item.rank}
            </Text>
          </View>
          <View className="flex-1">
            <Text style={{ color: '#000000' }} className="text-lg font-bold">
              {item.name}
            </Text>
            <Text style={{ color: '#333333' }} className="text-sm">
              {item.country} • {item.playingStyle}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row gap-2 flex-wrap mb-2">
        {item.specialties.slice(0, 3).map((specialty: any, idx: number) => (
          <View key={idx} className="bg-blue-100 px-2 py-1 rounded">
            <Text style={{ color: '#004E89' }} className="text-xs font-semibold">
              {specialty}
            </Text>
          </View>
        ))}
        {item.specialties.length > 3 && (
          <View className="bg-gray-200 px-2 py-1 rounded">
            <Text style={{ color: '#666666' }} className="text-xs font-semibold">
              +{item.specialties.length - 3}
            </Text>
          </View>
        )}
      </View>
      {item.description && (
        <Text style={{ color: '#666666' }} className="text-xs leading-relaxed">
          {item.description.substring(0, 100)}...
        </Text>
      )}
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      <View className="flex-1">
        {/* ヘッダー */}
        <View style={{ backgroundColor: '#FF6B35' }} className="px-4 pt-4 pb-3">
          <Text className="text-white text-2xl font-bold">プロ選手</Text>
          <Text className="text-white text-sm mt-1 opacity-90">世界トップ100選手の戦術を学ぼう</Text>
        </View>

        {/* 男女別タブ */}
        <View className="bg-background px-4 pt-3 pb-2 flex-row gap-2">
          {[
            { id: 'male', name: '男子' },
            { id: 'female', name: '女子' },
          ].map((gender) => {
            const isActive = activeGender === gender.id;
            return (
              <Pressable
                key={gender.id}
                onPress={() => {
                  setActiveGender(gender.id as 'male' | 'female');
                  setActiveCategory('top10');
                }}
                style={({ pressed }) => [
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: isActive ? '#FF6B35' : '#F0F0F0',
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className={isActive ? 'text-white font-bold text-sm' : 'text-foreground font-semibold text-sm'}
                >
                  {gender.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ランキングカテゴリタブ */}
        <View className="bg-background px-4 pt-2 pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {[
                { id: 'top10', name: 'トップ10' },
                { id: 'top50', name: 'トップ50' },
                { id: 'top100', name: 'トップ100' },
              ].map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => setActiveCategory(category.id)}
                    style={({ pressed }) => [
                      {
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderRadius: 20,
                        backgroundColor: isActive ? '#FF6B35' : '#F0F0F0',
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text
                      className={isActive ? 'text-white font-bold text-sm' : 'text-foreground font-semibold text-sm'}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* 選手リスト */}
        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 12 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text style={{ color: '#666666' }}>選手が見つかりません</Text>
            </View>
          }
        />
      </View>
    </ScreenContainer>
  );
}
