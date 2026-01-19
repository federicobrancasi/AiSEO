import type { Brand, DailyVisibility, Source, Prompt } from '../types';

export const brands: Brand[] = [
  {
    id: 'wix',
    name: 'Wix',
    type: 'primary',
    visibility: 35,
    trend: 'up',
    sentiment: 'positive',
    avgPosition: 2.9,
    color: '#06b6d4', // Cyan - Primary brand
  },
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'competitor',
    visibility: 52,
    trend: 'up',
    sentiment: 'positive',
    avgPosition: 1.8,
    color: '#f59e0b', // Amber - Competitor 1
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    type: 'competitor',
    visibility: 45,
    trend: 'stable',
    sentiment: 'positive',
    avgPosition: 2.3,
    color: '#8b5cf6', // Violet - Competitor 2
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    type: 'competitor',
    visibility: 32,
    trend: 'down',
    sentiment: 'neutral',
    avgPosition: 3.1,
    color: '#ec4899', // Pink - Competitor 3
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    type: 'competitor',
    visibility: 28,
    trend: 'stable',
    sentiment: 'neutral',
    avgPosition: 3.4,
    color: '#10b981', // Emerald - Competitor 4
  },
];

function generateVisibilityData(): DailyVisibility[] {
  const data: DailyVisibility[] = [];
  const today = new Date();

  const baseValues: Record<string, number> = {
    shopify: 48,
    woocommerce: 44,
    bigcommerce: 35,
    wix: 32,
    squarespace: 28,
  };

  const trends: Record<string, number> = {
    shopify: 0.05,
    woocommerce: 0.01,
    bigcommerce: -0.03,
    wix: 0.04,
    squarespace: 0.01,
  };

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const dayData: DailyVisibility = { date: dateStr };

    for (const brand of brands) {
      const dayIndex = 89 - i;
      const trendEffect = trends[brand.id] * dayIndex;
      const randomVariation = (Math.random() - 0.5) * 6;
      const value = Math.max(0, Math.min(100, baseValues[brand.id] + trendEffect + randomVariation));
      dayData[brand.id] = Math.round(value * 10) / 10;
    }

    data.push(dayData);
  }

  return data;
}

export const visibilityData: DailyVisibility[] = generateVisibilityData();

export const sources: Source[] = [
  { domain: 'forbes.com', usage: 78, avgCitations: 3.2 },
  { domain: 'techradar.com', usage: 72, avgCitations: 2.8 },
  { domain: 'pcmag.com', usage: 68, avgCitations: 2.5 },
  { domain: 'ecommerce-platforms.com', usage: 65, avgCitations: 4.1 },
  { domain: 'websitebuilderexpert.com', usage: 62, avgCitations: 3.7 },
  { domain: 'shopify.com', usage: 58, avgCitations: 2.1 },
  { domain: 'wpbeginner.com', usage: 55, avgCitations: 2.9 },
  { domain: 'g2.com', usage: 52, avgCitations: 2.3 },
  { domain: 'capterra.com', usage: 48, avgCitations: 2.0 },
  { domain: 'trustpilot.com', usage: 45, avgCitations: 1.8 },
];

const promptQueries = [
  "What is the best ecommerce platform in 2026?",
  "Which is better, Shopify or WooCommerce?",
  "What ecommerce platform should I use for a small business?",
  "How do I start an online store?",
  "What's the cheapest way to sell products online?",
  "Which ecommerce platform has the best SEO features?",
  "What platform should I use for dropshipping?",
  "Is Shopify worth the price?",
  "What are the best alternatives to WooCommerce?",
  "Should I use BigCommerce or Shopify for my store?",
  "What's the easiest platform to set up an online shop?",
  "Which ecommerce platform is best for beginners?",
  "How do I choose between Wix and Shopify?",
  "What platform do most successful online stores use?",
  "Is Squarespace good for selling products?",
  "What ecommerce tools do I need to start selling online?",
  "Which platform has the lowest transaction fees?",
  "What's the best ecommerce platform for digital products?",
  "How does Shopify compare to other ecommerce platforms?",
  "What should I look for in an ecommerce platform?",
];

function generatePrompts(): Prompt[] {
  return promptQueries.map((query, index) => {
    const brandMentions = brands.map((brand) => {
      const mentioned = Math.random() > 0.3;
      const position = mentioned ? Math.floor(Math.random() * 5) + 1 : 0;
      const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
      const sentiment = sentiments[Math.floor(Math.random() * 3)];

      return {
        brandId: brand.id,
        brandName: brand.name,
        position,
        mentioned,
        sentiment,
      };
    });

    const mentionedBrands = brandMentions.filter(b => b.mentioned);
    const visibility = mentionedBrands.some(b => b.brandId === 'wix')
      ? Math.floor(Math.random() * 30) + 50
      : Math.floor(Math.random() * 40) + 20;

    const avgPosition = mentionedBrands.length > 0
      ? mentionedBrands.reduce((sum, b) => sum + b.position, 0) / mentionedBrands.length
      : 0;

    return {
      id: `prompt-${index + 1}`,
      query,
      visibility,
      avgPosition: Math.round(avgPosition * 10) / 10,
      totalMentions: mentionedBrands.length,
      brands: brandMentions,
    };
  });
}

export const prompts: Prompt[] = generatePrompts();

export const metrics = {
  visibility: {
    value: brands.find(b => b.type === 'primary')?.visibility || 0,
    change: 4.2,
  },
  totalPrompts: {
    value: prompts.length,
    change: 0,
  },
  totalSources: {
    value: sources.length,
    change: 2,
  },
  avgPosition: {
    value: brands.find(b => b.type === 'primary')?.avgPosition || 0,
    change: -0.3,
  },
};
