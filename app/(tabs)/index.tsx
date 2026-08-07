import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { ScreenContainer } from "@/components/screen-container";
import { CATEGORIES } from "@/lib/techniques-data";
import { isPremiumUser } from "@/lib/premium-utils";

const resourceColors = [
  { bg: "#FFE8D6", border: "#FF6B35", icon: "📚" },
  { bg: "#D4F1F4", border: "#004E89", icon: "💪" },
  { bg: "#FFF4E6", border: "#F77F00", icon: "🎯" },
  { bg: "#FFE8D6", border: "#FF6B35", icon: "🌟" },
];

// ─── 卓球関連サイト ───────────────────────────────────────────

// カテゴリ①：世界の卓球協会（強い順）
const WORLD_ASSOC_SITES = [
  {
    name: "中国卓球協会（CTTA）",
    nameEn: "Chinese Table Tennis Association",
    description: "世界最強・中国卓球の総本山。代表選手情報・大会結果・最新ニュースを掲載",
    url: "https://www.ctta.cn/",
    emoji: "🇨🇳",
    accentColor: "#C8102E",
    bgColor: "#FFF0F0",
    tag: "中国 🥇",
  },
  {
    name: "日本卓球協会（JTTA）",
    nameEn: "Japan Table Tennis Association",
    description: "日本卓球の公式統括団体。全日本選手権・代表選手・大会日程を掲載",
    url: "https://jtta.or.jp/",
    emoji: "🇯🇵",
    accentColor: "#BC002D",
    bgColor: "#FFF5F5",
    tag: "日本 🥈",
  },
  {
    name: "韓国卓球協会（KTTA）",
    nameEn: "Korea Table Tennis Association",
    description: "アジア屈指の強豪・韓国卓球の公式サイト。代表選手・大会情報を掲載",
    url: "https://www.koreatta.or.kr/",
    emoji: "🇰🇷",
    accentColor: "#003478",
    bgColor: "#EFF4FF",
    tag: "韓国 🥉",
  },
];

// カテゴリ②：国内リーグ・地域協会
const DOMESTIC_SITES = [
  {
    name: "卓球 Tリーグ",
    nameEn: "T.LEAGUE",
    description: "世界トップ選手が集う日本の卓球プロリーグ。試合日程・選手・チーム情報",
    url: "https://tleague.jp/",
    emoji: "🏅",
    accentColor: "#0047AB",
    bgColor: "#EFF6FF",
    tag: "プロリーグ",
  },
  {
    name: "沖縄県卓球協会",
    nameEn: "Okinawa Table Tennis Association",
    description: "沖縄県内の卓球競技を統括。大会情報・結果・地域卓球の最新情報",
    url: "https://tta.okinawa/",
    emoji: "🌺",
    accentColor: "#00897B",
    bgColor: "#E8F5E9",
    tag: "沖縄",
  },
];

// カテゴリ③：障害者卓球関連
const PARA_SITES = [
  {
    name: "沖縄県障害者卓球協会",
    nameEn: "Okinawa Disability Table Tennis Association",
    description: "沖縄県内の障害者卓球を統括。沖縄県総合福祉センター内に事務局。大会情報を発信",
    url: "https://akaihane-okinawa.jp/node/123",
    emoji: "♿",
    accentColor: "#0077B6",
    bgColor: "#E0F4FF",
    tag: "沖縄障害",
  },
  {
    name: "パラ卓球協会（日本肢体不自由者卓球協会）",
    nameEn: "Japan Para Table Tennis Association",
    description: "肢体に障害を持つ選手の卓球競技団体。パラ卓球の普及・大会情報を発信",
    url: "https://jptta.or.jp/",
    emoji: "🏃",
    accentColor: "#6A0DAD",
    bgColor: "#F5EEFF",
    tag: "パラ卓球",
  },
  {
    name: "日本知的障がい者卓球連盟",
    nameEn: "Japan Table Tennis Federation for Intellectual Disabilities",
    description: "知的障がいのある選手の卓球全国組織。JTTA・日本パラリンピック委員会に加盟",
    url: "https://jttf-fid.org/",
    emoji: "🧠",
    accentColor: "#2E7D32",
    bgColor: "#F1F8E9",
    tag: "知的障害",
  },
  {
    name: "日本視覚障害者卓球連盟（JATVI）",
    nameEn: "Japan Table Tennis Federation for the Visually Impaired",
    description: "視覚障害者の卓球（サウンドテーブルテニス）を普及する全国組織。大会情報を発信",
    url: "https://jatvi.com/",
    emoji: "👁️",
    accentColor: "#37474F",
    bgColor: "#ECEFF1",
    tag: "視覚障害",
  },
  {
    name: "日本パラスポーツ協会（JPSA）",
    nameEn: "Japan Para-Sports Association",
    description: "全障スポ（全国障害者スポーツ大会）の主催団体。卓球を含む障害者スポーツ全般を統括",
    url: "https://www.parasports.or.jp/",
    emoji: "🌟",
    accentColor: "#E65100",
    bgColor: "#FFF3E0",
    tag: "全障スポ主催",
  },
];

