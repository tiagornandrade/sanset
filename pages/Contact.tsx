
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-6 technical-grid">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">Audit & Scale Plan</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none text-phosphor">
              Escale sem <br/><span className="text-primary italic">atrito.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed font-mono">
              Analisamos seu stack atual (Hubspot, Stripe, Salesforce, Slack) e mapeamos onde agentes autônomos podem acelerar seu MRR.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4 text-gray-400">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="text-sm font-mono">growth@sanset.ai</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="material-symbols-outlined text-primary">hub</span>
              <span className="text-sm font-mono">São Paulo | Digital Nomad HQ</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 md:p-14 border border-white/10 relative rounded-[2rem]">
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-700 tracking-widest">MOD: STARTUP_SCALE_V1</div>
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Founder / Growth Lead</label>
                <input className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm" placeholder="Nome" type="text" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Startup</label>
                <input className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm" placeholder="URL da Empresa" type="text" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Foco da Stack Agêntica</label>
              <select className="w-full bg-transparent border-b border-white/10 py-3 text-gray-500 focus:outline-none focus:border-primary transition-all font-mono text-sm appearance-none">
                <option>Lead Gen & Funnel Scoring</option>
                <option>MRR & Revenue Intelligence</option>
                <option>Churn & Customer Success RAG</option>
                <option>A2A Operations (Backoffice)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Current MRR / Headcount</label>
              <input className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm" placeholder="Opcional para análise de maturidade" type="text" />
            </div>

            <button className="w-full py-6 bg-primary text-background-dark font-extrabold uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(74,222,128,0.2)] flex items-center justify-center gap-4">
              Agendar Auditoria de Growth
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </button>
            
            <p className="text-[9px] text-center text-gray-600 uppercase tracking-widest leading-loose">
              Dados processados por agentes Sanset. Privacidade 100% garantida.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
