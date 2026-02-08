import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { getTermById } from "@/lib/glossary-data";

export default function GlossaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const term = id ? getTermById(id) : null;

  if (!term) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">用語が見つかりません</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Text className="text-lg text-primary">戻る</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground flex-1 text-center">{term.term}</Text>
          <View className="w-10" />
        </View>

        {/* Furigana */}
        <Text className="text-sm text-muted text-center mb-4">（{term.furigana}）</Text>

        {/* Definition */}
        <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
          <Text className="text-sm font-semibold text-foreground mb-2">定義</Text>
          <Text className="text-sm text-muted leading-relaxed">{term.definition}</Text>
        </View>

        {/* Detailed Explanation */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-foreground mb-2">詳しい説明</Text>
          <Text className="text-sm text-muted leading-relaxed">{term.detailedExplanation}</Text>
        </View>

        {/* Related Terms */}
        {term.relatedTerms.length > 0 && (
          <View className="mb-4">
            <Text className="text-base font-semibold text-foreground mb-2">関連用語</Text>
            {term.relatedTerms.map((relatedId, index) => (
              <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                • {relatedId}
              </Text>
            ))}
          </View>
        )}

        {/* Examples */}
        {term.examples.length > 0 && (
          <View className="mb-6">
            <Text className="text-base font-semibold text-foreground mb-2">使用例</Text>
            {term.examples.map((example, index) => (
              <View key={index} className="bg-surface rounded-lg p-3 border border-border mb-2">
                <Text className="text-sm text-muted leading-relaxed">{example}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
