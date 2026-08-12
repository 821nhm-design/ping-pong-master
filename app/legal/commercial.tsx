import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const rows = [
  ["販売業者", "[氏名または会社名]"],
  ["運営責任者", "[責任者名]"],
  ["所在地", "[住所]"],
  ["電話番号", "[電話番号]（請求があった場合は遅滞なく開示します）"],
  ["メールアドレス", "[公開用メールアドレス]"],
  ["販売価格", "購入画面に表示する価格（日本国内向けは消費税を含む総額表示）"],
  ["商品代金以外の必要料金", "インターネット接続料、通信料、対応端末に必要な費用。海外利用者は購入地域の税・関税等が適用される場合があります。"],
  ["支払方法", "Stripeによるクレジットカード等の決済"],
  ["支払時期", "購入手続き完了時"],
  ["提供時期", "決済確認後、アカウントに買い切りライセンスを付与し、通常は直ちに利用可能"],
  ["動作環境", "対応するiOS、Android、Webブラウザ等の詳細を購入前に表示"],
  ["返品・キャンセル", "デジタルコンテンツの性質上、提供開始後の返品・返金は原則不可。ただし、法令上必要な場合、不具合が当方の責任による場合、または当方が別途定める返金条件に該当する場合を除きます。"],
];

export default function CommercialScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="p-0 flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-[#E94F1D] px-5 pt-8 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-bold">← 戻る</Text>
          </Pressable>
          <Text className="text-white text-3xl font-black">特定商取引法に基づく表記</Text>
          <Text className="text-white/90 mt-2">Commercial Transaction Information</Text>
        </View>

        <View className="p-5 gap-4">
          <View className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <Text className="text-sm font-bold text-orange-900 mb-2">公開前に必ず確認してください</Text>
            <Text className="text-sm text-orange-900 leading-relaxed">
              以下は日本国内向け販売の作業用ドラフトです。氏名・住所・連絡先・価格・返金条件などを実際の販売条件に合わせて記入し、公開前に専門家へ確認してください。海外販売では、販売先の消費者保護法、デジタルコンテンツ規制、税務・VAT/GST、プライバシー法等も確認が必要です。
            </Text>
          </View>

          {rows.map(([label, value]) => (
            <View key={label} className="border-b border-gray-200 pb-3">
              <Text className="text-sm font-bold text-gray-900 mb-1">{label}</Text>
              <Text className="text-sm text-gray-700 leading-relaxed">{value}</Text>
            </View>
          ))}

          <Text className="text-base font-bold text-gray-900 mt-2">海外販売について</Text>
          <Text className="text-sm text-gray-700 leading-relaxed">
            日本の特定商取引法の表記だけで海外販売の義務を満たすとは限りません。販売先に応じて、英語等のTerms of Service、Privacy Policy、Refund Policy、購入前の価格・税・自動更新の有無・デジタル提供条件の表示、現地の消費者取消権やVAT/GST対応を整備してください。Stripeの決済・請求設定と、実際の販売地域・税務登録の整合も確認が必要です。
          </Text>
          <Text className="text-xs text-gray-500">問い合わせ：[公開用メールアドレス]</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
