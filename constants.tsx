
import { Page, NavItem, CaseStudy } from './types';

export const IMAGES = {
  AI_GRAPH: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e', // Data/Growth graph
  NEURAL_NET: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', // Business/SaaS dashboard
  DATA_FLOW: 'https://images.unsplash.com/photo-1551434678-e076c223a692' // Team/Startup vibe
};

export const NAV_ITEMS: NavItem[] = [
  { id: Page.HOME, label: 'Início', icon: 'rocket_launch' },
  { id: Page.INFRASTRUCTURE, label: 'Metodologia', icon: 'psychology' },
  { id: Page.REPORTS, label: 'Projetos', icon: 'folder' },
  { id: Page.CONSULTANCY, label: 'Contato', icon: 'mail' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Acelerando Crescimento de Receita em SaaS',
    category: 'Consultoria Finance',
    tag: 'REVENUE GROWTH',
    industry: 'SAAS B2B',
    problem: 'Startup de SaaS B2B com dificuldade em identificar e converter oportunidades de expansão de receita. O time de Customer Success trabalhava de forma reativa, perdendo janelas importantes para upsell e cross-sell. A falta de visibilidade sobre padrões de uso dos clientes impedia ações proativas.',
    withdrawal: 'Realizamos uma análise completa da operação e desenvolvemos um sistema inteligente que monitora o comportamento dos clientes, identifica sinais de oportunidade de expansão e automatiza o processo de qualificação e acionamento. O time agora recebe alertas estratégicos e pode focar em conversões de alto valor.',
    result: '+35%',
    resultSub: 'aumento em receita recorrente em 6 meses',
    imageUrl: IMAGES.io_GRAPH,
  },
  {
    id: '2',
    title: 'Otimização do Funil de Vendas',
    category: 'Consultoria Growth',
    tag: 'SALES EFFICIENCY',
    industry: 'MARKETPLACE',
    problem: 'Marketplace em crescimento enfrentando gargalo no processo de vendas. A equipe comercial recebia muitos leads, mas a maioria não estava qualificada. O tempo gasto com leads de baixa qualidade impactava a capacidade de atender oportunidades reais, resultando em baixa taxa de conversão.',
    withdrawal: 'Mapeamos todo o processo de vendas e implementamos uma solução que qualifica e prioriza leads automaticamente. O sistema enriquece informações, identifica fit e agenda reuniões apenas com prospects qualificados. A equipe comercial passou a focar exclusivamente em oportunidades com maior probabilidade de fechamento.',
    result: '3x',
    resultSub: 'mais conversões com mesmo tamanho de equipe',
    imageUrl: IMAGES.NEURAL_NET,
  },
  {
    id: '3',
    title: 'Redução de Cancelamentos em Fintech',
    category: 'Consultoria Retention',
    tag: 'CUSTOMER RETENTION',
    industry: 'FINTECH',
    problem: 'Fintech enfrentando alta taxa de cancelamento sem conseguir identificar padrões ou sinais de alerta. As tentativas de retenção aconteciam apenas após o cancelamento, quando já era tarde demais. Informações importantes estavam espalhadas em diferentes sistemas, dificultando uma visão consolidada do cliente.',
    withdrawal: 'Criamos uma visão unificada do cliente consolidando dados de múltiplas fontes. Desenvolvemos um sistema que identifica sinais precoces de risco de cancelamento e aciona automaticamente ações preventivas personalizadas. A equipe agora recebe alertas proativos e pode intervir antes que o cliente tome a decisão de cancelar.',
    result: '-28%',
    resultSub: 'redução na taxa de churn em 4 meses',
    imageUrl: IMAGES.DATA_FLOW,
  }
];
