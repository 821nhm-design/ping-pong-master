import { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { savePurchase } from "@/lib/premium-utils";
import { getCurrentUser } from "@/lib/auth-utils";

export default function PremiumSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ session_id?: string }>();
  const [checking, setChecking] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      if (!params.session_id) return;
      const user = await getCurrentUser();
      if (!user) return;
      const response = await fetch(`/api/stripe/checkout-session/${encodeURIComponent(params.session_id)}`);
      if (!response.ok) return;
      const data = await response.json();
      if (data.success && data.paid && data.userId === user.id && data.planId === "pro") {
        await savePurchase(user.id);
        setVerified(true);
      }
    } catch (error) {
      console.error("Failed to verify Stripe checkout session", error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <ScreenContainer className="p-0 flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, flexGrow: 1, justifyContent: "center" }}>
        <View className="items-center">
          <Text className="text-6xl mb-5">{verified ? "🎉" : "⏳"}</Text>
          <Text className="text-3xl font-black text-gray-900 text-center mb-3">
            {checking ? "決済を確認しています" : verified ? "購入が完了しました" : "決済を確認できませんでした"}
          </Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed mb-8">
            {checking
              ? "Stripeの決済結果を安全に確認しています。画面を閉じずにお待ちください。"
              : verified
                ? "Ping Pong Master Proの永久アクセスが有効になりました。"
                : "決済が確定していないか、ログイン状態を確認できませんでした。サポートへお問い合わせください。"}
          </Text>
          {!checking && (
            <Pressable onPress={() => router.replace("/")} className="rounded-lg bg-[#E94F1D] px-6 py-3">
              <Text className="text-white font-bold">ホームへ戻る</Text>
            </Pressable>
          )}
          {checking && <ActivityIndicator color="#E94F1D" />}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
