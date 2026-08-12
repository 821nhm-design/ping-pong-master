import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export default function TermsScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="p-0 flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-[#E94F1D] px-5 pt-8 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-bold">← 戻る</Text>
          </Pressable>
          <Text className="text-white text-3xl font-black">利用規約</Text>
          <Text className="text-white/90 mt-2">Terms of Service</Text>
        </View>

        <View className="p-5 gap-5">
          <Text className="text-xs text-gray-500">最終更新日：2026年8月12日（公開前に内容をご確認ください）</Text>
          <Text className="text-sm text-gray-700 leading-relaxed">
            本利用規約（以下「本規約」）は、[販売者名・事業者名]（以下「当方」）が提供するPing Pong Master（以下「本サービス」）の利用条件を定めるものです。本サービスを購入または利用した時点で、本規約に同意したものとみなします。
          </Text>

          <Section title="第1条（サービス内容）">
            本サービスは、卓球の技術・用語・練習方法・選手情報その他のデジタルコンテンツを提供する学習サービスです。提供内容、対応端末、機能は、当方の判断により変更・追加・終了することがあります。
          </Section>
          <Section title="第2条（買い切りライセンス）">
            買い切り版の購入者には、購入者本人が個人的に利用するための、非独占的・譲渡不可の永久ライセンスを付与します。アカウントの共有、再販売、転載、複製、公衆送信、商用利用目的の再配布は禁止します。将来のアップデートは、当方が合理的な範囲で提供しますが、特定の機能や更新を保証するものではありません。
          </Section>
          <Section title="第3条（アカウント管理）">
            利用者は、登録情報を正確かつ最新に保ち、アカウント情報を自己の責任で管理するものとします。第三者による不正利用が疑われる場合は、速やかに当方へ連絡してください。
          </Section>
          <Section title="第4条（禁止事項）">
            法令または公序良俗に反する行為、サービスへの不正アクセス、コンテンツの無断転載・販売、他の利用者への迷惑行為、決済・認証を回避する行為を禁止します。
          </Section>
          <Section title="第5条（知的財産権）">
            本サービスに含まれる文章、図表、画像、プログラム、商標その他の素材に関する権利は、当方または正当な権利者に帰属します。本規約で明示的に許諾された範囲を超えて利用することはできません。
          </Section>
          <Section title="第6条（決済・返金）">
            決済はStripeの決済基盤を通じて処理されます。価格、支払時期、デジタル商品の提供時期、返金条件は「特定商取引法に基づく表記」に定めます。消費者保護法令により返金等が必要となる場合は、その法令に従います。
          </Section>
          <Section title="第7条（免責・サービスの停止）">
            当方は、合理的な安全対策を講じますが、通信障害、端末・ブラウザ環境、第三者サービスの障害、不可抗力による損害について、法令で許される範囲で責任を負いません。卓球の練習・競技にあたっては、利用者自身の体調と安全を優先してください。
          </Section>
          <Section title="第8条（規約の変更・準拠法）">
            当方は、法令変更、サービス変更その他の合理的な必要性がある場合、本規約を変更できます。重要な変更はサービス上で告知します。本規約は日本法を準拠法とし、紛争については[管轄裁判所]を第一審の専属的合意管轄とします。
          </Section>

          <Text className="text-sm text-gray-700 leading-relaxed">
            海外利用者についても、強行法規によって認められる権利を制限するものではありません。欧州経済領域、英国、米国その他の地域で販売する場合は、対象地域の消費者保護・デジタルコンテンツ・税務規則を確認したうえで公開してください。
          </Text>
          <Text className="text-xs text-gray-500">お問い合わせ：[公開用メールアドレス]</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <View>
      <Text className="text-base font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-sm text-gray-700 leading-relaxed">{children}</Text>
    </View>
  );
}
