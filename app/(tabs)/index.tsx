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

const YOUTUBE_CHANNELS = [
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
];

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

  const handleChannelPress = (url: string) => {
    Linking.openURL(url);
  };

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

          {/* その他のリソース */}
          <View className="mt-2">
            <Text className="text-lg font-bold text-foreground mb-3">学習リソース</Text>
            
            {/* 用語辞典 */}
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

            {/* 体幹トレーニング */}
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

            {/* 練習メニュー */}
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

            {/* プロ選手 */}
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

          {/* おすすめYouTubeチャンネル */}
          <View className="mt-2">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">▶️</Text>
              <Text className="text-lg font-bold text-foreground">おすすめYouTubeチャンネル</Text>
            </View>
            <Text className="text-sm text-muted mb-4">
              世界の卓球トップチャンネルで試合・技術・最新情報をチェック
            </Text>
            {YOUTUBE_CHANNELS.map((channel) => (
              <TouchableOpacity
                key={channel.handle}
                onPress={() => handleChannelPress(channel.url)}
                style={{
                  backgroundColor: channel.bgColor,
                  borderLeftColor: channel.accentColor,
                }}
                className="rounded-xl p-4 border-l-4 mb-3 active:opacity-75"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-xl mr-2">{channel.emoji}</Text>
                      <Text
                        className="text-base font-bold"
                        style={{ color: channel.accentColor }}
                      >
                        {channel.name}
                      </Text>
                    </View>
                    <Text className="text-xs text-muted mb-1">{channel.handle}</Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      {channel.description}
                    </Text>
                  </View>
                  <View className="ml-3 items-end">
                    <View
                      style={{ backgroundColor: channel.accentColor + "20" }}
                      className="rounded-full px-2 py-1 mb-1"
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{ color: channel.accentColor }}
                      >
                        {channel.subscribers}
                      </Text>
                    </View>
                    <Text className="text-lg">→</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
