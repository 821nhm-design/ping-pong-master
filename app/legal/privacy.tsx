import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export default function PrivacyScreen() {
  const router = useRouter();
  return (
    <ScreenContainer className="p-0 flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="bg-[#E94F1D] px-5 pt-8 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Text className="text-white font-bold">← 戻る</Text>
          </Pressable>
          <Text className="text-white text-3xl font-black">プライバシーポリシー</Text>
          <Text className="text-white/90 mt-2">Privacy Policy</Text>
        </View>

        <View className="p-5 gap-5">
          <Text className="text-xs text-gray-500">最終更新日：2026年8月12日（公開前に内容をご確認ください）</Text>
          <Text className="text-sm text-gray-700 leading-relaxed">
            [販売者名・事業者名]（以下「当方」）は、Ping Pong Master（以下「本サービス」）における利用者情報の取扱いについて、以下のとおり定めます。
          </Text>

          <Section title="1. 取得する情報">
            アカウント登録時の氏名または表示名、メールアドレス、認証情報、購入・ライセンス情報、問い合わせ内容、利用端末・OS・アプリのバージョン、アクセスログ等を取得する場合があります。決済カード番号等の決済情報は、原則としてStripeが処理し、当方が完全なカード番号を保持することはありません。
          </Section>
          <Section title="2. 利用目的">
            アカウントの作成・認証、買い切りライセンスの付与、決済・返金・問い合わせ対応、不正利用防止、障害対応、サービス改善、重要なお知らせの送付のために利用します。
          </Section>
          <Section title="3. 第三者サービス">
            決済処理にStripeを利用します。Stripeによる情報の取扱いについては、Stripeのプライバシー情報もご確認ください。認証、ホスティング、アクセス解析、メール送信等の第三者サービスを追加する場合は、サービス名、目的、国外移転の有無を本ページに反映します。
          </Section>
          <Section title="4. 保存期間・安全管理">
            利用目的の達成に必要な期間、または法令上必要な期間、情報を保存します。アクセス制御、暗号化、秘密情報の環境変数管理、委託先の選定など合理的な安全管理措置を講じます。ただし、インターネット上の送受信や保存の安全性を完全に保証するものではありません。
          </Section>
          <Section title="5. 利用者の権利">
            利用者は、法令の範囲内で、自己の個人情報について開示、訂正、削除、利用停止等を求めることができます。請求時には本人確認をお願いする場合があります。欧州経済領域、英国、米国の対象州など、現地法に基づく追加の権利がある場合は、その権利を妨げません。
          </Section>
          <Section title="6. Cookie・解析技術">
            Web版では、ログイン維持、セキュリティ、設定保存のためにCookieまたは類似技術を利用する場合があります。広告・解析ツールを導入する場合は、利用目的、オプトアウト方法、同意取得の方法を追加で明示します。
          </Section>
          <Section title="7. 子どもの利用">
            未成年者は、保護者等の同意を得て利用してください。対象地域の年齢要件に応じて、追加の同意・年齢確認が必要となる場合があります。
          </Section>
          <Section title="8. 改定・問い合わせ">
            法令やサービス内容の変更に応じて本ポリシーを改定することがあります。重要な変更は本サービス上で告知します。問い合わせ先：[公開用メールアドレス]。
          </Section>

          <Text className="text-sm text-gray-700 leading-relaxed">
            本ページは公開前の作業用ドラフトです。実際に海外販売を開始する前に、販売地域、Stripeのデータ処理、Cookieの利用、税務、GDPR等の適用関係を確認し、必要に応じて専門家のレビューを受けてください。
          </Text>
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
