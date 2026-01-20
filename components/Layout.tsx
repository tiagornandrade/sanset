
import React from 'react';
import { Page, NavItem } from '../types';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-gray-300 selection:bg-primary selection:text-background-dark">
      <nav className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange(Page.HOME)}>
            <span className="material-symbols-outlined text-primary text-3xl font-bold">auto_awesome</span>
            <h1 className="text-white text-lg font-bold tracking-tighter font-sans uppercase">Sanset</h1>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-white ${
                  currentPage === item.id ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => onPageChange(Page.CONSULTANCY)}
            className="hidden md:block bg-white/5 border border-white/10 text-white px-5 py-2 rounded text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:bg-primary hover:text-background-dark"
          >
            Fale com um Arquiteto de IA
          </button>

          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-background-dark border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <span className="text-white font-bold uppercase tracking-widest text-lg">Sanset</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ecossistemas Agênticos de Alta Performance. Conectando dados e autonomia para elevar a eficiência humana.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Tecnologia</h4>
              <ul className="space-y-2 text-gray-600 text-xs">
                <li>MCP Servers</li>
                <li>Advanced RAG</li>
                <li>A2A Orchestration</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Contato</h4>
              <p className="text-xs text-gray-600">contato@sanset.ai</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] text-gray-600 uppercase tracking-widest">
          <p>© 2024 Sanset. O futuro da operação é agêntico.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Compliance</a>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 flex justify-around py-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 ${currentPage === item.id ? 'text-primary' : 'text-gray-600'}`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[9px] uppercase font-bold tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
