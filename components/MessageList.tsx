
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
    <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
          <i className="fas fa-robot text-6xl mb-4 text-slate-300"></i>
          <h2 className="text-xl font-semibold text-slate-600">Merhaba! Ben n8n Mentörün.</h2>
          <p className="max-w-sm mt-2 text-slate-500">
            n8n akışını analiz etmem için ekran görüntüsü, JSON veya dosya yükleyebilirsin.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === MessageRole.USER
                ? 'bg-[#ff4d6d] text-white rounded-br-none'
                : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
            }`}
          >
            {msg.parts.map((part, idx) => (
              <div key={idx} className="space-y-3">
                {part.inlineData && (
                  isImageMime(part.inlineData.mimeType) ? (
                    <img
                      src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`}
                      alt="Attachment"
                      className="rounded-lg max-w-full h-auto border border-white/20 mb-2 shadow-sm"
                    />
                  ) : (
                    <div className={`p-3 rounded-lg flex items-center gap-3 border ${msg.role === MessageRole.USER ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-100'}`}>
                       <i className={`fas ${part.inlineData.mimeType.includes('json') ? 'fa-file-code' : 'fa-file-alt'} text-xl`}></i>
                       <div className="text-xs font-mono">
                          {part.inlineData.mimeType.includes('json') ? 'workflow.json' : 'attached-file'}
                       </div>
                    </div>
                  )
                )}
                {part.text && (
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">{part.text}</p>
                )}
              </div>
            ))}
            <div className={`text-[10px] mt-2 opacity-60 ${msg.role === MessageRole.USER ? 'text-right' : 'text-left'}`}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
