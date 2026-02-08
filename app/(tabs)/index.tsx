import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { CATEGORIES } from "@/lib/techniques-data";

const resourceColors = [
  { bg: "#FFE8D6", border: "#FF6B35", icon: "📚" },
  { bg: "#D4F1F4", border: "#004E89", icon: "💪" },
  { bg: "#FFF4E6", border: "#F77F00", icon: "🎯" },
  { bg: "#FFE8D6", border: "#FF6B35", icon: "🌟" },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: "/techniques/[category]",
      params: { category: categoryId },
    });
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View className="bg-gradient-to-b from-orange-400 to-orange-300 px-4 pt-8 pb-6">
          <Text className="text-4xl font-bold text-white mb-2">Ping Pong Master</Text>
          <Text className="text-white text-base opacity-90">
            卓球技術を学んでスキルアップしよう
          </Text>
        </View>

        <View className="gap-4 p-4 pb-6">
          {/* 技術カテゴリ */}
          <View className="mb-2">
            <Text className="text-lg font-bold text-foreground mb-3">基本技術</Text>
            <View className="gap-3">
              {CATEGORIES.map((category, index) => {
                const colors = ["#FF6B35", "#004E89", "#F77F00", "#06A77D", "#D62828"];
                const bgColor = colors[index % colors.length];
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category.id)}
                    style={{ backgroundColor: bgColor + "15", borderLeftColor: bgColor }}
                    className="rounded-xl p-4 border-l-4 active:opacity-75"
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-foreground flex-1">
                        {category.name}
                      </Text>
                      <Text className="text-2xl">→</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* その他のリソース */}
          <View className="mt-2">
            <Text className="text-lg font-bold text-foreground mb-3">学習リソース</Text>
            
            {/* 用語辞典 */}
            <TouchableOpacity
              onPress={() => router.push("/glossary-expanded")}
              style={{ backgroundColor: resourceColors[0].bg, borderLeftColor: resourceColors[0].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[0].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">用語辞典（127個）</Text>
              <Text className="text-sm text-muted">ルール・道具・技術・戦術など全て</Text>
            </TouchableOpacity>

            {/* 体幹トレーニング */}
            <TouchableOpacity
              onPress={() => router.push("/core-training")}
              style={{ backgroundColor: resourceColors[1].bg, borderLeftColor: resourceColors[1].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[1].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">体幹トレーニング</Text>
              <Text className="text-sm text-muted">体を鍛えてパフォーマンスアップ</Text>
            </TouchableOpacity>

            {/* 練習メニュー */}
            <TouchableOpacity
              onPress={() => router.push("/training")}
              style={{ backgroundColor: resourceColors[2].bg, borderLeftColor: resourceColors[2].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[2].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">練習メニュー</Text>
              <Text className="text-sm text-muted">レベル別の練習方法を学ぶ</Text>
            </TouchableOpacity>

            {/* プロ選手 */}
            <TouchableOpacity
              onPress={() => router.push("/pro-players")}
              style={{ backgroundColor: resourceColors[3].bg, borderLeftColor: resourceColors[3].border }}
              className="rounded-xl p-4 border-l-4 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[3].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">プロ選手</Text>
              <Text className="text-sm text-muted">世界トップ選手の戦術を学ぶ</Text>
            </TouchableOpacity>
          </View>

          {/* 情報セクション */}
          <View className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200 mt-4">
            <Text className="text-base font-bold text-foreground mb-2">🏓 このアプリについて</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Ping Pong Masterは、卓球の技術を学ぶための総合学習アプリです。基本技術から応用技術まで、プロ選手の例を交えて詳しく解説しています。
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
