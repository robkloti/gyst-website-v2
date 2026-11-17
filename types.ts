export enum SectionId {
  HERO = 'hero',
  PROBLEM = 'problem',
  ROUTE = 'route',
  REMEMBER = 'remember',
  DO = 'do',
  RUN = 'run',
  CTA = 'cta',
  OFFER = 'offer',
  FINAL = 'final'
}

export type VerticalKey = 'all' | 'trades' | 'realestate' | 'insurance' | 'marketing' | 'studio';
export type ModuleId = 'lead' | 'desk' | 'content' | 'ads' | 'console' | 'apps';

export interface Vertical {
  key: VerticalKey;
  tab: string;
  eyebrow: string;
  pack: string;
  build: string;
  // Slug of the worker room this vertical opens. Undefined keeps whatever room is open.
  room?: string;
  // Work-grid card that sits closest to this buyer.
  proof?: string;
  // Modules shown first in the offer for this buyer.
  modules: ModuleId[];
}

export interface OfferModule {
  id: ModuleId;
  name: string;
  line: string;
}

export interface WorkCard {
  id: string;
  tag: string;
  kind: string;
  title: string;
  line: string;
  cta: string;
  href: string;
  image?: string;
  span: 'wide' | 'narrow';
}
