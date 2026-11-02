import React from 'react';

interface ToolLogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ name, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg text-xs font-bold',
    md: 'w-10 h-10 rounded-xl text-sm font-bold',
    lg: 'w-12 h-12 rounded-xl text-base font-bold',
    xl: 'w-16 h-16 rounded-2xl text-xl font-bold',
  };

  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    case 'figma':
      return (
        <div className={`flex items-center justify-center bg-white border border-slate-100 shadow-xs ${sizeClasses[size]} ${className}`}>
          <svg viewBox="0 0 38 57" className="w-3/5 h-3/5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
          </svg>
        </div>
      );

    case 'photoshop':
      return (
        <div className={`flex items-center justify-center bg-[#001E36] font-bold text-[#31A8FF] rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="tracking-tighter font-mono">Ps</span>
        </div>
      );

    case 'canva':
      return (
        <div className={`flex items-center justify-center bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-serif italic text-lg leading-none">C</span>
        </div>
      );

    case 'framer':
      return (
        <div className={`flex items-center justify-center bg-black text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
          </svg>
        </div>
      );

    case 'webflow':
      return (
        <div className={`flex items-center justify-center bg-[#146EF5] text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-extrabold tracking-tighter text-base">W</span>
        </div>
      );

    case 'procreate':
      return (
        <div className={`flex items-center justify-center bg-slate-900 text-white rounded-xl overflow-hidden relative shadow-2xs ${sizeClasses[size]} ${className}`}>
          <div className="w-2.5 h-6 bg-gradient-to-t from-pink-500 via-amber-400 to-cyan-400 rotate-45 rounded-full filter blur-[0.5px]"></div>
        </div>
      );

    case 'penpot':
      return (
        <div className={`flex items-center justify-center bg-[#7B46FF] text-white rounded-xl relative shadow-2xs ${sizeClasses[size]} ${className}`}>
          <div className="w-3 h-3 bg-[#00E599] rounded-xs"></div>
        </div>
      );

    case 'uizard':
      return (
        <div className={`flex items-center justify-center bg-[#FF5757] text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <div className="w-3.5 h-4 border-2 border-white rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-xs"></div>
          </div>
        </div>
      );

    case 'midjourney':
      return (
        <div className={`flex items-center justify-center bg-black text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 18h16L12 2zm0 4.8l5.2 10.4H6.8L12 6.8z"/>
          </svg>
        </div>
      );

    case 'spline':
      return (
        <div className={`flex items-center justify-center bg-[#FF4565] text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <div className="w-3.5 h-3.5 border-2 border-white rounded-full"></div>
        </div>
      );

    case 'adobeillustrator':
    case 'illustrator':
      return (
        <div className={`flex items-center justify-center bg-[#330000] font-bold text-[#FF9A00] rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="tracking-tighter font-mono">Ai</span>
        </div>
      );

    case 'sketch':
      return (
        <div className={`flex items-center justify-center bg-amber-50 text-amber-500 rounded-xl border border-amber-200 shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-base leading-none">💎</span>
        </div>
      );

    case 'relume':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-mono font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-sm">R</span>
        </div>
      );

    case 'adobexd':
    case 'xd':
      return (
        <div className={`flex items-center justify-center bg-[#470137] font-bold text-[#FF61F6] rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="tracking-tighter font-mono">Xd</span>
        </div>
      );

    case 'blender':
      return (
        <div className={`flex items-center justify-center bg-[#EA7600] text-white rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#265787] rounded-full"></div>
          </div>
        </div>
      );

    case 'notion':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-serif font-black rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-sm">N</span>
        </div>
      );

    case 'rive':
      return (
        <div className={`flex items-center justify-center bg-black text-[#00FFA3] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-mono text-sm tracking-tighter">R</span>
        </div>
      );

    case 'protopie':
      return (
        <div className={`flex items-center justify-center bg-[#FF2D55] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">🥧</span>
        </div>
      );

    case 'miro':
      return (
        <div className={`flex items-center justify-center bg-[#FFD02F] text-slate-900 font-extrabold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-mono text-xs tracking-tighter">///</span>
        </div>
      );

    case 'figjam':
      return (
        <div className={`flex items-center justify-center bg-[#9747FF] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">FJ</span>
        </div>
      );

    case 'whimsical':
      return (
        <div className={`flex items-center justify-center bg-[#5F3DF7] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">W</span>
        </div>
      );

    case 'balsamiq':
      return (
        <div className={`flex items-center justify-center bg-[#CC0000] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">B</span>
        </div>
      );

    case 'axure':
    case 'axurerp':
      return (
        <div className={`flex items-center justify-center bg-[#0070F3] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">Ax</span>
        </div>
      );

    case 'invision':
      return (
        <div className={`flex items-center justify-center bg-[#FF3366] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">in</span>
        </div>
      );

    case 'bubble':
      return (
        <div className={`flex items-center justify-center bg-[#032338] text-[#00FFA3] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">B</span>
        </div>
      );

    case 'dora':
      return (
        <div className={`flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-mono text-xs">D</span>
        </div>
      );

    case 'carrd':
      return (
        <div className={`flex items-center justify-center bg-[#1B2A32] text-[#24B47E] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">CR</span>
        </div>
      );

    case 'wix':
    case 'wixstudio':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">WIX</span>
        </div>
      );

    case 'cinema4d':
      return (
        <div className={`flex items-center justify-center bg-[#0A192F] text-[#00A8FF] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">C4D</span>
        </div>
      );

    case 'unrealengine':
      return (
        <div className={`flex items-center justify-center bg-[#0E1118] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">U</span>
        </div>
      );

    case 'unity':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">Unity</span>
        </div>
      );

    case 'houdini':
      return (
        <div className={`flex items-center justify-center bg-[#FF4713] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">H</span>
        </div>
      );

    case 'zbrush':
      return (
        <div className={`flex items-center justify-center bg-[#2B2B2B] text-[#00D2FF] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">ZB</span>
        </div>
      );

    case 'adobefirefly':
    case 'firefly':
      return (
        <div className={`flex items-center justify-center bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs">✦</span>
        </div>
      );

    case 'runway':
      return (
        <div className={`flex items-center justify-center bg-black text-emerald-400 font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">RW</span>
        </div>
      );

    case 'leonardoai':
    case 'leonardo':
      return (
        <div className={`flex items-center justify-center bg-[#130E26] text-[#A855F7] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-mono">Leo</span>
        </div>
      );

    case 'mobbin':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-mono text-xs">M</span>
        </div>
      );

    case 'fontshare':
      return (
        <div className={`flex items-center justify-center bg-slate-900 text-white font-serif font-black rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-base">F</span>
        </div>
      );

    case 'phosphor':
    case 'phosphoricons':
      return (
        <div className={`flex items-center justify-center bg-[#10B981] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-serif text-sm">Φ</span>
        </div>
      );

    case 'lucide':
    case 'lucideicons':
      return (
        <div className={`flex items-center justify-center bg-[#F43F5E] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs">✦</span>
        </div>
      );

    case 'googlefonts':
      return (
        <div className={`flex items-center justify-center bg-white border border-slate-200 text-[#4285F4] font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="text-xs font-sans">GF</span>
        </div>
      );

    case 'unsplash':
      return (
        <div className={`flex items-center justify-center bg-black text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-mono text-xs">U</span>
        </div>
      );

    case 'coolors':
      return (
        <div className={`flex items-center justify-center bg-[#0066FF] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">C</span>
        </div>
      );

    case 'dribbble':
      return (
        <div className={`flex items-center justify-center bg-[#EA4C89] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-serif text-xs">Dr</span>
        </div>
      );

    case 'behance':
      return (
        <div className={`flex items-center justify-center bg-[#0057FF] text-white font-bold rounded-xl shadow-2xs ${sizeClasses[size]} ${className}`}>
          <span className="font-sans text-xs">Bē</span>
        </div>
      );

    default: {
      // Deterministic brand color palette for high-fidelity avatar badges
      const palettes = [
        'bg-slate-900 text-white',
        'bg-blue-600 text-white',
        'bg-indigo-600 text-white',
        'bg-purple-600 text-white',
        'bg-rose-600 text-white',
        'bg-amber-600 text-white',
        'bg-emerald-600 text-white',
        'bg-teal-600 text-white',
        'bg-cyan-600 text-white',
        'bg-violet-600 text-white',
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
      const colorClass = palettes[hash % palettes.length];
      const initials = name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return (
        <div
          className={`flex items-center justify-center rounded-xl shadow-2xs ${colorClass} ${sizeClasses[size]} ${className}`}
        >
          <span>{initials || name.charAt(0).toUpperCase()}</span>
        </div>
      );
    }
  }
};
