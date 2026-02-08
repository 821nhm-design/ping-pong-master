import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { TRAINING_CONCEPTS } from "@/lib/training-data";

export default function TrainingConceptsScreen() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const selectedConceptData = selectedConcept
    ? TRAINING_CONCEPTS.find((c) => c.id === selectedConcept)
    : null;

  return (
    <ScreenContainer className="p-4">
      {selectedConceptData ? (
        // Detail View
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => setSelectedConcept(null)}
            className="mb-4 p-2"
          >
            <Text className="text-lg text-primary font-semibold">戻る</Text>
          </TouchableOpacity>

          <FlatList
            data={[selectedConceptData]}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <View className="gap-4 pb-6">
                <View>
                  <Text className="text-2xl font-bold text-foreground mb-2">{item.name}</Text>
                  <Text className="text-sm text-muted">{item.description}</Text>
                </View>

                <View>
                  <Text className="text-base font-semibold text-foreground mb-2">概要</Text>
                  <Text className="text-sm text-muted leading-relaxed">{item.overview}</Text>
                </View>

                <View>
                  <Text className="text-base font-semibold text-foreground mb-2">メリット</Text>
                  {item.benefits.map((benefit, index) => (
                    <Text key={index} className="text-sm text-muted leading-relaxed mb-1">
                      • {benefit}
                    </Text>
                  ))}
                </View>

                <View>
                  <Text className="text-base font-semibold text-foreground mb-2">手順</Text>
                  {item.procedure.map((step, index) => (
                    <View key={index} className="flex-row gap-3 mb-2">
                      <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                        <Text className="text-white font-semibold text-xs">{index + 1}</Text>
                      </View>
                      <Text className="flex-1 text-sm text-muted leading-relaxed pt-0.5">{step}</Text>
                    </View>
                  ))}
                </View>

                <View>
                  <Text className="text-base font-semibold text-foreground mb-2">コツ</Text>
                  {item.tips.map((tip, index) => (
                    <View key={index} className="bg-surface rounded-lg p-3 border border-border mb-2">
                      <Text className="text-sm text-muted leading-relaxed">{tip}</Text>
                    </View>
                  ))}
                </View>

                <View>
                  <Text className="text-base font-semibold text-foreground mb-2">例</Text>
                  {item.examples.map((example, index) => (
                    <View key={index} className="bg-surface rounded-lg p-3 border border-border mb-2">
                      <Text className="text-sm text-muted leading-relaxed">{example}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        // List View
        <View className="flex-1">
          <Text className="text-2xl font-bold text-foreground mb-4">練習方法</Text>
          <FlatList
            data={TRAINING_CONCEPTS}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedConcept(item.id)}
                className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
              >
                <Text className="text-base font-semibold text-foreground">{item.name}</Text>
                <Text className="text-sm text-muted mt-2 leading-relaxed">{item.description}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      )}
    </ScreenContainer>
  );
}
