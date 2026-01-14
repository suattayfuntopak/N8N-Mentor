
import React from 'react';
import { ChatMessage, MessageRole } from '../types';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const isImageMime = (mime: string) => mime.startsWith('image/');

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll h-full">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-inner">
            <i className="fas fa-robot text-4xl text-[#ff4d6d]"></i>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Merhaba! Ben n8n Mentörün.</h2>
          <p className="max-w-md mt-3 text-[15px] text-slate-500 font-medium leading-relaxed px-4">
            n8n akışını analiz etmem için ekran görüntüsü, JSON veya dosya yükleyebilirsin. Senin için en iyi otomasyonu birlikte kuralım.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl p-5 shadow-lg ${
              msg.role === MessageRole.USER
                ? 'bg-[#ff4d6d] text-white rounded-br-none shadow-pink-500/10'
                : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-slate-200/50'
            }`}
          >
            {msg.parts.map((part, idx) => (
              <div key={idx} className="space-y-3">
                {part.inlineData && (
                  isImageMime(part.inlineData.mimeType) ? (
                    <img
                      src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`}
                      alt="Attachment"
                      className="rounded-xl max-w-full h-auto border-2 border-white/10 mb-3 shadow-sm"
                    />
                  ) : (
                    <div className={`p-3 rounded-lg flex items-center gap-3 border ${msg.role === MessageRole.USER ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-100'}`}>
                       <i className={`fas ${part.inlineData.mimeType.includes('json') ? 'fa-file-code' : 'fa-file-alt'} text-xl`}></i>
                       <div className="text-[12px] font-bold font-mono">
                          {part.inlineData.mimeType.includes('json') ? 'workflow.json' : 'ekli-dosya'}
                       </div>
                    </div>
                  )
                )}
                {part.text && (
                  <div className="whitespace-pre-wrap leading-relaxed text-[15.5px] font-medium">
                    {part.text}
                  </div>
                )}
              </div>
            ))}
            <div className={`text-[10px] mt-3 font-black opacity-60 ${msg.role === MessageRole.USER ? 'text-right text-white/80' : 'text-left text-slate-400'}`}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-md flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff4d6d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#ff4d6d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#ff4d6d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
