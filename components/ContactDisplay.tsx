
import React from 'react';

const ContactDisplay: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto chat-scroll bg-[#1c1b22] text-white h-full flex flex-col justify-center">
      <div className="max-w-xl mx-auto py-8 px-6 flex flex-col items-center text-center w-full">
        {/* Profile Image - Using the specific vesikalik image as requested */}
        <div className="mb-8">
          <img 
            src="https://www.suattayfuntopak.com/wp-content/uploads/2023/05/suat-tayfun-topak-vesikalik.jpg" 
            alt="Suat Tayfun TOPAK" 
            className="w-36 h-36 rounded-full object-cover border-4 border-[#2c2b33] shadow-2xl"
          />
        </div>

        {/* Name */}
        <h2 className="text-[42px] font-serif mb-3 leading-tight tracking-tight text-[#f4f1ea]">
          Suat Tayfun TOPAK
        </h2>

        {/* Subtitle */}
        <div className="mb-6 space-y-1">
          <p className="text-base font-medium text-[#f4f1ea] flex items-center justify-center gap-2">
            <span role="img" aria-label="briefcase">💼</span> Sistem Koçu | Girişimci | Ai&Web
          </p>
          <p className="text-base font-medium text-[#f4f1ea]">
            Uygulama&Otomasyon ⚡️🎯 İnsan ilişkileri, gelir
          </p>
          <p className="text-base font-medium text-[#f4f1ea]">
            ve zaman yönetimi konularında ‘sistemsel’
          </p>
          <p className="text-base font-medium text-[#f4f1ea]">
            çözümler sunuyorum <span role="img" aria-label="finger">👇🏼</span>
          </p>
        </div>

        {/* Follow Text */}
        <p className="text-lg font-medium text-[#f4f1ea] leading-snug mb-8 max-w-sm">
          Beni sosyal medyadan takip edebilir, aşağıdaki irtibat kanallarından bana ulaşabilirsin!
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a href="https://www.facebook.com/suattayfuntopak" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:opacity-80 transition-opacity">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/suattayfuntopak/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:opacity-80 transition-opacity">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@suattayfuntopak" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:opacity-80 transition-opacity">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@suattayfuntopak" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:opacity-80 transition-opacity">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://twitter.com/suattayfuntopak" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:opacity-80 transition-opacity">
            <i className="fab fa-x-twitter"></i>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 max-w-sm">
          <a 
            href="https://t.me/suattayfuntopakk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 px-6 bg-[#dbd4cd] text-[#2c2b33] rounded-[30px] font-bold text-lg hover:bg-[#ccc4bc] transition-all shadow-lg active:scale-95"
          >
            Telegram Topluluğuma Katıl
          </a>
          <a 
            href="https://wa.me/905346293885?text=Merhaba,%20size%20nasıl%20yardımcı%20olabilirim?" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 px-6 bg-[#dbd4cd] text-[#2c2b33] rounded-[30px] font-bold text-lg hover:bg-[#ccc4bc] transition-all shadow-lg active:scale-95"
          >
            WhatsApp'tan Bana Ulaş
          </a>
          <a 
            href="https://www.suattayfuntopak.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 px-6 bg-[#dbd4cd] text-[#2c2b33] rounded-[30px] font-bold text-lg hover:bg-[#ccc4bc] transition-all shadow-lg active:scale-95"
          >
            www.suattayfuntopak.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDisplay;
