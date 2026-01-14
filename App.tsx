
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import LinksDisplay from './components/LinksDisplay';
import { ChatMessage, MessageRole, MessagePart, Attachment } from './types';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'links' | 'contact'>('chat');

  const handleSendMessage = async (text: string, attachments: Attachment[]) => {
    const userParts: MessagePart[] = [];
    
    // Add all attachments to message parts for UI display
    attachments.forEach(att => {
      userParts.push({
        inlineData: {
          mimeType: att.type,
          data: att.base64.split(',')[1]
        }
      });
    });
    
    if (text.trim()) {
      userParts.push({ text: text.trim() });
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      parts: userParts,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const responseText = await getGeminiResponse(messages, text, attachments);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        parts: [{ text: responseText }],
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Sidebar onViewChange={setActiveView} activeView={activeView} />
      
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 shadow-sm">
          <h2 className="text-md font-bold text-[#1e293b]">
            {activeView === 'chat' 
              ? 'Ekran Görüntüsü, Json ya da Dosya Yükleyip Sorular Sorarak Çok Başarılı İş Akışları Yapabilirsin!' 
              : activeView === 'links' 
                ? 'Faydalı Kaynaklar ve Hızlı Erişim Bağlantıları'
                : 'İletişim Sayfasına Yönlendirildiniz'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Gemini Bağlandı
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#f8fafc]">
          {activeView === 'chat' || activeView === 'contact' ? (
            <>
              <MessageList messages={messages} isTyping={isTyping} />
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </>
          ) : (
            <LinksDisplay />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
