
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageRole, Attachment } from "../types";

const SYSTEM_INSTRUCTION = `Sen uzman bir n8n mentörüsün. Kullanıcıların n8n akışlarını (workflow) geliştirmelerine, hataları ayıklamalarına ve otomasyon süreçlerini öğrenmelerine yardımcı oluyorsun.
Kullanıcı bir ekran görüntüsü, JSON iş akışı veya ilgili bir dosya paylaştığında:
1. Paylaşılan materyali (görüntü, JSON veya metin) analiz et.
2. Mevcut durumu açıkla ve n8n perspektifinden değerlendir.
3. Bir sonraki adımda ne yapması gerektiğini veya mevcut hatanın nasıl çözüleceğini teknik detaylarıyla belirt.
4. Yanıtlarını Türkçe ve profesyonel bir üslupla ver.
Eğer dosya veya görüntü yoksa, sadece n8n ile ilgili soruları yanıtla. İlgisiz konularda nazikçe konuyu n8n'e geri getir.`;

export const getGeminiResponse = async (
  messages: ChatMessage[],
  currentText: string,
  attachments: Attachment[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const history = messages.map(msg => ({
    role: msg.role === MessageRole.USER ? 'user' : 'model',
    parts: msg.parts.map(p => {
      if (p.text) return { text: p.text };
      if (p.inlineData) return { inlineData: p.inlineData };
      return { text: '' };
    })
  }));

  const parts: any[] = [];
  
  // Add all attachments
  for (const attachment of attachments) {
    parts.push({
      inlineData: {
        mimeType: attachment.type,
        data: attachment.base64.split(',')[1]
      }
    });
  }

  // Add the text prompt
  parts.push({ 
    text: currentText || (attachments.length > 0 ? "Bu ekleri analiz et ve bana n8n akışında nasıl ilerleyeceğimi söyle." : "") 
  });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: parts.filter(p => p.text || p.inlineData) }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Üzgünüm, bir yanıt oluşturamadım.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "API anahtarı veya bağlantı hatası oluştu. Lütfen tekrar deneyin.";
  }
};
