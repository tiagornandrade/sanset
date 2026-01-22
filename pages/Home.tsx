
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero: The Startup Growth Engine */}
      <section className="relative pt-24 pb-40 px-6 glow-aura neural-grid overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full animate-float">
            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">Scale Fast, Stay Lean</span>
          </div>

          <h1 className="text-white text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.95] max-w-4xl text-phosphor">
            Inteligência Agêntica para <br/> <span className="text-primary italic">Startups Hyper-Growth.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Sanset constrói a infraestrutura de agentes que gerenciam seus leads, analisam seu MRR e otimizam seu growth. A tecnologia que permite escalar sem explodir o custo fixo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={() => onNavigate(Page.CONSULTANCY)}
              className="bg-primary text-background-dark h-14 px-8 text-xs font-extrabold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(74,222,128,0.3)]"
            >
              Auditoria de Operação
            </button>
            <button 
              onClick={() => onNavigate(Page.INFRASTRUCTURE)}
              className="bg-white/5 border border-white/10 text-white h-14 px-8 text-xs font-extrabold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Ver Stack Agêntica <span className="material-symbols-outlined text-sm">developer_board</span>
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </section>

      {/* Startup Universe Stats */}
      <section className="py-20 bg-background-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Time to Lead', value: '< 1 min', icon: 'bolt' },
              { label: 'Growth Efficiency', value: '+40%', icon: 'show_chart' },
              { label: 'Ops Overheat', value: '-60%', icon: 'layers_clear' },
              { label: 'MRR Visibility', value: 'Real-time', icon: 'visibility' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <span className="material-symbols-outlined text-primary text-3xl opacity-50">{stat.icon}</span>
                <p className="text-3xl font-bold text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The AI Stack for Startups */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight text-phosphor">
              Agentes que dominam o <span className="text-primary italic">Startup Stack.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Integramos agentes via **MCP Servers** diretamente no seu ecossistema: do CRM ao faturamento. Nossas IAs resolvem tickets, qualificam leads e geram insights de growth enquanto você foca no produto.
            </p>
            
            <div className="space-y-4">
              {[
                { t: 'Lead Management', d: 'Captura, enriquecimento e agendamento autônomo.' },
                { t: 'Revenue Intelligence', d: 'Análise de MRR e expansão preditiva conectada ao Stripe.' },
                { t: 'Customer Success RAG', d: 'Toda a base de conhecimento disponível para agentes resolutivos.' }
              ].map(item => (
                <div key={item.t} className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase font-mono tracking-wider">{item.t}</h4>
                    <p className="text-gray-500 text-xs">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="glass-card aspect-video rounded-3xl overflow-hidden flex flex-col p-8 gap-6 border-primary/20">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-red-500/50"></div>
                  <div className="size-3 rounded-full bg-yellow-500/50"></div>
                  <div className="size-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-[10px] font-mono text-gray-500">GROWTH_AGENT_LOG v4.2</span>
              </div>
              <div className="font-mono text-[11px] space-y-2 overflow-hidden">
                <p className="text-primary animate-pulse">{'>'} [AGENT] Connected to HubSpot CRM...</p>
                <p className="text-white">{'>'} 14 New Leads detected in last 5m.</p>
                <p className="text-white">{'>'} Qualifying via LinkedIn Enrichment...</p>
                <p className="text-primary">{'>'} 3 Leads identified as High-Priority (MRR Pot: {'>$5k'}).</p>
                <p className="text-white">{'>'} Sending personalized Slack briefing to Sales Team.</p>
                <p className="text-primary">{'>'} [SYSTEM] Flow resolution: 100%.</p>
              </div>
            </div>
            {/* Glow behind */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
