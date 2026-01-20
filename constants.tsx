
import { Page, NavItem, CaseStudy } from './types';

export const IMAGES = {
  AI_GRAPH: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=2000&auto=format&fit=crop', // Data/Growth graph
  NEURAL_NET: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop', // Business/SaaS dashboard
  DATA_FLOW: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop' // Team/Startup vibe
};

export const NAV_ITEMS: NavItem[] = [
  { id: Page.HOME, label: 'Início', icon: 'rocket_launch' },
  { id: Page.INFRASTRUCTURE, label: 'Stack Agêntica', icon: 'layers' },
  { id: Page.REPORTS, label: 'Growth Logs', icon: 'monitoring' },
  { id: Page.CONSULTANCY, label: 'Escalar Operação', icon: 'add_chart' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Otimização de MRR Expansion',
    category: 'Agentic Finance',
    tag: 'MRR REVENUE',
    industry: 'SAAS B2B',
    problem: 'Time de CS perdendo oportunidades de upsell por falta de análise em tempo real do uso do produto.',
    withdrawal: 'Agentes conectados via MCP ao Stripe e Mixpanel que identificam e iniciam fluxos de expansão automaticamente.',
    result: '+22%',
    resultSub: 'em MRR Expansion',
    imageUrl: IMAGES.AI_GRAPH,
  },
  {
    id: '2',
    title: 'Arquitetura de Lead Scoring Autônomo',
    category: 'Growth Swarms',
    tag: 'LEAD GEN',
    industry: 'MARKETPLACE',
    problem: 'SDRs sobrecarregados com leads desqualificados e baixa velocidade de resposta (LVR).',
    withdrawal: 'Ecossistema A2A que qualifica, enriquece e agenda reuniões no Calendly sem intervenção humana no topo do funil.',
    result: '4.2x',
    resultSub: 'mais Sales Ready Leads',
    imageUrl: IMAGES.NEURAL_NET,
  },
  {
    id: '3',
    title: 'Redução de Churn com RAG Preditivo',
    category: 'Retention Intelligence',
    tag: 'CHURN CONTROL',
    industry: 'FINTECH',
    problem: 'Dificuldade em prever churn baseado em tickets de suporte e logs de erro dispersos.',
    withdrawal: 'RAG alimentado por todos os silos de dados (Zendesk, Slack, DB) que atua preventivamente via agentes de retenção.',
    result: '-15%',
    resultSub: 'no Churn Mensal',
    imageUrl: IMAGES.DATA_FLOW,
  }
];
