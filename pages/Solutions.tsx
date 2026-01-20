
import React from 'react';
import { Page } from '../types';

interface SolutionsProps {
  onNavigate: (page: Page) => void;
}

const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  const frameworks = [
    {
      title: 'MCP Connectors',
      tag: 'DATA INFRA',
      desc: 'Infraestrutura de servidores Model Context Protocol para expor seus silos de dados (Stripe, HubSpot, Zendesk) de forma segura para os agentes.',
      stack: ['Stripe Connector', 'HubSpot MCP', 'SQL/NoSQL Bridge']
    },
    {
      title: 'Growth Orchestrators',
      tag: 'AGENTIC GROWTH',
      desc: 'Agentes especializados em análise de funil e conversão. Eles identificam gargalos no MRR e executam ações de recuperação de leads frios.',
      stack: ['Lead Scoring Engine', 'Churn Prediction', 'Expansion Logic']
    },
    {
      title: 'A2A Coordination',
      tag: 'MULTI-AGENT FLOWS',
      desc: 'Sincronização entre departamentos. O agente de suporte notifica o agente de vendas sobre uma possível expansão detectada no ticket.',
      stack: ['Inter-Agent Messaging', 'Context Sharing', 'Task Handoff']
    }
  ];

  return (
    <div className="flex flex-col pb-32">
      <header className="py-24 px-8 text-center bg-white/[0.01] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-10"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none text-phosphor">
            A Stack do <span className="text-primary italic">Amanhã.</span>
          </h2>
          <p className="text-gray-500 font-mono text-[11px] uppercase tracking-[0.5em]">The Operating System for AI-First Startups</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {frameworks.map((f) => (
          <div key={f.title} className="flex flex-col gap-10 p-12 glass-card group">
            <div className="space-y-5">
              <span className="text-[10px] font-mono text-primary font-bold tracking-widest">{f.tag}</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
            <div className="mt-auto space-y-4">
               <p className="text-[9px] uppercase tracking-widest text-gray-700 font-bold border-b border-white/5 pb-2">Integrações Nativas</p>
               <ul className="space-y-2">
                {f.stack.map(s => (
                  <li key={s} className="text-[11px] font-mono text-gray-400 flex items-center gap-2">
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
        <div className="p-16 border border-white/5 glass-card rounded-[2rem] flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6 text-left">
            <h3 className="text-3xl font-bold text-white tracking-tight">O Fim da Operação Manual de Funil.</h3>
            <p className="text-gray-400 leading-relaxed">
              Mudar de um modelo baseado em dashboards estáticos para uma operação agêntica significa que seu time só intervém quando a IA já resolveu 90% do problema.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-primary">MCP SUPPORT</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-primary">RAG RETENTION</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-primary">A2A SALES</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate(Page.CONSULTANCY)}
            className="bg-primary text-background-dark px-12 h-16 text-xs font-extrabold uppercase tracking-widest hover:scale-105 transition-all"
          >
            Escalar Minha Startup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
