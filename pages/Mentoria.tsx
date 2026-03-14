
import React from 'react';
import { Page } from '../types';

interface TrilhaStep {
  title: string;
  description: string;
}

interface TrilhaContent {
  title: string;
  description: string;
  steps: TrilhaStep[];
}

const TRILHAS: Record<string, TrilhaContent> = {
  'analista-dados': {
    title: 'Analista de Dados',
    description: 'Foco em extração de insights acionáveis, visualização de dados estratégicos e suporte à tomada de decisão. Ideal para quem quer atuar na ponta entre dados e negócio.',
    steps: [
      { title: 'Fundamentos de dados e SQL', description: 'Bases de modelagem, consultas e limpeza de dados para análise.' },
      { title: 'Visualização e storytelling', description: 'Ferramentas (ex.: Looker, Power BI) e boas práticas para dashboards que geram ação.' },
      { title: 'Métricas e OKRs', description: 'Definição de KPIs, acompanhamento e comunicação de resultados para stakeholders.' },
      { title: 'Projeto prático', description: 'Ciclo completo: pergunta de negócio, extração, análise e recomendação em caso real.' },
    ],
  },
  'engenharia-dados': {
    title: 'Engenharia de Dados',
    description: 'Foco na construção de infraestrutura robusta, pipelines de ETL escaláveis e arquitetura de armazenamento. Para quem quer desenhar e operar o backbone de dados.',
    steps: [
      { title: 'Arquitetura de dados', description: 'Data lakes, warehouses, modelagem dimensional e quando usar cada abordagem.' },
      { title: 'Pipeline e ETL', description: 'Orquestração, idempotência, testes e monitoramento de pipelines (Airflow, dbt, etc.).' },
      { title: 'Cloud e ferramentas', description: 'Uso de serviços em nuvem (BigQuery, Snowflake, Redshift) e boas práticas de custo e performance.' },
      { title: 'Projeto de pipeline', description: 'Desenho e implementação de um pipeline completo, da ingestão ao consumo analítico.' },
    ],
  },
  'engenharia-prompt': {
    title: 'Engenharia de Prompt',
    description: 'Domine a comunicação com LLMs, técnicas de otimização de contexto e encadeamento de agentes. Para quem quer construir produtos e fluxos baseados em IA generativa.',
    steps: [
      { title: 'Fundamentos de LLMs', description: 'Como modelos de linguagem funcionam, tokens, limites de contexto e custos.' },
      { title: 'Prompting e few-shot', description: 'Estrutura de prompts, exemplos, chain-of-thought e validação de saídas.' },
      { title: 'RAG e retrieval', description: 'Busca semântica, chunking e montagem de contexto para respostas fundamentadas.' },
      { title: 'Agentes e encadeamento', description: 'Uso de ferramentas, planejamento e orquestração de fluxos com agentes.' },
    ],
  },
};

interface MentoriaProps {
  onNavigate: (page: Page, subRoute?: string) => void;
  mentoriaSlug: string | null;
}

const Mentoria: React.FC<MentoriaProps> = ({ onNavigate, mentoriaSlug }) => {
  const programas = [
    { slug: 'analista-dados', icon: 'bar_chart', title: 'Analista de Dados', description: 'Foco em extração de insights acionáveis, visualização de dados estratégicos e suporte à tomada de decisão.' },
    { slug: 'engenharia-dados', icon: 'storage', title: 'Engenharia de Dados', description: 'Foco na construção de infraestrutura robusta, pipelines de ETL escaláveis e arquitetura de armazenamento.' },
    { slug: 'engenharia-prompt', icon: 'smart_toy', title: 'Engenharia de Prompt', description: 'Domine a comunicação com LLMs, técnicas de otimização de contexto e encadeamento de agentes.' },
  ];

  const trilha = mentoriaSlug ? TRILHAS[mentoriaSlug] : null;

  if (trilha) {
    return (
      <div className="flex flex-col pb-32">
        <header className="py-16 px-8 border-b border-white/5 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <button
              onClick={() => onNavigate(Page.MENTORIA)}
              className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm font-mono uppercase tracking-wider mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark rounded"
              aria-label="Voltar para programas de mentoria"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Voltar às mentorias
            </button>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight text-phosphor mb-4">
              {trilha.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {trilha.description}
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-8 mt-16 space-y-12">
          <h2 className="text-xl font-bold text-white uppercase font-mono tracking-widest border-b border-white/10 pb-3">
            Trilha de aprendizado
          </h2>
          {trilha.steps.map((step, index) => (
            <div key={step.title} className="flex gap-6">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-sm">
                {index + 1}
              </span>
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-8 mt-20">
          <button
            onClick={() => onNavigate(Page.CONSULTANCY, 'mentoria')}
            className="w-full md:w-auto bg-primary text-white px-12 h-14 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
            aria-label="Entrar em contato sobre esta mentoria"
          >
            Quero saber mais sobre esta trilha
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-32">
      <header className="py-24 px-8 text-center bg-white/[0.01] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-10" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none text-phosphor">
            Mentoria: <span className="text-primary italic">Transição para Dados.</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.5em]">
            Programas personalizados para quem deseja migrar de carreira e dominar o futuro da tecnologia.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {programas.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => onNavigate(Page.MENTORIA, item.slug)}
            className="flex flex-col gap-6 p-12 glass-card rounded-2xl border border-white/10 text-left hover:border-primary/20 hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark group"
            aria-label={`Ver trilha de ${item.title}`}
          >
            <span
              className="material-symbols-outlined text-primary text-4xl"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {item.title}
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              {item.description}
            </p>
            <span className="text-primary text-sm font-mono uppercase tracking-wider flex items-center gap-2 mt-auto">
              Ver trilha
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-40 px-8">
        <div className="p-16 border border-white/5 glass-card rounded-[2rem] flex flex-col gap-10">
          <div className="space-y-6 text-left">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Pronto para migrar para dados?
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Nossos programas de mentoria são personalizados para o seu nível e objetivo. Da análise de dados à engenharia de prompt, te acompanhamos na transição de carreira.
            </p>
          </div>
          <p className="text-gray-500 text-sm font-mono">
            Quer falar conosco? Use <strong className="text-gray-400">Fale conosco</strong> no menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mentoria;
