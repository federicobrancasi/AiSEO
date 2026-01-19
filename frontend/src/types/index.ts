export interface Brand {
  id: string;
  name: string;
  type: 'primary' | 'competitor';
  visibility: number;
  trend: 'up' | 'down' | 'stable';
  sentiment: 'positive' | 'neutral' | 'negative';
  avgPosition: number;
  color: string;
}

export interface DailyVisibility {
  date: string;
  [brandId: string]: number | string;
}

export interface Source {
  domain: string;
  usage: number;
  avgCitations: number;
}

export interface PromptBrandMention {
  brandId: string;
  brandName: string;
  position: number;
  mentioned: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Prompt {
  id: string;
  query: string;
  visibility: number;
  avgPosition: number;
  totalMentions: number;
  brands: PromptBrandMention[];
}

export interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}