// ─── YouTubeチャンネル ─────────────────────────────────────────

// カテゴリ④：世界の卓球YouTube（登録者数順）
const WORLD_YT_CHANNELS = [
  {
    name: "Pongfinity",
    handle: "@pongfinity",
    description: "世界最大の卓球エンタメチャンネル。トリック動画が大人気",
    subscribers: "470万人",
    url: "https://www.youtube.com/@pongfinity",
    emoji: "🎬",
    accentColor: "#FF6B35",
    bgColor: "#FFF4EE",
  },
  {
    name: "World Table Tennis",
    handle: "@wttglobal",
    description: "世界大会のフルマッチ・ハイライトを配信する公式チャンネル",
    subscribers: "135万人",
    url: "https://www.youtube.com/@wttglobal",
    emoji: "🏆",
    accentColor: "#E53E3E",
    bgColor: "#FFF5F5",
  },
  {
    name: "TableTennisDaily",
    handle: "@tabletennisdaily",
    description: "プロ選手インタビュー・技術解説・試合動画が充実",
    subscribers: "51万人",
    url: "https://www.youtube.com/@tabletennisdaily",
    emoji: "📺",
    accentColor: "#2B6CB0",
    bgColor: "#EBF8FF",
  },
  {
    name: "ITTF World",
    handle: "@ITTFWorld",
    description: "国際卓球連盟の公式チャンネル。パラ卓球・歴史的名勝負も収録",
    subscribers: "13万人",
    url: "https://www.youtube.com/@ITTFWorld",
    emoji: "🌍",
    accentColor: "#276749",
    bgColor: "#F0FFF4",
  },
  {
    name: "ETTU OFFICIAL",
    handle: "@ettutvofficial",
    description: "ヨーロッパ卓球連合公式。欧州選手権・チャンピオンズリーグを配信",
    subscribers: "3.7万人",
    url: "https://www.youtube.com/@ettutvofficial",
    emoji: "🇪🇺",
    accentColor: "#553C9A",
    bgColor: "#FAF5FF",
  },
  {
    name: "KTTATV 대한탁구협회",
    handle: "@kttatv",
    description: "韓国卓球協会の公式チャンネル。国内大会・代表選手の試合動画5,400本以上",
    subscribers: "1.56万人",
    url: "https://www.youtube.com/@kttatv",
    emoji: "🇰🇷",
    accentColor: "#003478",
    bgColor: "#EFF4FF",
  },
  {
    name: "USA Table Tennis",
    handle: "@usatabletennis",
    description: "全米卓球協会（USATT）公式。全米選手権・代表選手・大会ハイライトを配信",
    subscribers: "2.1万人",
    url: "https://www.youtube.com/@usatabletennis",
    emoji: "🇺🇸",
    accentColor: "#B22234",
    bgColor: "#FFF5F5",
  },
  {
    name: "Table Tennis Canada",
    handle: "@TableTennisCanada",
    description: "カナダ卓球協会（TTCAN）公式。カナダ代表選手・国内大会・育成動画を配信",
    subscribers: "1,380人",
    url: "https://www.youtube.com/c/TableTennisCanadaTennisdeTable",
    emoji: "🇨🇦",
    accentColor: "#FF0000",
    bgColor: "#FFF8F8",
  },
];

