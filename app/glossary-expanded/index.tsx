import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, FlatList, Dimensions } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { glossaryTerms, glossaryCategories } from '@/lib/glossary-data-expanded';

const categoryColors = {
  rules: '#FF6B35',
  equipment: '#004E89',
  techniques: '#F77F00',
  tactics: '#06A77D',
  other: '#D62828',
};

export default function GlossaryExpandedScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'rules' | 'equipment' | 'techniques' | 'tactics' | 'other'>('rules');

  const categoryTerms = glossaryTerms.filter((term) => term.category === activeCategory);
  const categoryColor = categoryColors[activeCategory];

  const difficultyColors = {
    beginner: '#00D084',
    intermediate: '#FFB700',
    advanced: '#FF4757',
  };

  const renderTermItem = ({ item }: { item: typeof glossaryTerms[0] }) => (
    <Pressable
      onPress={() => router.push(`/glossary-expanded/${item.id}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#FFE8D6' : '#FFFFFF',
          padding: 14,
          marginBottom: 10,
          borderRadius: 12,
          borderLeftWidth: 5,
          borderLeftColor: difficultyColors[item.difficulty],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
      ]}
    >
      <Text style={{ color: '#000000' }} className="text-base font-bold mb-2">{item.name}</Text>
      <Text style={{ color: '#333333' }} className="text-sm leading-relaxed" numberOfLines={2}>
        {item.description}
      </Text>
      <View className="flex-row items-center mt-3">
        <View
          style={{ backgroundColor: difficultyColors[item.difficulty] }}
          className="px-3 py-1 rounded-full"
        >
          <Text className="text-white text-xs font-semibold">
            {item.difficulty === 'beginner' ? '初心者向け' : item.difficulty === 'intermediate' ? '中級者向け' : '上級者向け'}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      <View className="flex-1">
        {/* ヘッダー */}
        <View style={{ backgroundColor: categoryColor }} className="px-4 pt-4 pb-3">
          <Text className="text-white text-2xl font-bold">用語辞典</Text>
          <Text className="text-white text-sm mt-1 opacity-90">卓球の用語を詳しく学ぼう</Text>
        </View>

        {/* カテゴリタブ */}
        <View className="bg-background px-4 pt-3 pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {glossaryCategories.map((category) => {
                const isActive = activeCategory === category.id;
                const color = categoryColors[category.id as keyof typeof categoryColors];
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => setActiveCategory(category.id as any)}
                    style={({ pressed }) => [
                      {
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderRadius: 20,
                        backgroundColor: isActive ? color : '#F0F0F0',
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

        {/* 用語リスト */}
        <FlatList
          data={categoryTerms}
          renderItem={renderTermItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 12 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text style={{ color: '#666666' }}>用語が見つかりません</Text>
            </View>
          }
        />
      </View>
    </ScreenContainer>
  );
}
