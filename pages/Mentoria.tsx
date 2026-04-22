
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
    description: 'Foco em extração de insights acionáveis, visualização de dados estratégicos e suporte à tomada de decisão. Ideal para quem quer atuar na ponte entre dados e negócio.',
    steps: [
      { title: 'Fundamentos de dados e SQL', description: 'Bases de modelagem, consultas avançadas e limpeza de dados para análise.' },
      { title: 'Visualização e storytelling', description: 'Ferramentas (Power BI, Looker, Metabase) e boas práticas para dashboards que geram ação.' },
      { title: 'Métricas, KPIs e OKRs', description: 'Definição de indicadores, acompanhamento e comunicação de resultados para stakeholders.' },
      { title: 'Projeto prático', description: 'Ciclo completo: pergunta de negócio, extração, análise e recomendação em caso real.' },
    ],
  },
  'engenharia-dados': {
    title: 'Engenharia de Dados',
    description: 'Foco na construção de infraestrutura robusta, pipelines de ETL/ELT escaláveis e arquitetura de armazenamento. Para quem quer desenhar e operar o backbone de dados.',
    steps: [
      { title: 'Arquitetura de dados', description: 'Data lakes, warehouses, lakehouses, modelagem medallion e quando usar cada abordagem.' },
      { title: 'Pipeline e ETL/ELT', description: 'Orquestração, idempotência, testes e monitoramento de pipelines (Airflow, Prefect, dbt).' },
      { title: 'Cloud e ferramentas', description: 'Uso de serviços em nuvem (BigQuery, Snowflake, Databricks) e boas práticas de custo e performance.' },
      { title: 'Projeto de pipeline completo', description: 'Desenho e implementação de um pipeline do zero: ingestão, transformação, qualidade e entrega.' },
    ],
  },
  'analytics-engineering': {
    title: 'Analytics Engineering',
    description: 'A ponte entre engenharia e análise. Aprenda a construir camadas de transformação com dbt, modelar dados de forma sustentável e entregar dados confiáveis para consumo analítico.',
    steps: [
      { title: 'Fundamentos de modelagem com dbt', description: 'Sources, staging, marts — estrutura de projeto dbt do zero à produção.' },
      { title: 'SQL avançado e transformações', description: 'CTEs, window functions, testes de dados e documentação como código.' },
      { title: 'Qualidade e observabilidade', description: 'dbt tests, Great Expectations, Elementary — garantindo dados confiáveis em cada camada.' },
      { title: 'Projeto de camada analítica', description: 'Modelagem completa de um domínio de negócio com dbt, testes e documentação.' },
    ],
  },
  'bi-developer': {
    title: 'BI Developer',
    description: 'Domine as principais ferramentas de Business Intelligence do mercado. Construa dashboards que tomadores de decisão realmente usam — com modelagem semântica e design de dados.',
    steps: [
      { title: 'Fundamentos de BI e modelagem semântica', description: 'Star schema, medidas, dimensões e a lógica por trás de dashboards de alta performance.' },
      { title: 'Power BI: do básico ao avançado', description: 'DAX, Power Query, modelagem de dados e boas práticas de desenvolvimento.' },
      { title: 'Looker e LookML', description: 'Modelagem semântica no Looker, explores, dimensions e measures para times de dados.' },
      { title: 'Projeto de dashboard executivo', description: 'Construção de um painel completo com múltiplas fontes, KPIs e documentação.' },
    ],
  },
  'plataforma-dados': {
    title: 'Plataforma de Dados',
    description: 'Para quem quer entender e operar o todo — da ingestão ao consumo. Aprenda a estruturar e evoluir uma plataforma de dados moderna, escalável e bem governada.',
    steps: [
      { title: 'Arquitetura de plataforma de dados', description: 'Data mesh, data fabric, lakehouse — conceitos e aplicação no mundo real.' },
      { title: 'Infraestrutura e ferramentas', description: 'Stack moderno: Airbyte, dbt, Airflow, Trino, Iceberg — integrando o ecossistema.' },
      { title: 'Governança e qualidade', description: 'Catálogo de dados, lineage, ownership, SLAs e cultura data-driven.' },
      { title: 'Projeto de plataforma end-to-end', description: 'Desenho e implementação de uma plataforma de dados completa do zero.' },
    ],
  },
};

interface MentoriaProps {
  onNavigate: (page: Page, subRoute?: string) => void;
  mentoriaSlug: string | null;
}

const Mentoria: React.FC<MentoriaProps> = ({ onNavigate, mentoriaSlug }) => {
  const programas = [
    { slug: 'analista-dados', icon: 'bar_chart', title: 'Analista de Dados', description: 'Extração de insights, visualização de dados e suporte à tomada de decisão. Da análise ao storytelling.' },
    { slug: 'engenharia-dados', icon: 'settings_ethernet', title: 'Engenharia de Dados', description: 'Pipelines robustos, arquitetura de armazenamento e infraestrutura de dados escalável.' },
    { slug: 'analytics-engineering', icon: 'hub', title: 'Analytics Engineering', description: 'Modelagem com dbt, SQL avançado e construção de camadas analíticas confiáveis e testáveis.' },
    { slug: 'bi-developer', icon: 'dashboard', title: 'BI Developer', description: 'Power BI, Looker e modelagem semântica. Dashboards que tomadores de decisão realmente usam.' },
    { slug: 'plataforma-dados', icon: 'storage', title: 'Plataforma de Dados', description: 'Arquitetura end-to-end, data mesh, governança e operação de plataformas de dados modernas.' },
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
            Mentoria em <span className="text-primary italic">Dados.</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.5em]">
            Trilhas personalizadas para quem quer entrar ou evoluir na área de dados.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {programas.map((item) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => onNavigate(Page.MENTORIA, item.slug)}
            className="flex flex-col gap-6 p-10 glass-card rounded-2xl border border-white/10 text-left hover:border-primary/20 hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark group"
            aria-label={`Ver trilha de ${item.title}`}
          >
            <span className="material-symbols-outlined text-primary text-4xl" aria-hidden="true">
              {item.icon}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
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
              Pronto para crescer em dados?
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Nossas trilhas são personalizadas para o seu nível e objetivo. Da análise à plataforma de dados, te acompanhamos na jornada com foco em aplicação prática e mercado real.
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
