import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { trainingMenusMega } from "@/lib/training-data-mega";

export default function TrainingMenuScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const menus = trainingMenusMega.filter((menu) => menu.level === selectedLevel);

  const handleMenuPress = (menuId: string) => {
    router.push({
      pathname: "/training/[id]",
      params: { id: menuId },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const levels = [
    { id: "beginner", name: "初心者", color: "#FFE5B4" },
    { id: "intermediate", name: "中級者", color: "#B4E5FF" },
    { id: "advanced", name: "上級者", color: "#FFB4D4" },
  ];

  return (
    <ScreenContainer className="p-4">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-foreground flex-1">練習メニュー</Text>
        <TouchableOpacity
          onPress={handleBack}
          className="bg-error px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">戻る</Text>
        </TouchableOpacity>
      </View>

      {/* Level Selector */}
      <View className="flex-row gap-2 mb-6">
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            onPress={() => setSelectedLevel(level.id as any)}
            className={`flex-1 py-3 px-3 rounded-lg ${
              selectedLevel === level.id
                ? "bg-primary"
                : "bg-surface border border-border"
            }`}
          >
            <Text
              className={`text-sm font-semibold text-center ${
                selectedLevel === level.id ? "text-white" : "text-foreground"
              }`}
            >
              {level.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Training Menus List */}
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleMenuPress(item.id)}
            className="bg-surface rounded-lg p-4 mb-3 border border-border"
          >
            <Text className="text-lg font-bold text-black mb-2">{item.name}</Text>
            <Text className="text-sm text-black mb-2">{item.description}</Text>
            <View className="flex-row justify-between">
              <Text className="text-xs text-gray-600">
                {item.duration}
              </Text>
              <Text className="text-xs text-gray-600">
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <Text className="text-foreground">メニューがありません</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
