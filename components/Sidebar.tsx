
import React, { useState, useEffect } from 'react';
import { AppView } from '../types';

interface SidebarProps {
  onViewChange: (view: AppView) => void;
  activeView: AppView;
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

  const navItems: { view: AppView; label: string; icon: string }[] = [
    { view: 'chat', label: 'Adım Adım İş Akışı', icon: 'fa-route' },
    { view: 'links', label: 'İlgili Linkler', icon: 'fa-link' },
    { view: 'other-apps', label: 'Diğer Uygulamalar', icon: 'fa-th-large' },
    { view: 'contact', label: 'İletişim', icon: 'fa-envelope' },
  ];

  const handleNavClick = (view: AppView) => {
    if (view === 'contact') {
      window.open('https://www.suattayfuntopak.com/iletisim/', '_blank');
    } else {
      onViewChange(view);
    }
  };

  return (
    <div className="w-64 bg-[#0f172a] text-white h-full flex flex-col shrink-0 overflow-hidden border-r border-slate-800">
      {/* Branding Header */}
      <div className="h-14 flex items-center px-5 border-b border-slate-700 gap-3">
        <div className="flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
            <circle cx="20" cy="50" r="12" stroke="#ff4d6d" strokeWidth="12"/>
            <circle cx="50" cy="50" r="12" stroke="#ff4d6d" strokeWidth="12"/>
            <path d="M75 25 A 12 12 0 1 1 75 25.1 Z" stroke="#ff4d6d" strokeWidth="12" fill="none"/>
            <path d="M75 75 A 12 12 0 1 1 75 75.1 Z" stroke="#ff4d6d" strokeWidth="12" fill="none"/>
            <line x1="32" y1="50" x2="38" y2="50" stroke="#ff4d6d" strokeWidth="12" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-lg font-black tracking-tight text-[#ff4d6d] leading-none">
          n8n Mentor
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll py-4 space-y-2">
        <nav className="px-3 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 shadow-md active:scale-[0.98] border whitespace-nowrap overflow-hidden ${
                activeView === item.view 
                  ? 'bg-[#ff4d6d] text-white border-[#ff4d6d] shadow-pink-500/20 font-bold' 
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-800/60 hover:text-white border-slate-700/40 font-semibold'
              }`}
            >
              <i className={`fas ${item.icon} text-[15px] leading-none w-4 text-center shrink-0`}></i>
              <span className="text-[13.5px] leading-none truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 bg-[#0f172a] border-t border-slate-700">
        <div className="bg-[#1e293b] p-4 rounded-lg border border-slate-700 transition-all shadow-inner">
          <div className="flex items-center gap-2 mb-1.5">
            <i className="fas fa-graduation-cap text-[#ff4d6d] text-[12px]"></i>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">İpucu</span>
          </div>
          <p className="text-[12px] text-slate-300 leading-snug min-h-[40px] animate-fadeIn font-medium">
            {tips[currentTipIndex]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
