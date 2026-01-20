
export enum Page {
  HOME = 'home',
  INFRASTRUCTURE = 'infrastructure',
  REPORTS = 'reports',
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
