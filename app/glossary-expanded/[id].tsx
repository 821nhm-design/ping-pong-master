import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { glossaryTerms } from '@/lib/glossary-data-expanded';

const categoryColors = {
  rules: '#FF6B35',
  equipment: '#004E89',
  techniques: '#F77F00',
  tactics: '#06A77D',
  other: '#D62828',
};

const difficultyColors = {
  beginner: '#00D084',
  intermediate: '#FFB700',
  advanced: '#FF4757',
};

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

  const categoryColor = categoryColors[term.category as keyof typeof categoryColors];
  const difficultyColor = difficultyColors[term.difficulty as keyof typeof difficultyColors];
  const difficultyLabel =
    term.difficulty === 'beginner' ? '初心者向け' : term.difficulty === 'intermediate' ? '中級者向け' : '上級者向け';

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView className="flex-1">
        {/* ヘッダー */}
        <View style={{ backgroundColor: categoryColor }} className="px-4 pt-6 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-semibold text-lg">← 戻る</Text>
          </Pressable>
          <Text style={{ color: '#FFFFFF' }} className="text-4xl font-bold mb-3">{term.name}</Text>
          <View className="flex-row items-center gap-2">
            <View
              style={{ backgroundColor: difficultyColor }}
              className="px-4 py-2 rounded-full"
            >
              <Text className="text-white text-sm font-bold">{difficultyLabel}</Text>
            </View>
          </View>
        </View>

        {/* コンテンツ */}
        <View className="p-4">
          {/* 説明文 */}
          <View className="bg-surface rounded-lg p-4 mb-6 border-l-4" style={{ borderLeftColor: categoryColor }}>
            <Text style={{ color: '#000000' }} className="text-base leading-relaxed">{term.description}</Text>
          </View>

          {/* 関連用語 */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <View className="mb-6">
              <Text style={{ color: '#000000' }} className="text-lg font-bold mb-3">関連用語</Text>
              <View className="gap-2">
                {term.relatedTerms.map((relatedId) => {
                  const relatedTerm = glossaryTerms.find((t) => t.id === relatedId);
                  const relatedColor = categoryColors[relatedTerm?.category as keyof typeof categoryColors];
                  return relatedTerm ? (
                    <Pressable
                      key={relatedId}
                      onPress={() => router.push(`/glossary-expanded/${relatedId}`)}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? '#FFF0E6' : '#FFF8F0',
                          padding: 12,
                          borderRadius: 8,
                          borderLeftWidth: 4,
                          borderLeftColor: relatedColor,
                        },
                      ]}
                    >
                      <Text style={{ color: '#000000' }} className="font-bold text-base">
                        {relatedTerm.name}
                      </Text>
                      <Text style={{ color: '#333333' }} className="text-xs mt-1">{relatedTerm.description.substring(0, 50)}...</Text>
                    </Pressable>
                  ) : null;
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
