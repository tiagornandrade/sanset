
import React, { useState, useEffect } from 'react';
import { Page, NavItem } from '../types';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (page: Page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-gray-300 selection:bg-primary selection:text-background-dark">
      <nav className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange(Page.HOME)} aria-label="Ir para página inicial">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">auto_awesome</span>
            <h1 className="text-white text-lg font-bold tracking-tighter font-sans uppercase">Sanset</h1>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-white ${
                  currentPage === item.id ? 'text-primary' : 'text-gray-500'
                }`}
                aria-label={`Navegar para ${item.label}`}
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => onPageChange(Page.CONSULTANCY)}
            className="hidden md:block bg-white/5 border border-white/10 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-[0.15em] transition-all hover:bg-primary hover:text-white"
            aria-label="Agendar consulta"
          >
            Agendar Consulta
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-2"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-0 top-16 bg-background-dark/95 backdrop-blur-xl z-40 overflow-y-auto"
            aria-label="Menu de navegação mobile"
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    currentPage === item.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-label={`Navegar para ${item.label}`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => handleMobileNavClick(Page.CONSULTANCY)}
                className="mt-4 bg-primary text-white px-6 py-4 rounded-lg text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2"
                aria-label="Agendar consulta"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                Agendar Consulta
              </button>
            </div>
          </div>
        )}
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
              Consultoria especializada em Inteligência Agêntica para startups. Transformamos sua operação através de agentes autônomos customizados.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Tecnologia</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>MCP Servers</li>
                <li>Advanced RAG</li>
                <li>A2A Orchestration</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Contato</h4>
              <a href="mailto:contato@sanset.ai" className="text-sm text-gray-600 hover:text-primary transition-colors">
                contato@sanset.ai
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-gray-600 uppercase tracking-widest">
          <p>© 2024 Sanset. O futuro da operação é agêntico.</p>
          <div className="flex gap-4">
            <a href="/privacidade" className="hover:text-primary transition-colors" aria-label="Política de Privacidade">
              Privacidade
            </a>
            <a href="/compliance" className="hover:text-primary transition-colors" aria-label="Compliance e Segurança">
              Compliance
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 flex justify-around py-4 safe-area-bottom">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentPage === item.id ? 'text-primary' : 'text-gray-600'
            }`}
            aria-label={`Navegar para ${item.label}`}
            aria-current={currentPage === item.id ? 'page' : undefined}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-xs uppercase font-bold tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
