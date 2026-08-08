
import { Page, NavItem, CaseStudy } from './types';

export const IMAGES = {
  AI_GRAPH: '/projetos/data-migration.png',
  NEURAL_NET: '/projetos/data-platform.png',
  DATA_FLOW: '/projetos/data-governance.png'
};

export const NAV_ITEMS: NavItem[] = [
  { id: Page.HOME, label: 'Início', icon: 'rocket_launch' },
  { id: Page.SERVICES, label: 'Serviços', icon: 'hub' },
  { id: Page.MENTORIA, label: 'Mentoria', icon: 'school' },
  { id: Page.REPORTS, label: 'Projetos', icon: 'folder' },
  { id: Page.RESEARCH, label: 'Pesquisa IA', icon: 'insights' },
  { id: Page.CONSULTANCY, label: 'Contato', icon: 'mail' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Migração de Data Warehouse Legado para Modern Data Stack',
    category: 'Engenharia de Dados',
    tag: 'DATA MIGRATION',
    industry: 'VAREJO',
    problem: 'Empresa de varejo com data warehouse Oracle legado sofrendo com queries demorando horas, custo crescente de licenciamento e um time de dados incapaz de entregar análises com agilidade. O stack não escalava para os novos volumes de dados e a manutenção consumia 80% da capacidade do time.',
    withdrawal: 'Executamos a migração completa para BigQuery + dbt + Airflow. Redesenhamos a modelagem dimensional com arquitetura medallion (bronze/silver/gold), automatizamos a ingestão de 18 fontes de dados e implementamos testes de qualidade em cada camada. O time passou a desenvolver e entregar análises em ciclos de dias, não semanas.',
    result: '-70%',
    resultSub: 'redução no tempo de processamento e custo de infraestrutura',
    imageUrl: IMAGES.AI_GRAPH,
  },
  {
    id: '2',
    title: 'Construção de Plataforma de Dados para Fintech em Crescimento',
    category: 'Arquitetura de Dados',
    tag: 'DATA PLATFORM',
    industry: 'FINTECH',
    problem: 'Fintech em crescimento acelerado sem infraestrutura de dados estruturada. Decisões sendo tomadas com base em planilhas e dados inconsistentes espalhados em sistemas operacionais distintos. Relatórios regulatórios demoravam semanas e eram propensos a erros manuais.',
    withdrawal: 'Desenhamos e implementamos uma plataforma de dados completa: data lake no S3, ingestão via Airbyte de 12 fontes, transformação e modelagem com dbt, orquestração com Airflow e camada analítica no Metabase. Implementamos catálogo de dados, lineage e políticas de qualidade desde o dia zero.',
    result: '12x',
    resultSub: 'mais rápido na geração de relatórios regulatórios e análises de negócio',
    imageUrl: IMAGES.NEURAL_NET,
  },
  {
    id: '3',
    title: 'Programa de Governança de Dados em Grupo Industrial',
    category: 'Governança de Dados',
    tag: 'DATA GOVERNANCE',
    industry: 'INDÚSTRIA',
    problem: 'Grupo industrial com 6 subsidiárias, dados sem padronização entre unidades e compliance com LGPD em risco. Relatórios inconsistentes entre áreas geravam conflitos nas reuniões de diretoria. Sem linhagem de dados, era impossível rastrear a origem de qualquer número apresentado.',
    withdrawal: 'Implantamos programa de governança com DataHub como catálogo central, mapeamento completo de linhagem de dados, políticas de qualidade com SLAs por domínio e comitê de dados com ownership definido. Capacitamos 45 profissionais nos novos processos e entregamos adequação LGPD em toda a holding.',
    result: '100%',
    resultSub: 'adequação LGPD e dados confiáveis em toda a holding em 8 meses',
    imageUrl: IMAGES.DATA_FLOW,
  }
];
