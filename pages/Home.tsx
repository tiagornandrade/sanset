
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const SERVICES_PREVIEW = [
  { icon: 'bar_chart', label: 'Business Intelligence' },
  { icon: 'hub', label: 'Modern Data Stack' },
  { icon: 'settings_ethernet', label: 'Engenharia de Dados' },
  { icon: 'database', label: 'Data Lake & Lakehouse' },
  { icon: 'policy', label: 'Governança de Dados' },
  { icon: 'account_tree', label: 'Arquitetura de Dados' },
  { icon: 'groups', label: 'Times de Dados' },
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-40 px-6 glow-aura neural-grid overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full animate-float">
            <span className="material-symbols-outlined text-primary text-sm">database</span>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">Consultoria Especializada em Dados</span>
          </div>

          <h1 className="text-white text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.95] max-w-4xl text-phosphor">
            Construímos <br/> <span className="text-primary italic">fundações de dados</span> <br/> que escalam.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Da estratégia à execução — BI, Modern Data Stack, Engenharia de Dados, Governança, Arquitetura e estruturação de times. Transformamos dados em ativos estratégicos para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => onNavigate(Page.SERVICES)}
              className="bg-primary text-white h-14 px-8 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
              aria-label="Ver nossos serviços"
            >
              Nossos Serviços <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate(Page.REPORTS)}
              className="bg-white/5 border border-white/10 text-white h-14 px-8 text-xs font-extrabold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
              aria-label="Ver projetos realizados"
            >
              Ver Projetos <span className="material-symbols-outlined text-sm" aria-hidden="true">folder</span>
            </button>
          </div>

          <p className="text-gray-500 text-sm font-mono">
            Profissional em transição?{' '}
            <button
              type="button"
              onClick={() => onNavigate(Page.MENTORIA)}
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark rounded"
              aria-label="Conhecer mentoria em dados"
            >
              Conheça nossa mentoria em dados
            </button>
          </p>
        </div>

        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Projetos de Dados', value: '60+', icon: 'database' },
              { label: 'Redução de Lead Time', value: '-65%', icon: 'speed' },
              { label: 'Clientes Atendidos', value: '30+', icon: 'business' },
              { label: 'Satisfação Cliente', value: '98%', icon: 'star' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <span className="material-symbols-outlined text-primary text-3xl opacity-50">{stat.icon}</span>
                <p className="text-3xl font-bold text-white tracking-tighter">{stat.value}</p>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter text-phosphor">
              Tudo sobre <span className="text-primary italic">Dados.</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Da camada de ingestão ao consumo analítico — cobrimos toda a jornada de dados da sua empresa.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SERVICES_PREVIEW.map((s) => (
              <button
                key={s.label}
                onClick={() => onNavigate(Page.SERVICES)}
                className="flex flex-col items-center gap-3 p-6 glass-card rounded-xl border border-white/5 hover:border-primary/20 hover:scale-[1.03] transition-all group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                aria-label={`Ver serviço: ${s.label}`}
              >
                <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="text-xs font-mono text-gray-400 text-center leading-snug">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Como Trabalhamos */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight text-phosphor">
              Como <span className="text-primary italic">Trabalhamos.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nossa consultoria combina expertise técnica profunda com visão de negócio. Entregamos desde a estratégia de dados até a implementação e capacitação do time.
            </p>

            <div className="space-y-4">
              {[
                { t: 'Diagnóstico & Estratégia', d: 'Mapeamos o estado atual da sua plataforma de dados, identificamos gaps e definimos o roadmap de evolução.' },
                { t: 'Arquitetura & Implementação', d: 'Desenhamos a arquitetura ideal e implementamos a solução — stack moderno, boas práticas, código de qualidade.' },
                { t: 'Capacitação & Transferência', d: 'Formamos o seu time para operar e evoluir a plataforma com autonomia após o projeto.' }
              ].map(item => (
                <div key={item.t} className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <h4 className="text-white font-bold text-base uppercase font-mono tracking-wider">{item.t}</h4>
                    <p className="text-gray-500 text-sm">{item.d}</p>
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
                  <div className="size-3 rounded-full bg-primary/40"></div>
                </div>
                <span className="text-xs font-mono text-gray-500">DATA_PLATFORM_PIPELINE v1.0</span>
              </div>
              <div className="font-mono text-sm space-y-2 overflow-hidden">
                <p className="text-primary animate-pulse">{'>'} [INGESTÃO] Conectando 12 fontes de dados...</p>
                <p className="text-white">{'>'} Airbyte: PostgreSQL, Salesforce, Google Ads OK</p>
                <p className="text-white">{'>'} [TRANSFORMAÇÃO] dbt run --select staging+</p>
                <p className="text-primary">{'>'} [QUALIDADE] dbt test: 847 passed, 0 failed</p>
                <p className="text-white">{'>'} [CATÁLOGO] Atualizando DataHub lineage...</p>
                <p className="text-primary">{'>'} [ANALYTICS] Dashboard atualizado. Dados prontos.</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/4 blur-[80px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
