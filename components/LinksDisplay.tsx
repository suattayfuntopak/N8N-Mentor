
import React from 'react';

const LinksDisplay: React.FC = () => {
  const externalLinks = [
    { name: "n8n Resmi Sayfası", url: "https://n8n.io", icon: "fa-project-diagram" },
    { name: "Hostinger", url: "https://www.hostinger.com", icon: "fa-server" },
    { name: "Supabase", url: "https://supabase.com", icon: "fa-database" },
    { name: "GitHub", url: "https://github.com", icon: "fa-github", brand: true },
    { name: "Google AI Studio", url: "https://aistudio.google.com", icon: "fa-microchip" },
    { name: "Google Gemini", url: "https://gemini.google.com", icon: "fa-brain" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "fa-youtube", brand: true },
    { name: "Gmail", url: "https://mail.google.com", icon: "fa-envelope" },
    { name: "Google Drive", url: "https://drive.google.com", icon: "fa-hdd" },
    { name: "www.suattayfuntopak.com", url: "https://www.suattayfuntopak.com", icon: "fa-user-tie" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 chat-scroll bg-white h-full flex flex-col items-center">
      <div className="max-w-4xl w-full flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-6 shrink-0">
          <div className="w-12 h-12 bg-[#ff4d6d]/10 rounded-xl flex items-center justify-center">
            <i className="fas fa-link text-[#ff4d6d] text-2xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">İlgili Linkler</h2>
            <p className="text-slate-500 text-[15px] font-medium mt-0.5">Hızlı erişim için seçilmiş kaynaklar ve araçlar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
          {externalLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md hover:shadow-slate-200/50 border border-slate-100 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-[#ff4d6d]/5 group-hover:border-[#ff4d6d]/20 transition-colors">
                  <i className={`${link.brand ? 'fab' : 'fas'} ${link.icon} text-slate-400 group-hover:text-[#ff4d6d] text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-700 group-hover:text-[#ff4d6d] transition-colors">{link.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono truncate max-w-[160px] mt-0.5">{link.url.replace('https://', '')}</p>
                </div>
              </div>
              <i className="fas fa-arrow-right text-slate-300 group-hover:text-[#ff4d6d] group-hover:translate-x-1 transition-all text-sm"></i>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center pb-6 shrink-0">
           <p className="text-[12px] text-slate-400 italic font-medium">
             * Listede adı geçen isimlerle herhangi bir reklam anlaşmamız yoktur, paylaşımlar tavsiye niteliğindedir.
           </p>
        </div>
      </div>
    </div>
  );
};

export default LinksDisplay;
