import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { getCoreTrainingMenuById } from "@/lib/core-training-data";

export default function CoreTrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "procedure" | "tips">("overview");
  const menu = id ? getCoreTrainingMenuById(id) : null;

  if (!menu) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">トレーニングメニューが見つかりません</Text>
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
          <Text className="text-2xl font-bold text-foreground flex-1 text-center">{menu.name}</Text>
          <View className="w-10" />
        </View>

        {/* Quick Info */}
        <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row gap-1">
              {Array.from({ length: menu.difficulty }).map((_, i) => (
                <Text key={i} className="text-sm text-primary">
                  *
                </Text>
              ))}
            </View>
            <Text className="text-sm text-muted">難易度: {menu.difficulty}/5</Text>
          </View>
          <Text className="text-sm text-muted mb-1">所要時間: {menu.duration}</Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row gap-2 mb-4 border-b border-border pb-2">
          <TouchableOpacity
            onPress={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "pb-2 border-b-2 border-primary" : "pb-2"}
          >
            <Text className={activeTab === "overview" ? "font-semibold text-foreground" : "text-muted"}>
              概要
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("procedure")}
            className={activeTab === "procedure" ? "pb-2 border-b-2 border-primary" : "pb-2"}
          >
            <Text className={activeTab === "procedure" ? "font-semibold text-foreground" : "text-muted"}>
              手順
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("tips")}
            className={activeTab === "tips" ? "pb-2 border-b-2 border-primary" : "pb-2"}
          >
            <Text className={activeTab === "tips" ? "font-semibold text-foreground" : "text-muted"}>
              コツ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <View className="gap-4 pb-6">
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">説明</Text>
              <Text className="text-sm text-muted leading-relaxed">{menu.description}</Text>
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">目標</Text>
              {menu.objectives.map((objective, index) => (
                <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                  • {objective}
                </Text>
              ))}
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">メリット</Text>
              {menu.benefits.map((benefit, index) => (
                <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                  • {benefit}
                </Text>
              ))}
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">必要な道具</Text>
              {menu.requiredEquipment.map((equipment, index) => (
                <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                  • {equipment}
                </Text>
              ))}
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">バリエーション</Text>
              {menu.variations.map((variation, index) => (
                <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                  • {variation}
                </Text>
              ))}
            </View>
          </View>
        )}

        {activeTab === "procedure" && (
          <View className="gap-4 pb-6">
            <Text className="text-sm font-semibold text-foreground">トレーニングの手順</Text>
            {menu.procedure.map((step, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                  <Text className="text-white font-semibold text-sm">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-muted leading-relaxed pt-1">{step}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === "tips" && (
          <View className="gap-4 pb-6">
            <Text className="text-sm font-semibold text-foreground">トレーニングのコツ</Text>
            {menu.tips.map((tip, index) => (
              <View key={index} className="bg-surface rounded-lg p-3 border border-border">
                <Text className="text-sm text-muted leading-relaxed">{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
