import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Grid,
  List,
  ChevronDown,
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { toolsData } from '../data/toolsData';
import {
  categoryFilterOptions,
  pricingFilterOptions,
  platformFilterOptions,
  featureFilterOptions,
} from '../data/categoriesData';
import { ToolLogo } from '../components/common/ToolLogo';
import { Badge } from '../components/common/Badge';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL Query Sync
  const urlCategory = searchParams.get('category');
  const urlQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : []
  );
  const [selectedPricing, setSelectedPricing] = useState<string>('All Pricing');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state if URL changes externally
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // Toggle Platform
  const togglePlatform = (plat: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
    setCurrentPage(1);
  };

  // Toggle Feature
  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPricing('All Pricing');
    setSelectedPlatforms([]);
    setSelectedFeatures([]);
    setSearchParams({});
    setCurrentPage(1);
  };

  // Dynamic filter counts based on toolsData
  const counts = useMemo(() => {
    const catCounts: Record<string, number> = {};
    categoryFilterOptions.forEach((c) => {
      catCounts[c.value] = toolsData.filter(
        (t) => t.category === c.value || t.disciplines.includes(c.value)
      ).length;
    });

    const priceCounts: Record<string, number> = {
      'All Pricing': toolsData.length,
      'Free & Open Source': toolsData.filter((t) => t.pricingModel === 'Free & Open Source').length,
      Freemium: toolsData.filter((t) => t.pricingModel === 'Freemium').length,
      Paid: toolsData.filter((t) => t.pricingModel === 'Paid').length,
    };

    return { catCounts, priceCounts };
  }, []);

  // Filter & Search Logic
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      // TASK 1: Robust Search Matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const qNormalized = q.replace(/[^a-z0-9]/g, '');

        // Match Name
        const nameMatch =
          tool.name.toLowerCase().includes(q) ||
          tool.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(qNormalized);

        // Match Category & Disciplines
        const categoryMatch =
          tool.category.toLowerCase().includes(q) ||
          tool.disciplines.some((d) => d.toLowerCase().includes(q)) ||
          // Special abbreviations: e.g. "ui/ux", "ui", "ux", "ai", "no code", "3d"
          (qNormalized === 'uiux' && tool.disciplines.includes('UI/UX Design')) ||
          (qNormalized === 'ui' && tool.disciplines.includes('UI/UX Design')) ||
          (qNormalized === 'ux' && tool.disciplines.includes('UI/UX Design')) ||
          (qNormalized === 'ai' && (tool.category.toLowerCase().includes('ai') || tool.featuresTech?.includes('AI-Powered'))) ||
          (qNormalized === 'nocode' && tool.category.toLowerCase().includes('no-code')) ||
          (qNormalized === '3d' && tool.category.toLowerCase().includes('3d'));

        // Match Description & Tagline
        const descMatch =
          tool.description.toLowerCase().includes(q) ||
          (tool.tagline && tool.tagline.toLowerCase().includes(q));

        // Match Tags
        const tagsMatch = tool.tags.some(
          (t) =>
            t.toLowerCase().includes(q) ||
            t.toLowerCase().replace('#', '').includes(qNormalized)
        );

        // Match Platforms
        const platformMatch = tool.platforms.some((p) =>
          p.toLowerCase().includes(q)
        );

        if (!nameMatch && !categoryMatch && !descMatch && !tagsMatch && !platformMatch) {
          return false;
        }
      }

      // TASK 2: Category Filter
      if (selectedCategories.length > 0) {
        const matchesCategory =
          selectedCategories.includes(tool.category) ||
          tool.disciplines.some((d) => selectedCategories.includes(d));
        if (!matchesCategory) return false;
      }

      // TASK 2: Pricing Filter
      if (selectedPricing !== 'All Pricing') {
        if (selectedPricing === 'Free & Open Source' && tool.pricingModel !== 'Free & Open Source') {
          return false;
        }
        if (selectedPricing === 'Freemium' && tool.pricingModel !== 'Freemium') {
          return false;
        }
        if (selectedPricing === 'Paid' && tool.pricingModel !== 'Paid') {
          return false;
        }
      }

      // TASK 2: Platform Filter (OR within group)
      if (selectedPlatforms.length > 0) {
        const matchesPlatform = selectedPlatforms.some((plat) => {
          if (plat === 'iOS / iPadOS') {
            return tool.platforms.includes('iOS / iPadOS');
          }
          return tool.platforms.includes(plat as any);
        });
        if (!matchesPlatform) return false;
      }

      // TASK 2: Features & Tech Filter (AND within group)
      if (selectedFeatures.length > 0) {
        const matchesFeatures = selectedFeatures.every((feat) =>
          tool.featuresTech?.includes(feat)
        );
        if (!matchesFeatures) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedPricing, selectedPlatforms, selectedFeatures]);

  // TASK 3: SORTING
  const sortedTools = useMemo(() => {
    const list = [...filteredTools];
    switch (sortBy) {
      case 'Most Popular':
        return list.sort(
          (a, b) => (b.reviewCountNumeric || 0) - (a.reviewCountNumeric || 0)
        );
      case 'Highest Rated':
        return list.sort(
          (a, b) =>
            b.rating - a.rating ||
            (b.reviewCountNumeric || 0) - (a.reviewCountNumeric || 0)
        );
      case 'A-Z':
      case 'Name (A-Z)':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'Newest':
        return list.sort(
          (a, b) => (b.releaseYear || 0) - (a.releaseYear || 0)
        );
      default:
        return list;
    }
  }, [filteredTools, sortBy]);

  // TASK 5: PAGINATION
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(sortedTools.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTools = sortedTools.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Active Filter Chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (searchQuery.trim()) {
      chips.push({
        label: `Search: "${searchQuery}"`,
        onRemove: () => {
          setSearchQuery('');
          setCurrentPage(1);
        },
      });
    }

    selectedCategories.forEach((cat) => {
      chips.push({
        label: `Category: ${cat}`,
        onRemove: () => toggleCategory(cat),
      });
    });

    if (selectedPricing !== 'All Pricing') {
      chips.push({
        label: `Pricing: ${selectedPricing}`,
        onRemove: () => {
          setSelectedPricing('All Pricing');
          setCurrentPage(1);
        },
      });
    }

    selectedPlatforms.forEach((plat) => {
      chips.push({
        label: `Platform: ${plat}`,
        onRemove: () => togglePlatform(plat),
      });
    });

    selectedFeatures.forEach((feat) => {
      chips.push({
        label: `Feature: ${feat}`,
        onRemove: () => toggleFeature(feat),
      });
    });

    return chips;
  }, [searchQuery, selectedCategories, selectedPricing, selectedPlatforms, selectedFeatures]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
            CURATED SOFTWARE INDEX
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Explore Design Tools
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Find tools that fit your creative needs. Filter by discipline, licensing, and workflow stage.
          </p>
        </div>

        {/* Header Stats */}
        <div className="flex items-center gap-6 sm:gap-10 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-10 text-xs">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              ACTIVE TOOLS
            </div>
            <div className="text-2xl font-black text-slate-950">{toolsData.length}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              CATEGORIES
            </div>
            <div className="text-2xl font-black text-slate-950">8</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              LAST INDEXED
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1.5">Today, 09:20 AM</div>
          </div>
        </div>
      </div>

      {/* Main Filter Bar & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4 border-b border-slate-100">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="font-semibold text-slate-900">
            Showing {sortedTools.length} curated {sortedTools.length === 1 ? 'tool' : 'tools'}
          </span>
          <span>•</span>
          <span>Filter criteria matched</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              SORT BY:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-slate-400 cursor-pointer shadow-2xs"
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="A-Z">A-Z</option>
                <option value="Newest">Newest</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white shadow-2xs text-slate-900'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white shadow-2xs text-slate-900'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs"
            >
              <span>{chip.label}</span>
              <button
                onClick={chip.onRemove}
                className="hover:text-red-600 transition-colors cursor-pointer p-0.5"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-slate-500 hover:text-slate-900 font-medium underline ml-2 cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Layout: Sidebar Filters + Main Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                FILTERS
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-900 transition-colors uppercase cursor-pointer"
              >
                CLEAR ALL
              </button>
            </div>

            {/* Filter Search Input (Real-time dynamic search) */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter within results..."
                className="w-full pl-8 pr-8 py-1.5 bg-white text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-slate-400 placeholder:text-slate-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Group */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                <span>CATEGORY</span>
                <span className="text-[11px] font-medium text-slate-400">
                  {categoryFilterOptions.length} Items
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {categoryFilterOptions.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.value);
                  const count = counts.catCounts[cat.value] || 0;
                  return (
                    <label
                      key={cat.value}
                      className="flex items-center justify-between cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat.value)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                        />
                        <span
                          className={`font-medium transition-colors ${
                            isChecked
                              ? 'text-slate-950 font-semibold'
                              : 'text-slate-700 group-hover:text-slate-950'
                          }`}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Pricing Model */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                PRICING MODEL
              </div>
              <div className="space-y-2 text-xs">
                {pricingFilterOptions.map((p) => {
                  const isSelected = selectedPricing === p.value;
                  const count = counts.priceCounts[p.value] || 0;
                  return (
                    <label
                      key={p.value}
                      className="flex items-center justify-between cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pricing"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedPricing(p.value);
                            setCurrentPage(1);
                          }}
                          className="text-slate-900 focus:ring-0 cursor-pointer"
                        />
                        <span
                          className={`font-medium transition-colors ${
                            isSelected
                              ? 'text-slate-950 font-semibold'
                              : 'text-slate-700 group-hover:text-slate-950'
                          }`}
                        >
                          {p.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Platform Filter */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                PLATFORM
              </div>
              <div className="flex flex-wrap gap-1.5">
                {platformFilterOptions.map((plat) => {
                  const active = selectedPlatforms.includes(plat);
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => togglePlatform(plat)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                        active
                          ? 'bg-slate-950 text-white border-slate-950 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features & Tech */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                FEATURES &amp; TECH
              </div>
              <div className="space-y-2 text-xs">
                {featureFilterOptions.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <label
                      key={feat}
                      className="flex items-center gap-2 cursor-pointer group select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFeature(feat)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                      />
                      <span
                        className={`font-medium transition-colors ${
                          isChecked
                            ? 'text-slate-950 font-semibold'
                            : 'text-slate-700 group-hover:text-slate-950'
                        }`}
                      >
                        {feat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Editorial Guarantee Banner */}
            <div className="bg-[#f0f6fc] border border-blue-100 rounded-xl p-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span className="text-[11px] uppercase tracking-wider">EDITORIAL GUARANTEE</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Every tool undergoes manual workflow verification by senior designers prior to inclusion.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content: Tools View (Grid or List) */}
        <main className="lg:col-span-3">
          {sortedTools.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xs border border-slate-200 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No tools matched your criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
                No creative software matched your search query or selected filter combinations. Try clearing some filters or searching for generic terms like "UI/UX", "3D", or "Prototyping".
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View (Matching Screenshot 2) */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedTools.map((tool) => {
                const pricingBadge =
                  tool.slug === 'penpot' ? 'Open Source' : tool.pricingModel;

                return (
                  <div
                    key={tool.id}
                    onClick={() => navigate(`/tools/${tool.slug}`)}
                    className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Logo & Badges */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <ToolLogo name={tool.logo} size="md" />
                        <div className="flex items-center gap-1.5">
                          <Badge variant="category">{tool.category.split(' ')[0]}</Badge>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                            {pricingBadge}
                          </span>
                        </div>
                      </div>

                      {/* Name & Platform row */}
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-950 text-base">{tool.name}</h3>
                          {tool.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 stroke-white shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">
                          {tool.platforms.slice(0, 2).join(' • ')}
                        </span>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {tool.description}
                      </p>

                      {/* Tags Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-sm bg-slate-50 border border-slate-200/60 text-[11px] text-slate-500 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Rating with Review Count + View Details */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span>{tool.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal text-[11px]">
                          ({tool.reviewCount})
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
                        View Details
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {paginatedTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.slug}`)}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <ToolLogo name={tool.logo} size="md" className="shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-950 text-base">{tool.name}</h3>
                        {tool.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 stroke-white shrink-0" />
                        )}
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                          {tool.pricingModel}
                        </span>
                        <span className="text-xs text-slate-400 font-medium hidden md:inline">
                          • {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1 font-semibold text-slate-800 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>{tool.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal text-[11px]">
                        ({tool.reviewCount})
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic Pagination Controls */}
          {sortedTools.length > 0 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Displaying{' '}
                <strong className="text-slate-900">
                  {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedTools.length)}
                </strong>{' '}
                of <strong className="text-slate-900">{sortedTools.length}</strong> tools
              </span>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  disabled={validCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center cursor-pointer transition-colors ${
                      validCurrentPage === pageNum
                        ? 'bg-slate-950 text-white'
                        : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  disabled={validCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
