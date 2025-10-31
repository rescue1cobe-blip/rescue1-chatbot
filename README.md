# RESCUE-1 チャットボット統合システム

## 📋 概要

RESCUE-1の料金シミュレーターとClaude APIを使用したチャットボットの統合システムです。

### システム構成
- **料金シミュレーター**: 無料の静的HTML（simulator.html）
- **チャットボット**: Claude API + Vercel Serverless Functions

## 💰 料金目安

### 1日100人、平均2〜5問の場合
- **月額コスト**: ¥5,000〜15,000
- **Vercel**: 無料
- **Claude API**: 使用量に応じて課金

## 📦 ファイル構成

```
your-project/
├── simulator.html       # 既存の料金シミュレーター
├── chatbot.html        # チャットボット統合版
├── api/
│   └── chat.js        # Claude API連携（Vercel Function）
├── vercel.json        # Vercel設定
├── package.json       # Node.js設定
└── README.md          # このファイル
```

## 🚀 デプロイ手順

### ステップ1: Vercelアカウント作成

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでサインアップ
3. 無料プランを選択

### ステップ2: プロジェクトの準備

```bash
# 1. プロジェクトフォルダを作成
mkdir rescue1-chatbot
cd rescue1-chatbot

# 2. ファイルを配置
# - chatbot.html
# - simulator.html
# - api/chat.js
# - vercel.json
# - package.json
```

### ステップ3: Vercel CLIのインストール

```bash
# Vercel CLIをインストール
npm install -g vercel

# ログイン
vercel login
```

### ステップ4: 環境変数の設定

```bash
# Anthropic APIキーを設定
vercel env add ANTHROPIC_API_KEY

# 表示されるプロンプトで:
# - Environment: Production
# - Value: あなたのAnthropicAPIキー（sk-ant-api03-...）
```

**APIキーの取得方法:**
1. [Anthropic Console](https://console.anthropic.com/)にログイン
2. 左メニューから「API Keys」を選択
3. 「Create Key」をクリック
4. キーをコピー（`sk-ant-api03-...`で始まる文字列）

### ステップ5: デプロイ

```bash
# 初回デプロイ
vercel

# プロンプトで以下を選択:
# - Set up and deploy?: Y
# - Which scope?: あなたのアカウント
# - Link to existing project?: N
# - Project name: rescue1-chatbot
# - Directory: ./
# - Override settings?: N

# 本番環境にデプロイ
vercel --prod
```

### ステップ6: 動作確認

デプロイ完了後、以下のURLが表示されます:
```
https://rescue1-chatbot-xxxx.vercel.app
```

1. URLにアクセス
2. 右下のチャットアイコンをクリック
3. 「レッカーサービスの料金は？」などと質問
4. Claude AIが応答することを確認

## 🔧 ローカル環境での開発

### 1. Node.jsのインストール
[Node.js公式サイト](https://nodejs.org/)からダウンロード（v18以上推奨）

### 2. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成:
```
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### 3. ローカル開発サーバー起動

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
vercel dev
```

ブラウザで `http://localhost:3000` にアクセス

## 📱 使い方

### チャットボット
1. ページ右下の💬アイコンをクリック
2. 質問を入力して送信
3. Claude AIが回答

### 料金シミュレーター
1. 「料金シミュレーターを使う」ボタンをクリック
2. simulator.htmlに移動
3. 質問形式で料金を計算

## 🎨 カスタマイズ

### システムプロンプトの編集

`api/chat.js`の`SYSTEM_PROMPT`を編集して、ボットの応答をカスタマイズできます。

```javascript
const SYSTEM_PROMPT = `あなたはRESCUE-1の...`;
```

### デザインの変更

`chatbot.html`のCSSセクションを編集:
- カラーテーマ: `--primary-color`
- チャットボタンの位置: `.chat-button`の`bottom`, `right`
- チャットウィンドウのサイズ: `.chat-window`の`width`, `height`

## 📊 使用量の確認

### Anthropic Console
1. [Anthropic Console](https://console.anthropic.com/)にログイン
2. 左メニューから「Usage」を選択
3. トークン使用量と料金を確認

### Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard)にログイン
2. プロジェクトを選択
3. 「Analytics」タブでアクセス数を確認

## 💡 コスト最適化のヒント

1. **max_tokensを調整**: `api/chat.js`で500に設定済み
2. **キャッシュ活用**: よくある質問は静的FAQページへ誘導
3. **使用量監視**: 週次でUsageを確認
4. **予算アラート**: Anthropic Consoleで予算上限を設定可能

## 🔒 セキュリティ

- ✅ APIキーは環境変数で管理
- ✅ フロントエンドにAPIキーを含めない
- ✅ Vercel Functionsは自動的にHTTPS化
- ⚠️ 本番環境では`.env`ファイルをGitにコミットしない

## 🐛 トラブルシューティング

### エラー: "Server configuration error"
→ 環境変数が設定されていません
```bash
vercel env add ANTHROPIC_API_KEY
```

### エラー: "Claude API error: 401"
→ APIキーが無効です
1. Anthropic Consoleで新しいキーを作成
2. Vercelの環境変数を更新

### チャットボットが応答しない
→ ブラウザのコンソールを確認
```
F12 → Console タブ
```

### ローカル開発でAPIが動かない
→ .envファイルを確認
```bash
cat .env
# ANTHROPIC_API_KEY=sk-ant-... が表示されるか確認
```

## 📞 サポート

### RESCUE-1の連絡先
- 出動依頼: 050-5527-6162
- 相談: 050-5846-4108

### 技術サポート
- Vercel: https://vercel.com/support
- Anthropic: https://support.anthropic.com

## 📝 更新履歴

- **2025-10-31**: 初回リリース
  - チャットボット機能追加
  - Claude API統合
  - Vercelデプロイ対応

## 📄 ライセンス

MIT License

---

**作成者**: RESCUE-1  
**最終更新**: 2025-10-31
