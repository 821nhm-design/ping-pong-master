import { FlatList, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS, searchTerms } from "@/lib/glossary-data";
import { isPremiumUser, FREE_TIER_LIMITS } from "@/lib/premium-utils";

export default function GlossaryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    const premium = await isPremiumUser();
    setIsPremium(premium);
  };

  let displayTerms = searchQuery
    ? searchTerms(searchQuery)
    : selectedCategory
      ? GLOSSARY_TERMS.filter((t) => t.category === selectedCategory)
      : GLOSSARY_TERMS;

  // 無料版の場合は最初の30個のみ表示
  const lockedCount = !isPremium ? Math.max(0, displayTerms.length - FREE_TIER_LIMITS.glossary) : 0;
  displayTerms = isPremium ? displayTerms : displayTerms.slice(0, FREE_TIER_LIMITS.glossary);

  const handleTermPress = (termId: string) => {
    router.push({
      pathname: "/glossary/[id]",
      params: { id: termId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="mb-4 mt-2">
        <Text className="text-2xl font-bold text-foreground mb-4">用語辞典</Text>

        {/* Search Bar */}
        <TextInput
          placeholder="用語を検索..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-surface border border-border rounded-lg px-4 py-2 text-foreground mb-4"
        />

        {/* Category Selector */}
        <FlatList
          data={GLOSSARY_CATEGORIES}
          keyExtractor={(item) => item.id}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory(selectedCategory === item.id ? null : item.id);
                setSearchQuery("");
              }}
              className={`mr-2 py-2 px-3 rounded-lg ${
                selectedCategory === item.id
                  ? "bg-primary"
                  : "bg-surface border border-border"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  selectedCategory === item.id ? "text-white" : "text-foreground"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </View>

      {/* Terms List */}
      <FlatList
        data={displayTerms}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTermPress(item.id)}
            className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{item.term}</Text>
                <Text className="text-xs text-muted mt-1">（{item.furigana}）</Text>
                <Text className="text-sm text-muted mt-2 leading-relaxed">{item.definition}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          lockedCount > 0 ? (
            <View className="p-4 bg-surface rounded-lg border border-border mt-4">
              <Text className="text-foreground font-semibold mb-3">
                🔒 {lockedCount}個の用語がロック中
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
