import { useState } from 'react';
import { ScrollView, View, Text, Pressable, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { proPlayersMega } from '@/lib/pro-players-mega';
import { womenProPlayersMega } from '@/lib/pro-players-women-mega';

export default function ProPlayersScreen() {
  const router = useRouter();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [topFilter, setTopFilter] = useState<'top10' | 'top50' | 'top100'>('top10');

  const players = gender === 'male' ? proPlayersMega : womenProPlayersMega;

  const filteredPlayers = players.filter((player) => {
    if (topFilter === 'top10') return player.rank <= 10;
    if (topFilter === 'top50') return player.rank <= 50;
    return true;
  });

  const renderPlayerItem = ({ item }: { item: typeof players[0] }) => (
    <Pressable
      onPress={() => router.push(`/pro-players/${item.id}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#f0f0f0' : '#ffffff',
          padding: 12,
          marginVertical: 6,
          marginHorizontal: 12,
          borderRadius: 8,
          borderLeftWidth: 4,
          borderLeftColor: '#FF6B6B',
        },
      ]}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-black">#{item.rank} {item.name}</Text>
        <Text className="text-sm text-gray-600">{item.country}</Text>
      </View>
      <Text className="text-sm text-gray-700 mb-1">{item.nameEnglish}</Text>
      <Text className="text-xs text-gray-600 mb-2">{item.playingStyle}</Text>
      <Text className="text-sm text-gray-800 font-semibold mb-1">得意戦術:</Text>
      <Text className="text-xs text-gray-700">{item.specialties.slice(0, 3).join(' • ')}</Text>
      {item.points && (
        <Text className="text-xs text-blue-600 mt-2">ポイント: {item.points}</Text>
      )}
    </Pressable>
  );

  return (
    <ScreenContainer className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="px-4 py-4">
        <Text className="text-3xl font-bold text-black mb-4">プロ選手</Text>

        {/* 性別タブ */}
        <View className="flex-row gap-2 mb-4">
          <Pressable
            onPress={() => setGender('male')}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: gender === 'male' ? '#FF6B6B' : '#f0f0f0',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className={`text-center font-semibold ${
                gender === 'male' ? 'text-white' : 'text-black'
              }`}
            >
              男子
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setGender('female')}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: gender === 'female' ? '#FF6B6B' : '#f0f0f0',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className={`text-center font-semibold ${
                gender === 'female' ? 'text-white' : 'text-black'
              }`}
            >
              女子
            </Text>
          </Pressable>
        </View>

        {/* ランキングフィルタタブ */}
        <View className="flex-row gap-2 mb-4">
          <Pressable
            onPress={() => setTopFilter('top10')}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 6,
                backgroundColor: topFilter === 'top10' ? '#4CAF50' : '#e0e0e0',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className={`text-center font-semibold text-sm ${
                topFilter === 'top10' ? 'text-white' : 'text-black'
              }`}
            >
              Top 10
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTopFilter('top50')}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 6,
                backgroundColor: topFilter === 'top50' ? '#4CAF50' : '#e0e0e0',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className={`text-center font-semibold text-sm ${
                topFilter === 'top50' ? 'text-white' : 'text-black'
              }`}
            >
              Top 50
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTopFilter('top100')}
            style={({ pressed }) => [
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 6,
                backgroundColor: topFilter === 'top100' ? '#4CAF50' : '#e0e0e0',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className={`text-center font-semibold text-sm ${
                topFilter === 'top100' ? 'text-white' : 'text-black'
              }`}
            >
              Top 100
            </Text>
          </Pressable>
        </View>

        {/* 選手リスト */}
        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={{ flex: 1, marginBottom: 12 }}
        />

        {/* 戻るボタン */}
        <Pressable
          onPress={() => router.push('/')}
          style={({ pressed }) => [
            {
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: '#FF6B6B',
              opacity: pressed ? 0.8 : 1,
              marginTop: 12,
            },
          ]}
        >
          <Text className="text-center text-white font-semibold">← ホームに戻る</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
