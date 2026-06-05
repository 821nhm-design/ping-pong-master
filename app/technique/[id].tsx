import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { getTechniqueById } from "@/lib/techniques-data";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites-utils";

export default function TechniqueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "steps" | "players">("overview");
  const [isFav, setIsFav] = useState(false);
  const technique = id ? getTechniqueById(id) : null;

  // お気に入り状態を確認
  useEffect(() => {
    if (technique?.id) {
      isFavorite(technique.id, 'technique').then(setIsFav);
    }
  }, [technique?.id]);

  const handleToggleFavorite = async () => {
    if (!technique) return;
    if (isFav) {
      await removeFavorite(technique.id, 'technique');
    } else {
      await addFavorite({
        id: technique.id,
        type: 'technique',
        title: technique.name,
      });
    }
    setIsFav(!isFav);
  };

  if (!technique) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">技術が見つかりません</Text>
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
          <Text className="text-2xl font-bold text-foreground flex-1 text-center">{technique.name}</Text>
          <TouchableOpacity onPress={handleToggleFavorite} className="p-2">
            <Text className="text-2xl">{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Info */}
        <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row gap-1">
              {Array.from({ length: technique.difficulty }).map((_, i) => (
                <Text key={i} className="text-sm text-primary">
                  *
                </Text>
              ))}
            </View>
            <Text className="text-sm text-muted">難易度: {technique.difficulty}/5</Text>
          </View>
          <Text className="text-sm text-muted">習得期間: {technique.learningTime}</Text>
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
            onPress={() => setActiveTab("steps")}
            className={activeTab === "steps" ? "pb-2 border-b-2 border-primary" : "pb-2"}
          >
            <Text className={activeTab === "steps" ? "font-semibold text-foreground" : "text-muted"}>
              打ち方
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("players")}
            className={activeTab === "players" ? "pb-2 border-b-2 border-primary" : "pb-2"}
          >
            <Text className={activeTab === "players" ? "font-semibold text-foreground" : "text-muted"}>
              プロ選手
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <View className="gap-4 pb-6">
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">説明</Text>
              <Text className="text-sm text-muted leading-relaxed">{technique.overview}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">コツ</Text>
              {technique.tips.map((tip, index) => (
                <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                  • {tip}
                </Text>
              ))}
            </View>
          </View>
        )}

        {activeTab === "steps" && (
          <View className="gap-4 pb-6">
            <Text className="text-sm font-semibold text-foreground">打ち方のステップ</Text>
            {technique.steps.map((step, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                  <Text className="text-white font-semibold text-sm">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-sm text-muted leading-relaxed pt-1">{step}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === "players" && (
          <View className="gap-4 pb-6">
            {technique.proPlayers.length > 0 ? (
              technique.proPlayers.map((player) => (
                <View key={player.id} className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-base font-semibold text-foreground">{player.name}</Text>
                  <Text className="text-xs text-muted mt-1">{player.country}</Text>
                  <Text className="text-sm text-muted mt-2 leading-relaxed">{player.profile}</Text>
                  <View className="mt-2 bg-primary bg-opacity-10 rounded px-2 py-1">
                    <Text className="text-xs text-primary font-semibold">{player.specialty}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-sm text-muted">プロ選手の情報はまだ登録されていません</Text>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
