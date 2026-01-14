
import React, { useState, useEffect } from 'react';

interface SidebarProps {
  onViewChange: (view: 'chat' | 'links' | 'contact') => void;
  activeView: 'chat' | 'links' | 'contact';
}

const Sidebar: React.FC<SidebarProps> = ({ onViewChange, activeView }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    "Bir node üzerinde takıldın mı? Ekran görüntüsü alıp buraya yapıştır (Ctrl+V) ve hemen yardım al!",
    "n8n akışının JSON formatını buraya yükleyerek tüm mantığı analiz ettirebilirsin.",
    "Karşılaştığın hata mesajlarını dosya olarak yükle, çözüm yollarını birlikte bulalım.",
    "Yeni bir otomasyon fikrin mi var? Dosyalarını yükle, senin için bir taslak oluşturalım.",
    "Sürükle-bırak özelliğini kullanarak birden fazla ekran görüntüsünü aynı anda analiz ettirebilirsin.",
    "Node ayarlarını anlamadıysan, o pencerenin resmini çekip buraya atman yeterli!",
    "Karmaşık JSON yapılarını n8n Mentor'a sormaktan çekinme, senin için parçalara ayırabilirim.",
    "İş akışındaki performans sorunlarını gidermek için çıktı dosyalarını analiz ettirebilirsin.",
    "Otomasyonlarını optimize etmek için n8n Mentor'un adım adım yönlendirmelerini takip et.",
    "Herhangi bir dökümanı (txt, doc, tablo) yükleyerek n8n entegrasyonu hakkında bilgi alabilirsin."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 30000); 

    return () => clearInterval(interval);
  }, [tips.length]);

  const handleContactClick = () => {
    onViewChange('contact');
    window.open('https://www.suattayfuntopak.com/iletisim/', '_blank');
  };

  return (
    <div className="w-64 bg-[#0f172a] text-white h-full flex flex-col shrink-0 overflow-hidden">
      {/* Branding Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-700 gap-3">
        <div className="flex items-center justify-center shrink-0">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
            <circle cx="20" cy="50" r="12" stroke="#ff4d6d" strokeWidth="8"/>
            <circle cx="50" cy="50" r="12" stroke="#ff4d6d" strokeWidth="8"/>
            <path d="M75 25 A 12 12 0 1 1 75 25.1 Z" stroke="#ff4d6d" strokeWidth="8" fill="none"/>
            <path d="M75 75 A 12 12 0 1 1 75 75.1 Z" stroke="#ff4d6d" strokeWidth="8" fill="none"/>
            <line x1="32" y1="50" x2="38" y2="50" stroke="#ff4d6d" strokeWidth="8" strokeLinecap="round"/>
            <path d="M62 50 Q 70 50 75 40" stroke="#ff4d6d" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <path d="M62 50 Q 70 50 75 60" stroke="#ff4d6d" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#ff4d6d] leading-none">
          n8n Mentor
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll py-4 space-y-4">
        <nav className="px-4 space-y-3">
          <button 
            onClick={() => onViewChange('chat')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-lg active:scale-[0.98] ${
              activeView === 'chat' 
                ? 'bg-[#ff4d6d] text-white shadow-pink-500/20' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fas fa-route text-lg leading-none"></i>
            <span className="font-medium leading-none">Adım Adım İş Akışı</span>
          </button>

          <button 
            onClick={() => onViewChange('links')}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-lg active:scale-[0.98] ${
              activeView === 'links' 
                ? 'bg-[#ff4d6d] text-white shadow-pink-500/20' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fas fa-link text-lg leading-none"></i>
            <span className="font-medium leading-none">İlgili Linkler</span>
          </button>

          <button 
            onClick={handleContactClick}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-lg active:scale-[0.98] ${
              activeView === 'contact' 
                ? 'bg-[#ff4d6d] text-white shadow-pink-500/20' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fas fa-envelope text-lg leading-none"></i>
            <span className="font-medium leading-none">İletişim</span>
          </button>
        </nav>
      </div>

      <div className="p-4 bg-[#0f172a] border-t border-slate-700">
        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700 transition-all duration-500 ease-in-out">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-graduation-cap text-[#ff4d6d] animate-pulse"></i>
            <span className="text-xs font-bold uppercase text-slate-500">İpucu</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed min-h-[48px] animate-fadeIn">
            {tips[currentTipIndex]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
