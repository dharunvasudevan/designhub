export type PricingModel = 'Free & Open Source' | 'Freemium' | 'Paid' | 'All Pricing';

export type Platform = 'Web' | 'macOS' | 'Windows' | 'iOS / iPadOS' | 'Mobile' | 'Self-Host' | 'Discord' | 'Desktop';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  linkText?: string;
  icon?: string;
}

export interface BestForAudience {
  title: string;
  description: string;
  icon?: string;
}

export interface QuickFacts {
  developer: string;
  initialRelease: string;
  primaryFormats: string;
  offlineSupport: string;
  communityEcosystem: string;
}

export interface ResourceLink {
  title: string;
  url: string;
}

export interface ToolAlternative {
  slug: string;
  name: string;
  category: string;
  description: string;
  logo: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  overview?: string[];
  category: string;
  disciplines: string[];
  pricingModel: 'Free & Open Source' | 'Freemium' | 'Paid';
  pricingSubtitle?: string;
  platforms: Platform[];
  rating?: number;
  reviewCount?: string;
  reviewCountNumeric?: number;
  releaseYear?: number;
  featuresTech?: string[];
  tags: string[];
  verified: boolean;
  featured: boolean;
  websiteUrl: string;
  logo: string;
  previewImages?: string[];
  quickFacts?: QuickFacts;
  features?: KeyFeature[];
  bestFor?: BestForAudience[];
  pricingTiers?: PricingTier[];
  resources?: ResourceLink[];
  alternativeSlugs?: string[];
}

export interface Discipline {
  id: string;
  name: string;
  description: string;
  toolCount: number;
  iconName: string;
  slug: string;
}

export type SortOption = 'Most Popular' | 'Name: A–Z' | 'Name: Z–A' | 'Highest Rated';

export interface FilterState {
  searchQuery: string;
  categories: string[];
  pricingModels: string[];
  platforms: string[];
  featuresTech: string[];
  sortBy: SortOption;
}
