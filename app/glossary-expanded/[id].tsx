import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { glossaryTerms } from '@/lib/glossary-data-expanded';

export default function GlossaryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const term = glossaryTerms.find((t) => t.id === id);

  if (!term) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">用語が見つかりません</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-primary px-6 py-2 rounded-lg">
          <Text className="text-white font-semibold">戻る</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  const difficultyColor =
    term.difficulty === 'beginner' ? '#22C55E' : term.difficulty === 'intermediate' ? '#F59E0B' : '#EF4444';
  const difficultyLabel =
    term.difficulty === 'beginner' ? '初心者向け' : term.difficulty === 'intermediate' ? '中級者向け' : '上級者向け';

  return (
    <ScreenContainer>
      <ScrollView className="flex-1 p-4">
        {/* ヘッダー */}
        <Pressable onPress={() => router.back()} className="mb-4">
          <Text className="text-primary font-semibold">← 戻る</Text>
        </Pressable>

        {/* 用語名 */}
        <View className="mb-6">
          <Text className="text-4xl font-bold text-foreground mb-2">{term.name}</Text>
          <View className="flex-row items-center gap-2">
            <View
              style={{ backgroundColor: difficultyColor }}
              className="px-3 py-1 rounded-full"
            >
              <Text className="text-white text-xs font-semibold">{difficultyLabel}</Text>
            </View>
          </View>
        </View>

        {/* 説明文 */}
        <View className="bg-surface rounded-lg p-4 mb-6">
          <Text className="text-base text-foreground leading-relaxed">{term.description}</Text>
        </View>

        {/* 関連用語 */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-bold text-foreground mb-3">関連用語</Text>
            <View className="gap-2">
              {term.relatedTerms.map((relatedId) => {
                const relatedTerm = glossaryTerms.find((t) => t.id === relatedId);
                return relatedTerm ? (
                  <Pressable
                    key={relatedId}
                    onPress={() => router.push(`/glossary-expanded/${relatedId}`)}
                    className="bg-surface p-3 rounded-lg"
                  >
                    <Text className="text-primary font-semibold">{relatedTerm.name}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
