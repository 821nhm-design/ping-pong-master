import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, FlatList, Dimensions } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { glossaryTerms, glossaryCategories } from '@/lib/glossary-data-expanded';

export default function GlossaryExpandedScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'rules' | 'equipment' | 'techniques' | 'tactics' | 'other'>('rules');

  const categoryTerms = glossaryTerms.filter((term) => term.category === activeCategory);

  const renderTermItem = ({ item }: { item: typeof glossaryTerms[0] }) => (
    <Pressable
      onPress={() => router.push(`/glossary-expanded/${item.id}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#f0f0f0' : '#ffffff',
          padding: 12,
          marginBottom: 8,
          borderRadius: 8,
          borderLeftWidth: 4,
          borderLeftColor: item.difficulty === 'beginner' ? '#22C55E' : item.difficulty === 'intermediate' ? '#F59E0B' : '#EF4444',
        },
      ]}
    >
      <Text className="text-base font-bold text-foreground mb-2">{item.name}</Text>
      <Text className="text-sm text-muted leading-relaxed" numberOfLines={2}>
        {item.description}
      </Text>
      <Text className="text-xs text-muted mt-2">
        {item.difficulty === 'beginner' ? '初心者向け' : item.difficulty === 'intermediate' ? '中級者向け' : '上級者向け'}
      </Text>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      <View className="flex-1">
        {/* カテゴリタブ */}
        <View className="bg-background px-4 pt-4 pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
            <View className="flex-row gap-2">
              {glossaryCategories.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => setActiveCategory(category.id as any)}
                  style={({ pressed }) => [
                    {
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: activeCategory === category.id ? '#0a7ea4' : '#e5e7eb',
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text
                    className={activeCategory === category.id ? 'text-white font-semibold text-sm' : 'text-foreground font-semibold text-sm'}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 用語リスト */}
        <FlatList
          data={categoryTerms}
          renderItem={renderTermItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 8 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text className="text-muted">用語が見つかりません</Text>
            </View>
          }
        />
      </View>
    </ScreenContainer>
  );
}
