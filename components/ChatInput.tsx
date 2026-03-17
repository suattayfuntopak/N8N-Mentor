import React, { useState, useRef } from 'react';
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

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const normalizeFile = async (file: File): Promise<Attachment> => {
    const dataUrl = await fileToDataUrl(file);
    const mimeType =
      file.type || (file.name.endsWith('.json') ? 'application/json' : 'text/plain');

    return {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: mimeType,
      mimeType,
      base64: dataUrl,
      data: dataUrl.split(',')[1],
      isImage: mimeType.startsWith('image/'),
    } as Attachment;
  };

  const addFiles = async (files: File[]) => {
    if (!files.length) return;

    try {
      const newAttachments = await Promise.all(files.map(normalizeFile));
      setAttachments((prev) => [...prev, ...newAttachments]);
    } catch (err) {
      console.error('Dosya yükleme hatası:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await addFiles(files);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        item.type.indexOf('image') !== -1 ||
        item.type.indexOf('text') !== -1 ||
        item.type.indexOf('json') !== -1
      ) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }

    await addFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    await addFiles(files);
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
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div
      className={`p-4 bg-white border-t border-slate-100 transition-colors shadow-lg z-20 shrink-0 relative ${isDragging ? 'bg-slate-50' : ''
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#ff4d6d]/5 pointer-events-none border-2 border-dashed border-[#ff4d6d]/20 m-2 rounded-xl">
          <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
            <i className="fas fa-cloud-upload-alt text-[#ff4d6d] text-2xl animate-bounce"></i>
            <span className="font-black text-sm text-[#ff4d6d]">Bırakın</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-3">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-3 border-b border-slate-50">
            {attachments.map((file) => (
              <div key={file.id} className="relative group">
                {file.isImage ? (
                  <img
                    src={file.base64}
                    alt="Preview"
                    className="h-14 w-14 object-cover rounded-lg border border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="h-14 w-14 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-center">
                    <i
                      className={`fas ${(file.mimeType || file.type || '').includes('json')
                        ? 'fa-file-code text-blue-500'
                        : 'fa-file-alt text-slate-400'
                        } text-lg mb-0.5`}
                    ></i>
                    <span className="text-[8px] font-black truncate w-full text-slate-600">
                      {file.name}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeAttachment(file.id)}
                  className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
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
              className="w-10 h-10 bg-[#ff4d6d] text-white rounded-lg flex items-center justify-center hover:bg-[#e63958] transition-all shadow-sm active:scale-90 shrink-0"
            >
              <i className="fas fa-plus text-lg"></i>
            </button>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[11px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
              resim, json ya da dosya ekle
            </div>
          </div>

          <input
            key={Date.now()}
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              handleFileChange(e);
              if (e.target) {
                e.target.value = '';
              }
            }}
            className="hidden"
            multiple
            accept="image/*,.json,application/json,.txt,.doc,.docx,.pdf,.csv,.xls,.xlsx"
          />

          <div className="flex-1 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder="n8n, node'lar ve/ya iş akışları hakkında sorular sor... (Ekran resmi, json ya da dosya yükle ya da sürükle bırak)"
              className="w-full min-h-[56px] bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#ff4d6d] transition-all text-[14px] font-medium text-slate-700 placeholder:text-slate-400 resize-none chat-scroll"
              disabled={disabled}
              rows={2}
            />
          </div>

          <button
            type="submit"
            disabled={(!text.trim() && attachments.length === 0) || disabled}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-sm shrink-0 ${(!text.trim() && attachments.length === 0) || disabled
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
              : 'bg-[#ff4d6d] text-white hover:bg-[#e63958] active:scale-90'
              }`}
          >
            <i className="fas fa-paper-plane text-[15px]"></i>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[9px] text-slate-400 font-black tracking-widest uppercase">
            DESIGNED BY SUAT TAYFUN TOPAK
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[12px] italic text-slate-500 hidden sm:inline">
              Beğendiysen belki bana bir kahve ısmarlarsın ;)
            </span>
            <a
              href="https://buymeacoffee.com/suattayfuntopak"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFDD00] text-black px-3 py-1.5 rounded-full font-black text-[10px] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="BMC"
                className="w-3.5"
              />
              Buy me a coffee
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;