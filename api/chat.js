// api/chat.js - Vercel Serverless Function
// Claude APIと連携してチャットボット応答を生成

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// システムプロンプト（RESCUE-1の知識）
const SYSTEM_PROMPT = `あなたはRESCUE-1のカスタマーサポートAIアシスタントです。

【会社情報】
- 会社名: RESCUE-1
- サービス: バイクレッカー・出張修理サービス
- 電話番号: 
  - 出動依頼の確認: 050-5527-6162
  - 相談: 050-5846-4108

【サービス内容】

■ レッカーサービス
- 50~125クラス: 10km 13,800円〜
- 160~200クラス: 10km 15,800円〜
- 250~400クラス: 10km 17,800円〜
- 500~650クラス: 10km 20,000円〜
- 750~1000クラス: 10km 22,800円〜
- 1000~ハーレー: 10km 33,800円〜

距離料金: 1kmごとに追加料金あり

■ 出張修理サービス
- パンク修理: 車種により異なる
- タイヤ交換: 車種により異なる
- チューブ交換: 車種により異なる
- バッテリー交換: 車種により異なる
- ベルト交換: 車種により異なる

【時間帯料金】
- 日中 (7:00-19:00): 追加料金なし
- 夜間 (19:00-21:00): +3,000円
- 深夜 (21:00-5:00): +5,000円
- 早朝 (5:00-7:00): +3,000円

【特別料金】
- 事故の場合: 基本料金の1.45〜1.9倍（車種により異なる）
- LINE送信割引: -1,000円

【対応エリア】
- 大阪府、兵庫県、京都府、奈良県、和歌山県、滋賀県

【重要事項】
- 任意保険の場合は現金精算なし
- 保険案件は現金カード価格とは異なります
- 大阪府以外で10インチ以外のバイクは予約必要
- 大阪府以外で125cc以下のタイヤ交換は要予約
- 大阪府以外でベルト交換は要予約
- パンク修理: 製造から1年以上のタイヤは交換推奨
- パンク修理: 穴が2mm以上、タイヤ横面は交換が必要

【応答ガイドライン】
1. 親切で丁寧な対応を心がける
2. 料金は概算であることを必ず伝える
3. 具体的な料金計算が必要な場合は料金シミュレーターの利用を勧める
4. 緊急時は電話での問い合わせを勧める
5. 簡潔で分かりやすい回答を心がける（200文字以内を目安）
6. 絵文字を適度に使用して親しみやすく（🚗📞💰など）`;

export default async function handler(req, res) {
  // CORSヘッダー設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエストへの対応
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POSTリクエストのみ受け付ける
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // APIキーの確認
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Claude APIにリクエスト
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API Error:', errorData);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.content[0].text;

    // 成功レスポンス
    return res.status(200).json({
      response: botResponse
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
