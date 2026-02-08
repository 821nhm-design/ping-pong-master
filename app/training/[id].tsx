import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { trainingMenusMega } from "@/lib/training-data-mega";

export default function TrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "steps" | "tips">("overview");
  const menu = id ? trainingMenusMega.find((m) => m.id === id) : null;

  if (!menu) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">練習メニューが見つかりません</Text>
      </ScreenContainer>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-error px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">戻る</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground flex-1 text-center ml-2">{menu.name}</Text>
        </View>

        {/* Quick Info */}
        <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
          <Text className="text-sm text-muted mb-1">レベル: {menu.level === "beginner" ? "初心者" : menu.level === "intermediate" ? "中級者" : "上級者"}</Text>
          <Text className="text-sm text-muted mb-1">所要時間: {menu.duration}</Text>
          <Text className="text-sm text-muted">カテゴリ: {menu.category}</Text>
        </View>

        {/* Description */}
        <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
          <Text className="text-sm text-black">{menu.description}</Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row gap-2 mb-4 border-b border-border pb-2">
          {["overview", "steps", "tips"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`font-semibold ${
                  activeTab === tab ? "text-white" : "text-foreground"
                }`}
              >
                {tab === "overview" ? "概要" : tab === "steps" ? "手順" : "コツ"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <View>
            <Text className="text-base font-bold text-foreground mb-3">効果</Text>
            {menu.benefits.map((benefit, idx) => (
              <View key={idx} className="flex-row mb-2">
                <Text className="text-black mr-2">• </Text>
                <Text className="text-black flex-1">{benefit}</Text>
              </View>
            ))}
            {menu.equipment && menu.equipment.length > 0 && (
              <>
                <Text className="text-base font-bold text-foreground mb-3 mt-4">必要な道具</Text>
                {menu.equipment.map((eq, idx) => (
                  <View key={idx} className="flex-row mb-2">
                    <Text className="text-black mr-2">• </Text>
                    <Text className="text-black">{eq}</Text>
                  </View>
                ))}
              </>
            )}
            {(menu as any).sets && (
              <>
                <Text className="text-base font-bold text-foreground mb-3 mt-4">セット数</Text>
                <Text className="text-black">{(menu as any).sets}</Text>
              </>
            )}
            {(menu as any).reps && (
              <>
                <Text className="text-base font-bold text-foreground mb-3 mt-4">回数</Text>
                <Text className="text-black">{(menu as any).reps}</Text>
              </>
            )}
          </View>
        )}

        {activeTab === "steps" && (
          <View>
            <Text className="text-base font-bold text-foreground mb-3">手順</Text>
            {menu.steps.map((step, idx) => (
              <View key={idx} className="flex-row mb-3">
                <Text className="text-black font-bold mr-3">{idx + 1}.</Text>
                <Text className="text-black flex-1">{step}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === "tips" && (
          <View>
            <Text className="text-base font-bold text-foreground mb-3">コツ</Text>
            {menu.tips.map((tip, idx) => (
              <View key={idx} className="flex-row mb-2">
                <Text className="text-black mr-2">✓ </Text>
                <Text className="text-black flex-1">{tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </ScreenContainer>
  );
}
