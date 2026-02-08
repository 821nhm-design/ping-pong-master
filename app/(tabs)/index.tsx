import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { CATEGORIES } from "@/lib/techniques-data";

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: "/techniques/[category]",
      params: { category: categoryId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-3xl font-bold text-foreground">Ping Pong Master</Text>
            <Text className="text-sm text-muted text-center">
              卓球技術を学んでスキルアップしよう
            </Text>
          </View>

          {/* Category Grid */}
          <View className="gap-3">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                className="bg-surface rounded-2xl p-4 border border-border active:opacity-80"
                style={{ backgroundColor: category.color + "20" }}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-foreground flex-1">
                    {category.name}
                  </Text>
                  <Text className="text-sm text-muted">→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Additional Resources */}
          <View className="gap-3 mt-2">
            <TouchableOpacity
              onPress={() => router.push("/glossary")}
              className="bg-surface rounded-2xl p-4 border border-border active:opacity-80"
              style={{ backgroundColor: "#E8F4F8" }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-foreground flex-1">用語辞典</Text>
                <Text className="text-sm text-muted">→</Text>
              </View>
              <Text className="text-xs text-muted mt-1">卓球用語を詳しく学ぶ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/core-training")}
              className="bg-surface rounded-2xl p-4 border border-border active:opacity-80"
              style={{ backgroundColor: "#F0E8F8" }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-foreground flex-1">体幹トレーニング</Text>
                <Text className="text-sm text-muted">→</Text>
              </View>
              <Text className="text-xs text-muted mt-1">体を鍛える</Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View className="bg-surface rounded-2xl p-4 border border-border mt-4">
            <Text className="text-sm font-semibold text-foreground mb-2">このアプリについて</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Ping Pong Masterは、卓球の技術を学ぶためのアプリです。基本技術から応用技術まで、プロ選手の例を交えて解説しています。
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
