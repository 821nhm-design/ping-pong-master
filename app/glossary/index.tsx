import { FlatList, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS, searchTerms } from "@/lib/glossary-data";

export default function GlossaryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const displayTerms = searchQuery
    ? searchTerms(searchQuery)
    : selectedCategory
      ? GLOSSARY_TERMS.filter((t) => t.category === selectedCategory)
      : GLOSSARY_TERMS;

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
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
