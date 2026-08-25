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

export interface SectionContent {
  id: SectionId;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  copy?: string[];
  bullets?: string[];
  micro?: string;
  cta?: string;
  type?: 'cta';
}

export interface ShowroomBrand {
  name: string;
  role: string;
  room: string;
  receipts: string[];
}

export interface OfferVehicle {
  name: string;
  detail: string;
  value: string;
}
