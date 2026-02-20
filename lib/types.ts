/* ─── Synastry Cards API Response Types ─── */

export interface SynastryResponse {
  meta: Meta;
  summary: Summary;
  aspects: Aspect[];
}

export interface Meta {
  calculation: {
    zodiac: string;
    house_system: string;
  };
  generated_at: string;
  report_id?: string;
}

export interface Summary {
  archetype: Archetype;
  scores: ScoreItem[];
  strengths: string[];
  challenges: string[];
  narrative: string;
  bands?: SynastryBands;
  drivers_by_domain?: Record<string, DriverItem[]>;
}

export interface SynastryBands {
  rules_version?: string;
  theme: string;
  core: string;
  shadow: string;
}

export interface Archetype {
  id?: string;
  label: string;
  confidence: number;
  one_liner: string;
}

export interface ScoreItem {
  key: string;
  value: number;
  direction?: string;
}

export interface DriverItem {
  key: string;
  label: string;
  contribution: number;
}

export interface Aspect {
  key: string;
  aspect_id?: string;
  label: string;
  rank: number;
  strength: string;
  strength_value?: number;
  polarity: string;
  polarity_score: number;
  abs_polarity: number;
  dominant: string;
  domains: string[];
  display_policy: string;
  default_block: string;
  blocks: {
    supportive: Block;
    challenging: Block;
  };
}

export interface Block {
  title: string;
  one_liner: string;
  insight: string;
}

/* ─── Domain helpers ─── */
export type Domain = 'romance' | 'communication' | 'stability' | 'intimacy' | 'growth' | 'tension';

export const DOMAINS: Domain[] = ['romance', 'communication', 'stability', 'intimacy', 'growth', 'tension'];

export interface PersonData {
  name?: string;
  datetime: string;
  tz_str: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    timezone?: string;
  };
}

export interface ReportPayload {
  person_a: PersonData;
  person_b: PersonData;
}
