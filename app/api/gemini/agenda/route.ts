import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userTopic = body.topic?.trim() || '';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'GEMINI_API_KEY eksik',
          message: 'Canlı yapay zeka güncellemesi için API anahtarı gereklidir.',
        },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Rolün: Türkiye'nin en deneyimli haber editörü ve spikeri.
Görevin: "59 Saniyede Ülke Gündemi" için tam 5 farklı kategoride (siyaset, ekonomi, teknoloji, spor, kultur) son derece vurucu, dinamik, anlaşılır ve tam 59 saniyede tüketilebilecek bir haber bülteni hazırlamak.
${userTopic ? `Özel Odak / Konu: "${userTopic}". Haberleri bu konu ve genel Türkiye/dünya gündemi etrafında şekillendir.` : 'Güncel Türkiye ve dünya gündemini en çarpıcı başlıklarla özetle.'}

Her haber için şu kurallara kesinlikle uy:
1. Türkçe dilbilgisi mükemmel, doğal, tarafsız ve akıcı olmalı.
2. "bullets": Tam olarak 3 adet kısa, vurucu ve net madde (her madde 1-2 cümle, hızlı okunabilir).
3. "audioScript": Spikerin 10-12 saniyede okuyabileceği doğal Türkçe seslendirme metni.
4. "fullSummary": 3-4 cümlelik derinlemesine arka plan ve analiz metni.
5. "keyFigures": 3 adet somut veri (Örn: "Enflasyon Tahmini", "%28" veya "Yatırım", "10 Milyar $").
6. "expertQuote": 1 uzman görüşü (text ve author).

Çıktıyı SADECE geçerli bir JSON dizisi formatında döndür (markdown backtickleri olmadan veya \`\`\`json blokları içinde):
[
  {
    "id": "siyaset-ai",
    "category": "siyaset",
    "categoryLabel": "Siyaset & Diplomasi",
    "categoryColor": "rose",
    "headline": "...",
    "kicker": "...",
    "location": "ANKARA",
    "timestamp": "Az önce",
    "image": "/images/news_siyaset.jpg",
    "readTimeSec": 12,
    "bullets": ["madde 1", "madde 2", "madde 3"],
    "fullSummary": "...",
    "keyFigures": [{"label": "...", "value": "..."}],
    "impactRating": "Yüksek Etki",
    "expertQuote": {"text": "...", "author": "..."},
    "audioScript": "..."
  },
  ...
]
Kategoriler tam olarak sırasıyla: siyaset, ekonomi, teknoloji, spor, kultur olmalıdır. Toplam 5 haber.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '[]';
    // Clean potential markdown wrap
    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      items: parsed,
    });
  } catch (error: any) {
    console.error('Gemini agenda error:', error);
    return NextResponse.json(
      {
        error: 'Üretim sırasında bir hata oluştu',
        message: error?.message || 'Yapay zeka bülteni oluşturulamadı.',
      },
      { status: 500 }
    );
  }
}