// カテゴリ⑤：日本の卓球YouTube
const JAPAN_YT_CHANNELS = [
  {
    name: "T.LEAGUE",
    handle: "@tleague",
    description: "卓球Tリーグ公式チャンネル。フルマッチ・ハイライト・試合ライブ配信を実施",
    subscribers: "7.45万人",
    url: "https://www.youtube.com/@tleague",
    emoji: "🏅",
    accentColor: "#0047AB",
    bgColor: "#EFF6FF",
  },
  {
    name: "卓球TV（JTTA公式）",
    handle: "@tabletennis",
    description: "日本卓球協会公式動画配信サイト。全日本選手権・代表戦・大会ライブ配信",
    subscribers: "JTTA公式",
    url: "https://www.youtube.com/@tabletennis",
    emoji: "🇯🇵",
    accentColor: "#BC002D",
    bgColor: "#FFF5F5",
  },
];

// ─── 共通カードコンポーネント用ヘルパー ────────────────────────

type SiteItem = {
  name: string;
  nameEn: string;
  description: string;
  url: string;
  emoji: string;
  accentColor: string;
  bgColor: string;
  tag: string;
};

type ChannelItem = {
  name: string;
  handle: string;
  description: string;
  subscribers: string;
  url: string;
  emoji: string;
  accentColor: string;
  bgColor: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    const premium = await isPremiumUser();
    setIsPremium(premium);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: "/techniques/[category]",
      params: { category: categoryId },
    });
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const renderSiteCard = (site: SiteItem) => (
    <TouchableOpacity
      key={site.url}
      onPress={() => handleLinkPress(site.url)}
      style={{ backgroundColor: site.bgColor, borderLeftColor: site.accentColor }}
      className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-xl mr-2">{site.emoji}</Text>
            <Text className="text-base font-bold flex-1" style={{ color: site.accentColor }}>
              {site.name}
            </Text>
          </View>
          <Text className="text-xs text-muted mb-1">{site.nameEn}</Text>
          <Text className="text-sm text-foreground leading-relaxed">{site.description}</Text>
        </View>
        <View className="ml-3 items-end">
          <View
            style={{ backgroundColor: site.accentColor + "20" }}
            className="rounded-full px-2 py-1 mb-1"
          >
            <Text className="text-xs font-bold" style={{ color: site.accentColor }}>
              {site.tag}
            </Text>
          </View>
          <Text className="text-lg">→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderChannelCard = (channel: ChannelItem) => (
    <TouchableOpacity
      key={channel.handle}
      onPress={() => handleLinkPress(channel.url)}
      style={{ backgroundColor: channel.bgColor, borderLeftColor: channel.accentColor }}
      className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-xl mr-2">{channel.emoji}</Text>
            <Text className="text-base font-bold" style={{ color: channel.accentColor }}>
              {channel.name}
            </Text>
          </View>
          <Text className="text-xs text-muted mb-1">{channel.handle}</Text>
          <Text className="text-sm text-foreground leading-relaxed">{channel.description}</Text>
        </View>
        <View className="ml-3 items-end">
          <View
            style={{ backgroundColor: channel.accentColor + "20" }}
            className="rounded-full px-2 py-1 mb-1"
          >
            <Text className="text-xs font-bold" style={{ color: channel.accentColor }}>
              {channel.subscribers}
            </Text>
          </View>
          <Text className="text-lg">→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = (emoji: string, title: string, subtitle: string) => (
    <View className="mb-3">
      <View className="flex-row items-center mb-1">
        <Text className="text-2xl mr-2">{emoji}</Text>
        <Text className="text-lg font-bold text-foreground">{title}</Text>
      </View>
      <Text className="text-xs text-muted">{subtitle}</Text>
    </View>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View className="bg-gradient-to-b from-orange-400 to-orange-300 px-4 pt-8 pb-6">
          <Text className="text-4xl font-bold text-white mb-2">Ping Pong Master</Text>
          <Text className="text-white text-base opacity-90">
            卓球技術を学んでスキルアップしよう
          </Text>
        </View>

        <View className="gap-4 p-4 pb-6">
          {/* 技術カテゴリ */}
          <View className="mb-2">
            <Text className="text-lg font-bold text-foreground mb-3">基本技術</Text>
            <View className="gap-3">
              {CATEGORIES.map((category, index) => {
                const colors = ["#FF6B35", "#004E89", "#F77F00", "#06A77D", "#D62828"];
                const bgColor = colors[index % colors.length];
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category.id)}
                    style={{ backgroundColor: bgColor + "15", borderLeftColor: bgColor }}
                    className="rounded-xl p-4 border-l-4 active:opacity-75"
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-foreground flex-1">
                        {category.name}
                      </Text>
                      <Text className="text-2xl">→</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 学習リソース */}
          <View className="mt-2">
            <Text className="text-lg font-bold text-foreground mb-3">学習リソース</Text>
            <TouchableOpacity
              onPress={() => router.push("/glossary-expanded")}
              style={{ backgroundColor: resourceColors[0].bg, borderLeftColor: resourceColors[0].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[0].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">用語辞典（127個）</Text>
              <Text className="text-sm text-muted">ルール・道具・技術・戦術など全て</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/core-training")}
              style={{ backgroundColor: resourceColors[1].bg, borderLeftColor: resourceColors[1].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[1].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">体幹トレーニング</Text>
              <Text className="text-sm text-muted">体を鍛えてパフォーマンスアップ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/training")}
              style={{ backgroundColor: resourceColors[2].bg, borderLeftColor: resourceColors[2].border }}
              className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[2].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">練習メニュー</Text>
              <Text className="text-sm text-muted">レベル別の練習方法を学ぶ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/pro-players")}
              style={{ backgroundColor: resourceColors[3].bg, borderLeftColor: resourceColors[3].border }}
              className="rounded-xl p-4 border-l-4 active:opacity-75"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{resourceColors[3].icon}</Text>
                <Text className="text-sm text-foreground">→</Text>
              </View>
              <Text className="text-lg font-bold text-foreground mb-1">プロ選手</Text>
              <Text className="text-sm text-muted">世界トップ選手の戦術を学ぶ</Text>
            </TouchableOpacity>
          </View>

          {/* ① 世界の卓球協会サイト */}
          <View className="mt-2">
            {renderSectionHeader("🌐", "世界の卓球協会", "強豪国の公式サイト（強い順）")}
            {WORLD_ASSOC_SITES.map(renderSiteCard)}
          </View>

          {/* ② 国内リーグ・地域協会 */}
          <View className="mt-2">
            {renderSectionHeader("🏅", "国内リーグ・地域協会", "Tリーグ・沖縄県卓球協会の公式サイト")}
            {DOMESTIC_SITES.map(renderSiteCard)}
          </View>

          {/* ③ 障害者卓球関連サイト */}
          <View className="mt-2">
            {renderSectionHeader("♿", "障害者卓球関連サイト", "パラ卓球・全障スポ・沖縄障害者卓球の公式サイト")}
            {PARA_SITES.map(renderSiteCard)}
          </View>

          {/* ④ 世界の卓球YouTubeチャンネル */}
          <View className="mt-2">
            {renderSectionHeader("▶️", "世界の卓球YouTube", "登録者数の多い世界トップチャンネル（8チャンネル）")}
            {WORLD_YT_CHANNELS.map(renderChannelCard)}
          </View>

          {/* ⑤ 日本の卓球YouTubeチャンネル */}
          <View className="mt-2">
            {renderSectionHeader("🇯🇵", "日本の卓球YouTube", "JTTA公式・Tリーグ公式チャンネル")}
            {JAPAN_YT_CHANNELS.map(renderChannelCard)}
          </View>

          {/* プレミアムバナー */}
          {!isPremium && (
            <View className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl p-4 border border-orange-300 mt-4">
              <Text className="text-base font-bold text-foreground mb-2">🎁 プレミアムを試す</Text>
              <Text className="text-sm text-foreground leading-relaxed mb-3">
                7日間無料で、すべてのコンテンツにアクセスできます。
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/premium')}
                style={{ backgroundColor: '#FF6B35' }}
                className="rounded-lg py-2 px-4"
              >
                <Text className="text-white font-bold text-center">
                  7日間無料トライアルを開始
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 情報セクション */}
          <View className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200 mt-4">
            <Text className="text-base font-bold text-foreground mb-2">🏓 このアプリについて</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Ping Pong Masterは、卓球の技術を学ぶための総合学習アプリです。基本技術から応用技術まで、プロ選手の例を交えて詳しく解説しています。
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
