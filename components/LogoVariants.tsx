
import React from 'react';

export const LogoHorizon: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="0" y="60" className="font-bold fill-current text-[60px] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
      SANSET
    </text>
    <rect x="0" y="42" width="300" height="2" className="fill-current opacity-30" />
    <rect x="0" y="42" width="120" height="2" className="fill-current" />
  </svg>
);

export const LogoSubtractive: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="fill-current">
      <path d="M15 15 L45 15 L45 25 L15 25 L15 65 L45 65 L45 75 L5 75 L5 15 Z" />
      <text x="50" y="65" className="font-light fill-current text-[55px] tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
        ANSET
      </text>
    </g>
    <path d="M0 40 L300 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-50" />
  </svg>
);

export const LogoTechnical: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="10" y="60" className="fill-current text-[48px] tracking-tighter" style={{ fontFamily: 'JetBrains Mono' }}>
      [SANSET]
    </text>
    <circle cx="260" cy="45" r="4" className="fill-current" />
    <path d="M280 45 L380 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M370 35 L380 45 L370 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="currentColor" />
    <rect x="20" y="48" width="60" height="4" fill="black" />
  </svg>
);
