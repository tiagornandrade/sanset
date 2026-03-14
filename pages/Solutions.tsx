
import React from 'react';
import { Page } from '../types';

interface SolutionsProps {
  onNavigate: (page: Page) => void;
}

const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  const frameworks = [
    {
      title: 'Fase 1: Auditoria & Diagnóstico',
      tag: 'DISCOVERY',
      desc: 'Análise profunda do seu stack atual, processos e métricas. Identificamos oportunidades de automação agêntica e mapeamos integrações necessárias.',
      stack: ['Análise de Stack', 'Mapeamento de Processos', 'Identificação de Oportunidades']
    },
    {
      title: 'Fase 2: Design & Arquitetura',
      tag: 'STRATEGY',
      desc: 'Desenvolvimento de arquitetura customizada de agentes autônomos. Definimos fluxos, integrações e métricas de sucesso específicas para seu negócio.',
      stack: ['Arquitetura de Agentes', 'Design de Fluxos', 'Plano de Integração']
    },
    {
      title: 'Fase 3: Implementação & Suporte',
      tag: 'EXECUTION',
      desc: 'Desenvolvimento e integração dos agentes no seu ecossistema. Acompanhamento contínuo com ajustes e otimizações baseadas em resultados reais.',
      stack: ['Desenvolvimento Customizado', 'Integração Gradual', 'Suporte Contínuo']
    }
  ];

  return (
    <div className="flex flex-col pb-32">
      <header className="py-24 px-8 text-center bg-white/[0.01] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-10"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none text-phosphor">
            Nossa <span className="text-primary italic">Metodologia.</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.5em]">Consultoria Estruturada em Inteligência Agêntica</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {frameworks.map((f) => (
          <div key={f.title} className="flex flex-col gap-10 p-12 glass-card group">
            <div className="space-y-5">
              <span className="text-xs font-mono text-primary font-bold tracking-widest">{f.tag}</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{f.desc}</p>
            </div>
            <div className="mt-auto space-y-4">
               <p className="text-xs uppercase tracking-widest text-gray-700 font-bold border-b border-white/5 pb-2">Entregáveis</p>
               <ul className="space-y-2">
                {f.stack.map(s => (
                  <li key={s} className="text-sm font-mono text-gray-400 flex items-center gap-2">
                    <span className="size-1 bg-primary rounded-full"></span>
                    {s}
                  </li>
                ))}
               </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-40 px-8">
        <div className="p-16 border border-white/5 glass-card rounded-[2rem] flex flex-col gap-10">
          <div className="space-y-6 text-left">
            <h3 className="text-3xl font-bold text-white tracking-tight">Soluções Customizadas para Seu Negócio.</h3>
            <p className="text-gray-400 leading-relaxed">
              Cada startup é única. Nossa consultoria adapta a tecnologia de agentes autônomos às suas necessidades específicas, garantindo que a solução se integre perfeitamente ao seu modelo de negócio e cultura organizacional.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">AUDITORIA PERSONALIZADA</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">ARQUITETURA CUSTOMIZADA</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">ACOMPANHAMENTO CONTÍNUO</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-mono">
            Quer falar conosco? Use <strong className="text-gray-400">Fale conosco</strong> no menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
