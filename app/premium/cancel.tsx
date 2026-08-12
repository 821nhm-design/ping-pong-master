import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export default function PremiumCancelScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="p-0 flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, flexGrow: 1, justifyContent: "center" }}>
        <View className="items-center">
          <Text className="text-6xl mb-5">↩️</Text>
          <Text className="text-3xl font-black text-gray-900 text-center mb-3">購入をキャンセルしました</Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed mb-8">
            決済は完了していません。購入を続ける場合は、プレミアム画面へ戻って再度お手続きください。
          </Text>
          <Pressable onPress={() => router.replace("/premium")} className="rounded-lg bg-[#E94F1D] px-6 py-3">
            <Text className="text-white font-bold">プレミアム画面へ戻る</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
