import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { SKILL_LEVELS, getTrainingMenusByLevel } from "@/lib/training-data";

export default function TrainingMenuScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const menus = getTrainingMenusByLevel(selectedLevel);

  const handleMenuPress = (menuId: string) => {
    router.push({
      pathname: "/training/[id]",
      params: { id: menuId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="mb-6 mt-2">
        <Text className="text-2xl font-bold text-foreground mb-4">練習メニュー</Text>
        
        {/* Level Selector */}
        <View className="flex-row gap-2">
          {SKILL_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              onPress={() => setSelectedLevel(level.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg ${
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
      </View>

      {/* Training Menus List */}
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleMenuPress(item.id)}
            className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{item.name}</Text>
                <Text className="text-xs text-muted mt-1">{item.trainingType}</Text>
                <Text className="text-sm text-muted mt-2 leading-relaxed">{item.description}</Text>
                <View className="flex-row items-center gap-3 mt-3">
                  <View className="flex-row gap-1">
                    {Array.from({ length: item.difficulty }).map((_, i) => (
                      <Text key={i} className="text-xs text-primary">
                        *
                      </Text>
                    ))}
                  </View>
                  <Text className="text-xs text-muted">{item.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
