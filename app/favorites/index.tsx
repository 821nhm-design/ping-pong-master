import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter, useFocusEffect } from 'expo-router';
import { getFavorites, removeFavorite, FavoriteItem } from '@/lib/favorites-utils';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<'all' | 'glossary' | 'technique' | 'player'>('all');

  // 画面がフォーカスされたときにお気に入りを再読み込み
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    setLoading(true);
    const items = await getFavorites();
    setFavorites(items);
    setLoading(false);
  };

  const handleRemoveFavorite = async (id: string, type: string) => {
    await removeFavorite(id, type);
    await loadFavorites();
  };

  const handleFavoritePress = (favorite: FavoriteItem) => {
    switch (favorite.type) {
      case 'glossary':
        router.push(`/glossary-expanded/${favorite.id}`);
        break;
      case 'technique':
        router.push(`/technique/${favorite.id}`);
        break;
      case 'player':
        router.push({
          pathname: '/pro-players/[id]',
          params: { id: favorite.id, gender: favorite.gender },
        });
        break;
    }
  };

  // フィルタリング
  const filteredFavorites = selectedType === 'all'
    ? favorites
    : favorites.filter((fav) => fav.type === selectedType);

  // タイプ別にグループ化
  const groupedFavorites = {
    glossary: favorites.filter((fav) => fav.type === 'glossary'),
    technique: favorites.filter((fav) => fav.type === 'technique'),
    player: favorites.filter((fav) => fav.type === 'player'),
  };

  const categoryColors: Record<string, string> = {
    glossary: '#FF6B35',
    technique: '#F77F00',
    player: '#06A77D',
  };

  const categoryLabels: Record<string, string> = {
    glossary: '用語',
    technique: '技術',
    player: 'プロ選手',
  };

  const renderFavoriteItem = (favorite: FavoriteItem) => (
    <View
      key={`${favorite.type}-${favorite.id}`}
      style={{
        backgroundColor: '#FFFFFF',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: categoryColors[favorite.type],
      }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Pressable
          onPress={() => handleFavoritePress(favorite)}
          className="flex-1"
        >
          <Text style={{ color: '#000000' }} className="text-lg font-bold">
            {favorite.title}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleRemoveFavorite(favorite.id, favorite.type)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#FFE5E5' : '#FFE0E0',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 4,
            },
          ]}
        >
          <Text style={{ color: '#FF4757' }} className="text-sm font-bold">
            削除
          </Text>
        </Pressable>
      </View>

      <View className="flex-row items-center gap-2">
        <View
          style={{ backgroundColor: categoryColors[favorite.type] }}
          className="px-2 py-1 rounded"
        >
          <Text className="text-white text-xs font-bold">
            {categoryLabels[favorite.type]}
          </Text>
        </View>
        <Text style={{ color: '#999999' }} className="text-xs">
          {new Date(favorite.timestamp).toLocaleDateString('ja-JP')}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-4 flex-1">
      {/* ヘッダー */}
      <View className="mb-4">
        <Text style={{ color: '#000000' }} className="text-3xl font-bold mb-2">
          お気に入り
        </Text>
        <Text style={{ color: '#999999' }} className="text-sm">
          {filteredFavorites.length}件
        </Text>
      </View>

      {/* フィルタータブ */}
      <View className="flex-row gap-2 mb-4">
        {['all', 'glossary', 'technique', 'player'].map((type) => (
          <Pressable
            key={type}
            onPress={() => setSelectedType(type as any)}
            style={({ pressed }) => [
              {
                backgroundColor: selectedType === type ? '#FF6B35' : '#F5F5F5',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              style={{
                color: selectedType === type ? '#FFFFFF' : '#000000',
              }}
              className="font-semibold text-sm"
            >
              {type === 'all' ? 'すべて' : categoryLabels[type]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* お気に入りリスト */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: '#999999' }}>読み込み中...</Text>
        </View>
      ) : filteredFavorites.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-2">
            {filteredFavorites.map((favorite) => renderFavoriteItem(favorite))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: '#999999' }} className="text-lg text-center">
            {selectedType === 'all'
              ? 'お気に入りがまだ登録されていません'
              : `${categoryLabels[selectedType as keyof typeof categoryLabels]}のお気に入りがありません`}
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
