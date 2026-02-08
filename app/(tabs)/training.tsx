import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export default function TrainingTabScreen() {
  const router = useRouter();

  const handleNavigateToMenus = () => {
    router.push("/training");
  };

  const handleNavigateToConcepts = () => {
    router.push("/training/concepts");
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-6">
          {/* Header */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-3xl font-bold text-foreground">練習メニュー</Text>
            <Text className="text-sm text-muted text-center">
              段階別の練習メニューと練習方法を学ぼう
            </Text>
          </View>

          {/* Training Menus Section */}
          <TouchableOpacity
            onPress={handleNavigateToMenus}
            className="bg-surface rounded-2xl p-6 border border-border active:opacity-80"
          >
            <View className="gap-3">
              <Text className="text-xl font-bold text-foreground">練習メニュー</Text>
              <Text className="text-sm text-muted leading-relaxed">
                初心者から上級者まで、段階別の練習メニューを紹介しています。自分のレベルに合わせた練習を選択できます。
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <View>
                  <Text className="text-xs text-muted">初心者・中級者・上級者向け</Text>
                  <Text className="text-xs text-muted">1球練習・多球練習など</Text>
                </View>
                <Text className="text-lg text-primary">→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Training Concepts Section */}
          <TouchableOpacity
            onPress={handleNavigateToConcepts}
            className="bg-surface rounded-2xl p-6 border border-border active:opacity-80"
          >
            <View className="gap-3">
              <Text className="text-xl font-bold text-foreground">練習方法</Text>
              <Text className="text-sm text-muted leading-relaxed">
                1球練習、多球練習、ランダー、ランダム練習など、様々な練習方法について詳しく解説しています。
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <View>
                  <Text className="text-xs text-muted">1球練習の詳細</Text>
                  <Text className="text-xs text-muted">多球練習・ランダー・ランダム</Text>
                </View>
                <Text className="text-lg text-primary">→</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tips Section */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-lg font-bold text-foreground mb-3">上達のコツ</Text>
            <View className="gap-2">
              <Text className="text-sm text-muted leading-relaxed">
                • 毎日少しずつ練習することが重要です
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                • 基本技術を完璧にしてから応用技術に進みましょう
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                • 自分のレベルに合った練習メニューを選択してください
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                • 定期的に試合をして実戦経験を積みましょう
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                • 弱点を特定して集中的に改善することが上達の近道です
              </Text>
            </View>
          </View>

          {/* Level Guide */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-lg font-bold text-foreground mb-3">レベル別ガイド</Text>
            
            <View className="gap-4">
              <View>
                <Text className="text-base font-semibold text-foreground mb-2">初心者向け</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  基本的なフォーム、ツッツキ、フットワークなど、卓球の基礎を習得します。毎日少しずつ練習することが重要です。
                </Text>
              </View>

              <View>
                <Text className="text-base font-semibold text-foreground mb-2">中級者向け</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  ドライブ、カウンター、サーブレシーブなど、より高度な技術を習得します。多球練習やランダム練習で実戦力を養います。
                </Text>
              </View>

              <View>
                <Text className="text-base font-semibold text-foreground mb-2">上級者向け</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  試合シミュレーション、技術の組み合わせ、弱点克服など、総合的な実力向上を目指します。定期的な試合経験が重要です。
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
