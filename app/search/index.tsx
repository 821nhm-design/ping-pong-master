import React, { useState, useMemo } from 'react';
import { ScrollView, Text, View, Pressable, TextInput, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { globalSearch, SearchResult } from '@/lib/search-utils';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // 検索を実行
  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim()) {
      const searchResults = globalSearch(text);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  // 結果をカテゴリ別にグループ化
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      glossary: [],
      technique: [],
      player: [],
    };

    results.forEach((result) => {
      groups[result.type].push(result);
    });

    return groups;
  }, [results]);

  // 結果をタップして詳細ページへ遷移
  const handleResultPress = (result: SearchResult) => {
    switch (result.type) {
      case 'glossary':
        router.push(`/glossary-expanded/${result.id}`);
        break;
      case 'technique':
        router.push(`/technique/${result.id}`);
        break;
      case 'player':
        router.push({
          pathname: '/pro-players/[id]',
          params: { id: result.id, gender: result.gender },
        });
        break;
    }
  };

  const renderResultItem = (result: SearchResult) => {
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

    return (
      <Pressable
        key={`${result.type}-${result.id}`}
        onPress={() => handleResultPress(result)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#F5F5F5' : '#FFFFFF',
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: categoryColors[result.type],
          },
        ]}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text style={{ color: '#000000' }} className="text-lg font-bold flex-1">
            {result.title}
          </Text>
          <View
            style={{ backgroundColor: categoryColors[result.type] }}
            className="px-2 py-1 rounded"
          >
            <Text className="text-white text-xs font-bold">
              {categoryLabels[result.type]}
            </Text>
          </View>
        </View>

        {result.subtitle && (
          <Text style={{ color: '#666666' }} className="text-sm mb-2">
            {result.subtitle}
          </Text>
        )}

        {result.description && (
          <Text style={{ color: '#333333' }} className="text-sm">
            {result.description}...
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="p-4 flex-1">
      {/* 検索バー */}
      <View className="mb-4">
        <TextInput
          placeholder="用語、技術、選手を検索..."
          placeholderTextColor="#999999"
          value={query}
          onChangeText={handleSearch}
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            color: '#000000',
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        />
      </View>

      {/* 検索結果 */}
      {query.trim() ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 用語辞典の結果 */}
          {groupedResults.glossary.length > 0 && (
            <View className="mb-6">
              <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
                用語辞典 ({groupedResults.glossary.length})
              </Text>
              <View className="gap-2">
                {groupedResults.glossary.map((result) => renderResultItem(result))}
              </View>
            </View>
          )}

          {/* 技術の結果 */}
          {groupedResults.technique.length > 0 && (
            <View className="mb-6">
              <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
                技術 ({groupedResults.technique.length})
              </Text>
              <View className="gap-2">
                {groupedResults.technique.map((result) => renderResultItem(result))}
              </View>
            </View>
          )}

          {/* プロ選手の結果 */}
          {groupedResults.player.length > 0 && (
            <View className="mb-6">
              <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">
                プロ選手 ({groupedResults.player.length})
              </Text>
              <View className="gap-2">
                {groupedResults.player.map((result) => renderResultItem(result))}
              </View>
            </View>
          )}

          {/* 結果がない場合 */}
          {results.length === 0 && query.trim() && (
            <View className="items-center justify-center py-8">
              <Text style={{ color: '#999999' }} className="text-lg">
                検索結果がありません
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: '#999999' }} className="text-lg text-center">
            用語、技術、プロ選手を検索してください
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
