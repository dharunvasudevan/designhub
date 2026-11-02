export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export const categoryFilterOptions: FilterOption[] = [
  { label: 'UI/UX Design', value: 'UI/UX Design', count: 18 },
  { label: 'Graphic Design', value: 'Graphic Design', count: 14 },
  { label: 'AI Design', value: 'AI Design', count: 12 },
  { label: 'Illustration', value: 'Illustration', count: 8 },
  { label: 'Prototyping', value: 'Prototyping', count: 11 },
  { label: 'No-Code', value: 'No-Code', count: 9 },
  { label: '3D & Motion', value: '3D & Motion', count: 7 },
  { label: 'Design Resources', value: 'Design Resources', count: 15 },
];

export const pricingFilterOptions: FilterOption[] = [
  { label: 'All Pricing', value: 'All Pricing', count: 64 },
  { label: 'Free & Open Source', value: 'Free & Open Source', count: 14 },
  { label: 'Freemium', value: 'Freemium', count: 32 },
  { label: 'Paid / Subscription', value: 'Paid', count: 18 },
];

export const platformFilterOptions: string[] = [
  'Web',
  'macOS',
  'Windows',
  'iOS / iPadOS',
];

export const featureFilterOptions: string[] = [
  'Real-time Collaboration',
  'Vector Engine',
  'AI-Powered',
  'Plugin Ecosystem',
];

export const popularSearchTags = [
  'UI/UX',
  'AI Design',
  'Illustration',
  'Prototyping',
  'No-Code',
];
