# 🚀 RESCUE-1 チャットボット - デプロイ手順

## 📦 含まれるファイル

```
rescue1-chatbot/
├── chatbot.html          # チャットボット統合ページ
├── simulator.html        # 料金シミュレーター
├── api/
│   └── chat.js          # Claude API連携
├── vercel.json          # Vercel設定
├── package.json         # Node.js設定
├── .gitignore           # Git除外設定
├── .env.example         # 環境変数テンプレート
├── README.md            # 詳細ドキュメント
└── QUICKSTART.md        # クイックガイド
```

## ⚡ 3ステップでデプロイ

### ステップ1: GitHubにアップロード

1. https://github.com/rescue1cobe-blip/rescue1-chatbot にアクセス
2. 「Add file」→「Upload files」をクリック
3. ZIPファイルを解凍して、**全ファイル**をドラッグ&ドロップ
   - ✅ chatbot.html
   - ✅ simulator.html
   - ✅ vercel.json
   - ✅ package.json
   - ✅ .gitignore
   - ✅ README.md
   - ✅ QUICKSTART.md
   - ✅ .env.example
   - ✅ api フォルダ（chat.js含む）
4. 「Commit changes」をクリック

### ステップ2: Vercelで環境変数を設定

1. https://vercel.com/new にアクセス
2. 「rescue1-chatbot」リポジトリを選択
3. 「Import」をクリック
4. 「Environment Variables」セクションで設定:
   ```
   Name:  ANTHROPIC_API_KEY
   Value: sk-ant-api03-Y2J...kwAA
   ```
5. 「Deploy」をクリック

### ステップ3: 完成！

デプロイ完了後、URLが表示されます:
```
https://rescue1-chatbot-xxxx.vercel.app
```

## 🎯 動作確認

1. デプロイされたURLにアクセス
2. 右下の💬アイコンをクリック
3. 「レッカーサービスの料金は？」と入力
4. Claude AIが応答すれば成功！

## 📊 料金目安

- 1日100人 × 平均3問 = **月額 ¥5,000〜10,000**
- Vercelは無料
- Claude APIのみ従量課金

## 🔧 トラブルシューティング

### チャットボットが応答しない
→ Vercelの環境変数を確認
```
Settings → Environment Variables → ANTHROPIC_API_KEY
```

### "Server configuration error"が出る
→ APIキーが設定されていません
1. Vercel Dashboard → Settings
2. Environment Variables → Add
3. Name: ANTHROPIC_API_KEY
4. Value: APIキーを入力
5. Deploy（再デプロイ）

### 404エラーが出る
→ ファイル構造を確認
```
リポジトリに api/chat.js が存在するか確認
```

## 📞 サポート

詳しくは README.md をご覧ください。

---

**RESCUE-1** | 2025-10-31
