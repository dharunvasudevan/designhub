import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Check } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { ToolLogo } from '../components/common/ToolLogo';
import { DisciplineIcon } from '../components/common/DisciplineIcon';
import { disciplinesData } from '../data/disciplinesData';
import { toolsData } from '../data/toolsData';
import { popularSearchTags } from '../data/categoriesData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // 8 featured tools displayed on Home matching Screenshot 1
  const featuredSlugs = [
    'figma',
    'photoshop',
    'canva',
    'framer',
    'webflow',
    'procreate',
    'penpot',
    'uizard',
  ];

  const featuredTools = featuredSlugs
    .map((slug) => toolsData.find((t) => t.slug === slug))
    .filter(Boolean);

  const handleOpenSubmitModal = () => {
    window.dispatchEvent(new CustomEvent('open-submit-modal'));
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Directory Label Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
          THE DESIGN TOOL DIRECTORY
        </div>

        {/* Large Centered Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.12] mb-5">
          Discover the Right Tools for <br className="hidden sm:inline" />
          Your Creative Workflow.
        </h1>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
          Explore design tools for every idea, workflow, and creative challenge. Curated, reviewed, and updated weekly.
        </p>

        {/* Large Search Bar */}
        <div className="max-w-2xl mx-auto mb-5 shadow-xs">
          <SearchBar size="lg" placeholder="Search tools, categories, or use cases..." />
        </div>

        {/* Popular Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-bold tracking-wider text-[11px] uppercase mr-1">
            POPULAR:
          </span>
          {popularSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate(`/explore?category=${encodeURIComponent(tag)}`)}
              className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer border border-slate-200/60"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Browse by Discipline Section (Subtle Light Blue Tint) */}
      <section id="disciplines" className="bg-[#f8fafd] border-y border-slate-200/60 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-950 tracking-tight">
                Browse by Discipline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Curated toolsets grouped by creative workflow.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors group"
            >
              <span>View all 8 domains</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* 8 Disciplines Grid (4 cols x 2 rows on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {disciplinesData.map((discipline) => (
              <div
                key={discipline.id}
                onClick={() => navigate(`/explore?category=${encodeURIComponent(discipline.name)}`)}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-slate-100 transition-colors">
                    <DisciplineIcon name={discipline.iconName} className="w-4 h-4 text-slate-800" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1.5 group-hover:text-slate-950">
                    {discipline.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {discipline.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-[11px]">
                  <span className="font-bold text-slate-400 tracking-wider uppercase text-[10px]">
                    {discipline.toolCount} TOOLS
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
                    View Details
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Design Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-[26px] font-bold text-slate-950 tracking-tight">
              Featured Design Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked industry essentials favored by product teams and studios.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors group"
          >
            <span>Browse All 140+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 8 Featured Tool Cards (4 cols x 2 rows on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => {
            if (!tool) return null;

            // Pricing display tag: Penpot says "Open Source" in Screenshot 1
            const pricingLabel =
              tool.slug === 'penpot' ? 'Open Source' : tool.pricingModel;

            return (
              <div
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Logo and Pricing Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <ToolLogo name={tool.logo} size="md" />
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                      {pricingLabel}
                    </span>
                  </div>

                  {/* Name with Verified Check */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-slate-950 text-base">{tool.name}</h3>
                    {tool.verified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Category label */}
                  <p className="text-[11px] font-medium text-slate-400 mb-2">
                    {tool.category}
                  </p>

                  {/* Description (truncated to 2 lines) */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                {/* Card Footer: Rating and View Details */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
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
      </section>

      {/* 4. Community Submissions Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="bg-[#f0f6fc] border border-blue-100/80 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left w-full">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              COMMUNITY SUBMISSIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
              Looking to submit a tool?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Help expand our catalog. We review submissions weekly for design fidelity, platform stability, and utility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 shrink-0 w-full lg:w-auto justify-between">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-950 tracking-tight">150+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                  TOOLS
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-950 tracking-tight">8</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                  DISCIPLINES
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-950 tracking-tight">25k</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                  MONTHLY CREATIVES
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenSubmitModal}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer w-full sm:w-auto"
            >
              Submit to Directory
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
