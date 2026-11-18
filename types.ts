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
export type BrainFileId = 'map' | 'voice' | 'rules' | 'customers' | 'skills' | 'memory';

export interface ModuleTree {
  reads: BrainFileId[];
  skills: [string, string][];
  out: string;
  live?: [string, string];
}

export interface Vertical {
  key: VerticalKey;
  tab: string;
  eyebrow: string;
  pack: string;
  build: string;
  // Slug of the worker room this vertical opens. Undefined keeps whatever room is open.
  room?: string;
  // Work-grid card that sits closest to this buyer.
  // Modules shown first in the offer for this buyer.
  modules: ModuleId[];
}

export interface OfferModule {
  id: ModuleId;
  name: string;
  line: string;
}

