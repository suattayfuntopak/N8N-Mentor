
import React, { useState, useRef, useEffect } from 'react';
import { Attachment } from '../types';

interface ChatInputProps {
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const isImage = file.type.startsWith('image/');
      const newAttachment: Attachment = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: file.type || (file.name.endsWith('.json') ? 'application/json' : 'text/plain'),
        base64: reader.result as string,
        isImage
      };
      setAttachments(prev => [...prev, newAttachment]);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(processFile);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1 || items[i].type.indexOf('text') !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(processFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((text.trim() || attachments.length > 0) && !disabled) {
      onSendMessage(text, attachments);
      setText('');
      setAttachments([]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div 
      className={`p-4 bg-white border-t border-slate-100 transition-colors ${isDragging ? 'bg-slate-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#ff4d6d]/5 pointer-events-none border-2 border-dashed border-[#ff4d6d]/20 m-2 rounded-xl">
          <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
            <i className="fas fa-cloud-upload-alt text-[#ff4d6d] text-2xl animate-bounce"></i>
            <span className="font-bold text-[#ff4d6d]">Dosyaları Buraya Bırak</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-3">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-2">
            {attachments.map((file) => (
              <div key={file.id} className="relative group">
                {file.isImage ? (
                  <img src={file.base64} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-slate-200 shadow-sm" />
                ) : (
                  <div className="h-20 w-20 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                    <i className={`fas ${file.type.includes('json') ? 'fa-file-code text-blue-500' : 'fa-file-alt text-slate-400'} text-xl mb-1`}></i>
                    <span className="text-[8px] font-medium truncate w-full text-slate-600">{file.name}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeAttachment(file.id)}
                  className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="relative group shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 bg-[#ff4d6d] text-white rounded-xl flex items-center justify-center hover:bg-[#e63958] transition-all shadow-lg shadow-pink-500/10 active:scale-95"
            >
              <i className="fas fa-plus text-xl"></i>
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
              resim, json ya da dosya ekle
            </div>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            multiple 
            accept="image/*,.json,application/json,.txt,.doc,.docx,.pdf,.csv,.xls,.xlsx" 
          />

          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPaste={handlePaste}
              placeholder="n8n, node'lar ve/ya iş akışları hakkında sorular sor... (Ekran resmi, json ya da dosya yükle ya da sürükle bırak)"
              className="w-full h-12 bg-white border border-slate-200 rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/10 focus:border-[#ff4d6d] transition-all text-slate-700 placeholder:text-slate-400 shadow-inner"
              disabled={disabled}
            />
          </div>

          <button
            type="submit"
            disabled={(!text.trim() && attachments.length === 0) || disabled}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              (!text.trim() && attachments.length === 0) || disabled
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#ff4d6d] text-white hover:bg-[#e63958] active:scale-95 shadow-pink-500/20'
            }`}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-12 pt-3 pb-1">
          <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
              DESIGNED BY SUAT TAYFUN TOPAK
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <span>Beğendiysen belki bana bir kahve ısmarlarsın ;)</span>
            <a 
              href="https://buymeacoffee.com/suattayfuntopak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFDD00] text-black px-4 py-1.5 rounded-full font-bold text-[11px] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm border border-black/5"
            >
              <i className="fas fa-coffee"></i>
              Buy me a coffee
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
