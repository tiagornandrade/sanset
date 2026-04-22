
import React from 'react';
import { Page } from '../types';

interface SolutionsProps {
  onNavigate: (page: Page) => void;
}

const SERVICES = [
  {
    icon: 'bar_chart',
    tag: 'BI & ANALYTICS',
    title: 'Business Intelligence',
    desc: 'Do BI tradicional ao self-service analytics moderno. Construímos camadas semânticas, dashboards executivos e estruturas de KPIs que colocam os dados nas mãos de quem decide.',
    deliverables: ['Dashboards e relatórios executivos', 'Self-service analytics', 'Modelagem dimensional (Star Schema)', 'Power BI, Looker, Metabase, Superset'],
  },
  {
    icon: 'hub',
    tag: 'MODERN DATA STACK',
    title: 'Modern Data Stack',
    desc: 'Arquitetura ELT moderna com as melhores ferramentas do mercado. Substituímos ETLs frágeis por pipelines confiáveis, testáveis e fáceis de manter — com dbt no centro.',
    deliverables: ['Arquitetura ELT com dbt', 'Snowflake, BigQuery, Databricks', 'Orquestração com Airflow ou Prefect', 'Data observability e alertas'],
  },
  {
    icon: 'settings_ethernet',
    tag: 'DATA ENGINEERING',
    title: 'Engenharia de Dados',
    desc: 'Pipelines robustos de ingestão, transformação e entrega de dados. Batch, streaming ou híbrido — integramos qualquer fonte e entregamos dados confiáveis para consumo analítico.',
    deliverables: ['Pipelines de ingestão e ETL/ELT', 'Streaming com Kafka ou Flink', 'Integração de APIs e bancos legados', 'Testes, monitoramento e alertas'],
  },
  {
    icon: 'database',
    tag: 'DATA LAKE & LAKEHOUSE',
    title: 'Data Lakes & Lakehouses',
    desc: 'Estruturação, migração e reestruturação de data lakes. Implementamos arquiteturas medallion (bronze/silver/gold) com Delta Lake ou Apache Iceberg sobre S3, GCS ou ADLS.',
    deliverables: ['Arquitetura medallion (bronze/silver/gold)', 'Delta Lake e Apache Iceberg', 'Particionamento e otimização de custo', 'Migração de warehouses legados'],
  },
  {
    icon: 'policy',
    tag: 'DATA GOVERNANCE',
    title: 'Governança de Dados',
    desc: 'Dados confiáveis com rastreabilidade completa. Implementamos catálogos, linhagem, políticas de qualidade e processos de ownership — com adequação a LGPD e GDPR.',
    deliverables: ['Catálogo de dados (DataHub, OpenMetadata)', 'Linhagem e rastreabilidade end-to-end', 'Políticas de qualidade e SLAs', 'Adequação LGPD / GDPR'],
  },
  {
    icon: 'account_tree',
    tag: 'DATA ARCHITECTURE',
    title: 'Arquitetura de Dados',
    desc: 'Decisões arquiteturais que impactam anos de evolução da plataforma. Avaliamos o stack atual, desenhamos a arquitetura target e entregamos um roadmap priorizado e executável.',
    deliverables: ['Avaliação do stack atual', 'Design de plataforma e data mesh', 'Roadmap tecnológico priorizado', 'Decisão de build vs buy'],
  },
  {
    icon: 'groups',
    tag: 'DATA TEAMS',
    title: 'Times de Dados',
    desc: 'Estruturamos e escalamos times de dados — de squads iniciais a plataformas de dados maduras. Analytics Engineering, Data Platform e cultura data-driven do zero ao estado da arte.',
    deliverables: ['Estrutura de squad e papéis', 'Analytics Engineering com dbt', 'Processos, rituais e cultura', 'Onboarding e capacitação do time'],
  },
];

const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col pb-32">
      <header className="py-24 px-8 text-center bg-white/[0.01] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-10"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none text-phosphor">
            Nossos <span className="text-primary italic">Serviços.</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.5em]">
            Consultoria especializada em toda a jornada de dados
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {SERVICES.slice(0, 6).map((s) => (
          <div key={s.title} className="flex flex-col gap-8 p-10 glass-card group">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">{s.icon}</span>
                <span className="text-xs font-mono text-primary font-bold tracking-widest">{s.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
            <div className="mt-auto space-y-3">
              <p className="text-xs uppercase tracking-widest text-gray-700 font-bold border-b border-white/5 pb-2">Entregáveis</p>
              <ul className="space-y-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-xs font-mono text-gray-400 flex items-center gap-2">
                    <span className="size-1 flex-shrink-0 bg-primary rounded-full"></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 7th service — full width highlight */}
      <div className="max-w-7xl mx-auto px-8 mt-8 w-full">
        <div className="flex flex-col md:flex-row gap-8 p-10 glass-card border border-primary/10">
          <div className="flex flex-col gap-4 md:w-1/2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">{SERVICES[6].icon}</span>
              <span className="text-xs font-mono text-primary font-bold tracking-widest">{SERVICES[6].tag}</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{SERVICES[6].title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{SERVICES[6].desc}</p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-700 font-bold border-b border-white/5 pb-2">Entregáveis</p>
            <ul className="grid grid-cols-2 gap-2">
              {SERVICES[6].deliverables.map((d) => (
                <li key={d} className="text-xs font-mono text-gray-400 flex items-center gap-2">
                  <span className="size-1 flex-shrink-0 bg-primary rounded-full"></span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-24 px-8">
        <div className="p-16 border border-white/5 glass-card rounded-[2rem] flex flex-col gap-10">
          <div className="space-y-6 text-left">
            <h3 className="text-3xl font-bold text-white tracking-tight">Seu projeto não se encaixa em uma caixa?</h3>
            <p className="text-gray-400 leading-relaxed">
              Cada empresa tem um contexto único — stack legado, restrições de orçamento, time em formação. Nossa consultoria parte do diagnóstico real do seu cenário para entregar a solução que faz sentido para você agora e escala com você no futuro.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">DIAGNÓSTICO PERSONALIZADO</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">ARQUITETURA SOB MEDIDA</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-primary">TRANSFERÊNCIA DE CONHECIMENTO</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate(Page.CONSULTANCY)}
            className="w-full md:w-auto bg-primary text-white px-12 h-14 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
            aria-label="Falar com a consultoria"
          >
            Falar com a consultoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
