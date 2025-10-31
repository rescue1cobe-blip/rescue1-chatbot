# 🚀 クイックスタートガイド

## 5分でデプロイ！

### 1️⃣ 準備（2分）

**必要なもの:**
- GitHubアカウント
- Anthropic APIキー（無料で取得可能）

**APIキーの取得:**
1. https://console.anthropic.com/ にアクセス
2. GitHubアカウントでログイン
3. 左メニュー「API Keys」→「Create Key」
4. キーをコピー（`sk-ant-api03-...`で始まる）

### 2️⃣ デプロイ（3分）

#### 方法A: Vercel CLIを使う（推奨）

```bash
# 1. Vercel CLIをインストール
npm install -g vercel

# 2. ログイン
vercel login

# 3. プロジェクトフォルダに移動
cd rescue1-chatbot

# 4. APIキーを設定
vercel env add ANTHROPIC_API_KEY
# → Production を選択
# → APIキーを貼り付け

# 5. デプロイ！
vercel --prod
```

#### 方法B: Vercel Webサイトを使う

1. https://vercel.com にアクセス
2. 「Import Project」をクリック
3. GitHubリポジトリを選択（または手動アップロード）
4. 「Environment Variables」で設定:
   - Name: `ANTHROPIC_API_KEY`
   - Value: あなたのAPIキー
5. 「Deploy」をクリック

### 3️⃣ 完成！

デプロイされたURL（例: `https://rescue1-chatbot-xxxx.vercel.app`）にアクセスして、右下の💬アイコンをクリック！

## 📊 コスト確認

### 毎日チェック
https://console.anthropic.com/ の「Usage」で使用量を確認

### 予算設定
1日あたりの上限を設定可能（例: $5/日）

## ❓ よくある質問

**Q: 料金はいくらかかりますか？**
A: 1日100人で月¥5,000〜15,000程度です。

**Q: 無料枠はありますか？**
A: Anthropic APIは従量課金ですが、Vercelは無料です。

**Q: カスタマイズできますか？**
A: はい！`api/chat.js`のプロンプトを編集してください。

**Q: 安全ですか？**
A: APIキーは環境変数で管理され、フロントエンドに露出しません。

## 🆘 困ったら

1. README.mdの「トラブルシューティング」を確認
2. Vercel Dashboardのログを確認
3. ブラウザのコンソール（F12）を確認

---

**もっと詳しく知りたい？**
→ README.mdを読んでください！
