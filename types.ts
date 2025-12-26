export enum SectionId {
  HERO = 'hero',
  PROBLEM = 'problem',
  TECH_STACK = 'tech_stack',
  WHY = 'why',
  INTENT = 'intent',
  DIAGNOSIS = 'diagnosis',
  MEMORY = 'memory',
  PLANNING = 'planning',
  EXECUTION = 'execution',
  VERIFICATION = 'verification',
  CTA = 'cta',
  ITERATION = 'iteration',
  OFFER = 'offer',
  FINAL = 'final'
}

export interface SectionContent {
  id: SectionId;
  headline?: string;
  subheadline?: string;
  copy?: string[];
  bullets?: string[];
  micro?: string;
  cta?: string;
  type?: 'cta';
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface CaseStudy {
  tag: string;
  featured: boolean;
  title: string;
  duration: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  quote: string;
  author: string;
}