import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { getTechniquesByCategory, CATEGORIES } from "@/lib/techniques-data";
import { isPremiumUser, FREE_TIER_LIMITS } from "@/lib/premium-utils";

export default function TechniqueListScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    const premium = await isPremiumUser();
    setIsPremium(premium);
  };

  const techniques = category ? getTechniquesByCategory(category as "attack" | "tabletop" | "defense" | "serve" | "other") : [];
  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  
  // 無料版の場合は最初の5つのみ表示
  const visibleTechniques = isPremium ? techniques : techniques.slice(0, FREE_TIER_LIMITS.techniques);
  const lockedCount = !isPremium ? Math.max(0, techniques.length - FREE_TIER_LIMITS.techniques) : 0;

  const handleTechniquePress = (techniqueId: string) => {
    router.push({
      pathname: "/technique/[id]",
      params: { id: techniqueId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6 mt-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Text className="text-base text-primary font-semibold">戻る</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-foreground">{categoryInfo?.name}</Text>
        <View className="w-10" />
      </View>

      {/* Technique List */}
      <FlatList
        data={visibleTechniques}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTechniquePress(item.id)}
            className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
                <Text className="text-sm text-muted mt-1 leading-relaxed">{item.description}</Text>
                <View className="flex-row items-center gap-2 mt-2">
                  <View className="flex-row gap-1">
                    {Array.from({ length: item.difficulty }).map((_, i) => (
                      <Text key={i} className="text-xs text-primary">
                        *
                      </Text>
                    ))}
                  </View>
                  <Text className="text-xs text-muted">難易度: {item.difficulty}/5</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          lockedCount > 0 ? (
            <View className="p-4 bg-surface rounded-lg border border-border mt-4">
              <Text className="text-foreground font-semibold mb-3">
                🔒 {lockedCount}個のコンテンツがロック中
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/premium')}
                className="bg-primary px-4 py-2 rounded-full"
              >
                <Text className="text-white font-semibold text-center">
                  プレミアムで全て見る
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
