
export enum Page {
  HOME = 'home',
  SERVICES = 'services',
  MENTORIA = 'mentoria',
  REPORTS = 'reports',
  RESEARCH = 'research',
  CONSULTANCY = 'consultancy'
}

export interface NavItem {
  id: Page;
  label: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tag: string;
  industry: string;
  problem: string;
  withdrawal: string;
  result: string;
  resultSub: string;
  imageUrl: string;
}
