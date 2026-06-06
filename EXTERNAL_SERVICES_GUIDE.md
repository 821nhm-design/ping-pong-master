# 外部サービス統合ガイド

Ping Pong Masterアプリに5つの外部サービスを統合するための完全ガイドです。

---

## 1. Stripe（決済処理）

### 概要
プレミアムサブスクリプション決済を処理します。

### APIキー取得手順

#### ステップ1: Stripeアカウント作成
1. [Stripe 公式サイト](https://stripe.com/jp)にアクセス
2. 「アカウントを作成」をクリック
3. メールアドレス、パスワード、ビジネス情報を入力
4. メール確認を完了

#### ステップ2: APIキーを取得
1. [Stripe ダッシュボード](https://dashboard.stripe.com)にログイン
2. 左メニュー → 「開発者」→ 「APIキー」
3. 以下をコピー：
   - **公開可能キー**: `pk_test_...` または `pk_live_...`
   - **シークレットキー**: `sk_test_...` または `sk_live_...`

#### ステップ3: 環境変数に設定
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### 実装内容
- ✅ 月間・年間プラン決済
- ✅ サブスクリプション管理
- ✅ 決済成功後のプレミアム機能アンロック
- ✅ 購入履歴表示

### ダッシュボード
- テスト: https://dashboard.stripe.com/test/dashboard
- 本番: https://dashboard.stripe.com/dashboard

---

## 2. Google Maps（地図表示）

### 概要
プロ選手の活動地域、道場・練習場の位置を地図上に表示します。

### APIキー取得手順

#### ステップ1: Google Cloud Projectを作成
1. [Google Cloud Console](https://console.cloud.google.com)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクト名：「Ping Pong Master」

#### ステップ2: Maps APIを有効化
1. 「APIとサービス」→ 「ライブラリ」
2. 以下を検索して有効化：
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**

#### ステップ3: APIキーを作成
1. 「認証情報」→ 「認証情報を作成」
2. 「APIキー」を選択
3. キーをコピー

#### ステップ4: APIキーを制限
1. 作成したキーをクリック
2. 「アプリケーションの制限」→ 「ウェブサイト」
3. 「ウェブサイトの制限」にドメインを追加：
   ```
   pingpongapp-dau67txm.manus.space
   localhost:3000
   localhost:8081
   ```
4. 「APIの制限」→ 「Maps JavaScript API」を選択

#### ステップ5: 環境変数に設定
```bash
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD_xxxxxxxxxxxxx
```

### 実装内容
- ✅ プロ選手の活動地域をマップに表示
- ✅ 道場・練習場の位置表示
- ✅ 地図上でのマーカー表示・情報ウィンドウ
- ✅ 住所から座標への変換（Geocoding）

### ダッシュボード
- https://console.cloud.google.com

### 料金
- 無料枠あり（月$200相当）
- 超過分は従量課金

---

## 3. Firebase（認証・データベース）

### 概要
ユーザー認証、リアルタイムデータベース、クラウドストレージを提供します。

### セットアップ手順

#### ステップ1: Firebaseプロジェクト作成
1. [Firebase Console](https://console.firebase.google.com)にアクセス
2. 「プロジェクトを作成」
3. プロジェクト名：「Ping Pong Master」
4. Google Analyticsを有効化（オプション）

#### ステップ2: アプリを登録
1. 「ウェブ」アイコンをクリック
2. アプリ名：「Ping Pong Master Web」
3. Firebase Hostingをチェック
4. 「アプリを登録」

#### ステップ3: 設定情報をコピー
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_xxxxxxxxxxxxx",
  authDomain: "ping-pong-master.firebaseapp.com",
  projectId: "ping-pong-master",
  storageBucket: "ping-pong-master.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

#### ステップ4: 認証方法を有効化
1. 「認証」→ 「Sign-in method」
2. 以下を有効化：
   - **メール/パスワード**
   - **Google**
   - **Apple**

#### ステップ5: Realtime Databaseを作成
1. 「Realtime Database」→ 「データベースを作成」
2. ロケーション：「asia-northeast1（東京）」
3. セキュリティルール：「テストモード」（後で制限）

#### ステップ6: 環境変数に設定
```bash
VITE_FIREBASE_API_KEY=AIzaSyD_xxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=ping-pong-master.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ping-pong-master
VITE_FIREBASE_STORAGE_BUCKET=ping-pong-master.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx
```

### 実装内容
- ✅ メール・パスワード認証
- ✅ OAuth認証（Google・Apple）
- ✅ ユーザープロフィール管理
- ✅ お気に入りデータの同期
- ✅ プレミアム購入履歴の保存

### ダッシュボード
- https://console.firebase.google.com

### 料金
- 無料枠あり（読み取り/書き込み 100,000回/日）
- 超過分は従量課金

---

## 4. OpenAI（AI機能）

### 概要
AI による戦術分析、練習計画生成、質問応答を提供します。

### APIキー取得手順

#### ステップ1: OpenAIアカウント作成
1. [OpenAI Platform](https://platform.openai.com)にアクセス
2. 「Sign up」をクリック
3. メールアドレス、パスワードを入力
4. メール確認を完了

#### ステップ2: 支払い情報を登録
1. 「Billing」→ 「Billing overview」
2. クレジットカード情報を入力
3. 請求先住所を入力

#### ステップ3: APIキーを作成
1. 「API keys」→ 「Create new secret key」
2. キーをコピー（再度表示されません）

#### ステップ4: 使用制限を設定（推奨）
1. 「Billing」→ 「Usage limits」
2. 月間使用制限を設定（例：$50/月）

#### ステップ5: 環境変数に設定
```bash
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

### 実装内容
- ✅ AI による戦術分析（GPT-4）
- ✅ 練習計画の自動生成
- ✅ ユーザーの質問に対する回答
- ✅ 技術改善のアドバイス生成

### ダッシュボード
- https://platform.openai.com

### 料金
- 従量課金（GPT-4: $0.03/1K入力トークン、$0.06/1K出力トークン）
- 無料クレジット：$5（3ヶ月有効）

### 注意事項
- ⚠️ **シークレットキーは絶対に公開しないでください**
- バックエンド経由でのみ使用（フロントエンドで直接使用しない）

---

## 5. YouTube Data API（動画データ）

### 概要
プロ選手の試合動画、レッスン動画、テクニック解説動画を表示します。

### APIキー取得手順

#### ステップ1: Google Cloud Projectを作成
1. [Google Cloud Console](https://console.cloud.google.com)にアクセス
2. 既存のプロジェクト（Google Maps用）を使用、または新規作成

#### ステップ2: YouTube Data API v3を有効化
1. 「APIとサービス」→ 「ライブラリ」
2. 「YouTube Data API v3」を検索
3. 「有効にする」をクリック

#### ステップ3: APIキーを作成
1. 「認証情報」→ 「認証情報を作成」
2. 「APIキー」を選択
3. キーをコピー

#### ステップ4: APIキーを制限
1. 作成したキーをクリック
2. 「アプリケーションの制限」→ 「ウェブサイト」
3. 「ウェブサイトの制限」にドメインを追加：
   ```
   pingpongapp-dau67txm.manus.space
   localhost:3000
   localhost:8081
   ```
4. 「APIの制限」→ 「YouTube Data API v3」を選択

#### ステップ5: 環境変数に設定
```bash
VITE_YOUTUBE_API_KEY=AIzaSyD_xxxxxxxxxxxxx
```

### 実装内容
- ✅ YouTubeから動画を検索・表示
- ✅ プロ選手の試合動画リスト
- ✅ テクニック解説動画の埋め込み
- ✅ 再生リストの表示

### ダッシュボード
- https://console.cloud.google.com

### 料金
- 無料枠あり（月1,000,000ユニット）
- 超過分は従量課金

### 注意事項
- ⚠️ **公開キーなので、フロントエンドで使用可能**
- ただし、ドメイン制限を設定して不正使用を防止

---

## 環境変数の一覧

### 開発環境（`.env.local`）
```bash
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD_xxxxxxxxxxxxx

# Firebase
VITE_FIREBASE_API_KEY=AIzaSyD_xxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=ping-pong-master.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ping-pong-master
VITE_FIREBASE_STORAGE_BUCKET=ping-pong-master.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx

# OpenAI
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# YouTube Data API
VITE_YOUTUBE_API_KEY=AIzaSyD_xxxxxxxxxxxxx
```

### 本番環境（Manus WebDev Secrets）
Manus WebDev 管理画面の「Settings」→「Secrets」から、上記の環境変数をすべて設定してください。

---

## セキュリティのベストプラクティス

### 公開キーと秘密キー
| キー | 用途 | 公開可能 | 場所 |
|------|------|---------|------|
| Stripe Publishable Key | フロントエンド決済 | ✅ | フロントエンド |
| Stripe Secret Key | バックエンド処理 | ❌ | バックエンドのみ |
| Google Maps API Key | マップ表示 | ✅ | フロントエンド（ドメイン制限） |
| Firebase API Key | 認証・DB | ✅ | フロントエンド（セキュリティルール） |
| OpenAI API Key | AI処理 | ❌ | バックエンドのみ |
| YouTube API Key | 動画検索 | ✅ | フロントエンド（ドメイン制限） |

### セキュリティチェックリスト
- [ ] シークレットキーは `.env.local` に保存（`.gitignore` に追加）
- [ ] 本番環境では Manus WebDev Secrets を使用
- [ ] APIキーに対してドメイン制限を設定
- [ ] 月間使用制限を設定（予期しない請求を防止）
- [ ] 定期的にキーをローテーション
- [ ] 不正使用の監視を設定

---

## 次のステップ

1. **各サービスのアカウント作成**
   - Stripe、Google Cloud、Firebase、OpenAI、YouTube

2. **APIキーの取得**
   - 各サービスからキーをコピー

3. **環境変数の設定**
   - 開発環境：`.env.local`
   - 本番環境：Manus WebDev Secrets

4. **統合実装**
   - 各サービスのSDKをインストール
   - フロントエンド・バックエンド実装

5. **テスト**
   - 各機能のテスト実行
   - 本番環境でのテスト

---

## トラブルシューティング

### APIキーが機能しない
- [ ] キーをコピーする際に空白が含まれていないか確認
- [ ] テスト環境と本番環境のキーを混同していないか確認
- [ ] ドメイン制限が正しく設定されているか確認
- [ ] APIが有効化されているか確認

### 認証エラー
- [ ] APIキーの有効期限を確認
- [ ] 使用制限に達していないか確認
- [ ] リクエストの形式が正しいか確認

### 予期しない請求
- [ ] 月間使用制限が設定されているか確認
- [ ] 不正なAPIコールがないか確認
- [ ] 本番環境のキーが誤って使用されていないか確認

---

## サポート

各サービスの公式ドキュメント：
- [Stripe Documentation](https://stripe.com/docs)
- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
