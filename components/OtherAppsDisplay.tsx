
import React from 'react';

const OtherAppsDisplay: React.FC = () => {
  const otherApps = [
    { 
      name: "Super Word Buddy", 
      desc: "Kelimelerle aranı düzelten, dil öğrenimini ve kelime haznesini yapay zeka ile geliştiren asistan.", 
      icon: "fa-language", 
      color: "bg-indigo-600",
      url: "https://super-word-buddy-897673322308.us-west1.run.app/"
    },
    { 
      name: "Zenflow Pomodoro", 
      desc: "Odaklanma sürenizi optimize eden, n8n ruhuna uygun minimalist verimlilik aracı.", 
      icon: "fa-hourglass-half", 
      color: "bg-rose-600",
      url: "https://zenflow-pomodoro-342764971908.us-west1.run.app/"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 chat-scroll bg-white h-full flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-6 shrink-0">
          <div className="w-14 h-14 bg-[#ff4d6d]/10 rounded-xl flex items-center justify-center">
            <i className="fas fa-th-large text-[#ff4d6d] text-2xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Diğer Uygulamalar</h2>
            <p className="text-slate-500 text-[15px] font-medium mt-0.5">Yapay zeka gücüyle hayatınızı kolaylaştıracak diğer araçlarımız.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 shrink-0">
          {otherApps.map((app, idx) => (
            <a 
              key={idx}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 group block"
            >
              <div className={`w-12 h-12 ${app.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <i className={`fas ${app.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-[#ff4d6d] transition-colors">{app.name}</h3>
              <p className="text-slate-600 text-[14px] leading-relaxed font-medium">{app.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[#ff4d6d] font-bold text-[13px]">
                Uygulamayı Aç <i className="fas fa-external-link-alt text-[10px]"></i>
              </div>
            </a>
          ))}
        </div>

        {/* Improved BMC Box */}
        <div className="bg-[#0f172a] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden text-center w-full max-w-4xl mx-auto shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4d6d]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <p className="text-[15px] font-medium leading-relaxed mb-8 text-slate-300 italic max-w-3xl mx-auto block">
              * Uygulamalar tamamen ücretsizdir. Ancak uygulama geri planında ücretli pek çok yapay zeka ve uygulama çalıştığı için, eğer uygulamaları beğenir ve kullanmaya karar verirseniz,<br/>
              belki aşağıda bulunan Buy me a coffee linkine tıklayarak bize yardımcı olabilirsiniz. Böylelikle hem bizi desteklemiş,<br/>
              hem de çok daha güzel uygulamalar üretilebilmesine vesile olmuş olursunuz. Şimdiden teşekkürler :)
            </p>
            
            <a 
              href="https://buymeacoffee.com/suattayfuntopak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#FFDD00] text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/10"
            >
              <i className="fas fa-mug-hot text-2xl"></i>
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherAppsDisplay;
