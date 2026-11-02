import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ExternalLink,
  Bookmark,
  Share2,
  CheckCircle2,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
  Layers,
  Users,
  Code,
  GitBranch,
  Palette,
  Component,
  Sparkles,
} from 'lucide-react';
import { getToolBySlug, toolsData } from '../data/toolsData';
import { ToolLogo } from '../components/common/ToolLogo';
import { useAuth } from '../context/AuthContext';

export const ToolDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isToolSaved, toggleSaveTool } = useAuth();
  const [copiedShare, setCopiedShare] = useState(false);

  // If no slug or tool not found, fallback to figma for demo fidelity
  const tool = getToolBySlug(slug || 'figma') || toolsData[0];
  const isSaved = isToolSaved(tool.slug);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Find alternative tools
  const alternatives = (tool.alternativeSlugs || ['penpot', 'framer', 'sketch', 'adobe-xd'])
    .map((s) => toolsData.find((t) => t.slug === s))
    .filter(Boolean);

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-slate-800" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-slate-800" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-slate-800" />;
      case 'Code':
        return <Code className="w-5 h-5 text-slate-800" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-800" />;
    }
  };

  const getAudienceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-slate-800" />;
      case 'Component':
        return <Component className="w-5 h-5 text-slate-800" />;
      default:
        return <Users className="w-5 h-5 text-slate-800" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-800 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/explore" className="hover:text-slate-800 transition-colors">
          Explore Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/explore?category=${encodeURIComponent(tool.category)}`}
          className="hover:text-slate-800 transition-colors"
        >
          {tool.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">{tool.name}</span>
      </nav>

      {/* Tool Header Profile */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-slate-200">
        <div className="flex items-start gap-5">
          <ToolLogo name={tool.logo} size="xl" className="shrink-0" />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {tool.name}
              </h1>
              {tool.verified && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600 stroke-white" />
                  <span>Verified Directory Pick</span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {tool.tagline}
            </p>

            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
                {tool.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
                {tool.pricingSubtitle || tool.pricingModel}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                <span className="font-bold">{tool.rating.toFixed(1)}</span>
                <span className="text-slate-500">({tool.reviewCount})</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
                {tool.platforms.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <span>Visit Official Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => toggleSaveTool(tool.slug)}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? 'bg-slate-100 border-slate-300 text-slate-950 font-semibold'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-slate-950' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            title="Share tool"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copiedShare && (
            <span className="text-[11px] text-green-600 font-semibold animate-fade">
              Link copied!
            </span>
          )}
        </div>
      </div>

      {/* Production Canvas Preview / Media Gallery */}
      <section className="my-10">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="uppercase tracking-wider font-bold text-slate-700">
              ACTIVE PRODUCTION CANVAS PREVIEW
            </span>
          </div>
          <span className="text-slate-400">Workflow 4.1 • Real-time Engine</span>
        </div>

        {/* Gallery Carousel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Video / Play demo */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video group cursor-pointer flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80"
              alt="Design canvas video"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <button className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
            </button>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-800 shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Interactive screen showcase */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-200 aspect-video p-6 flex flex-col justify-between">
            <div className="w-6 h-6">
              <ToolLogo name={tool.logo} size="sm" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-950 leading-tight">
                Keep your designs <span className="text-indigo-600">up to date.</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Sync states across components and shared library assets.
              </p>
            </div>
            <div className="w-full bg-white/90 rounded-lg p-2.5 shadow-xs border border-white flex items-center justify-between text-[11px] text-slate-700">
              <span>Smart token updates</span>
              <span className="text-indigo-600 font-bold">14 synced</span>
            </div>
          </div>

          {/* Card 3: Inspect mode preview */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border border-slate-200 aspect-video p-6 flex flex-col justify-between">
            <div className="w-6 h-6">
              <ToolLogo name={tool.logo} size="sm" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-950 leading-tight">
                See exact changes <span className="text-purple-600">in real-time.</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Inspect vector layers and code snippets side-by-side.
              </p>
            </div>
            <div className="w-full bg-white/90 rounded-lg p-2.5 shadow-xs border border-white flex items-center justify-between text-[11px] text-slate-700">
              <span>CSS Flexbox &amp; Tokens</span>
              <span className="text-purple-600 font-bold">Dev Mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid: Left Main Details + Right Quick Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
        {/* Left Column: Overview, Features, Best For, Pricing Breakdown */}
        <div className="lg:col-span-2 space-y-14">
          {/* Tool Overview */}
          <section>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              EDITORIAL APPRAISAL
            </span>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">Tool Overview</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              {tool.overview ? (
                tool.overview.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>{tool.description}</p>
              )}
            </div>
          </section>

          {/* Key Features (2x2 grid) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  CAPABILITIES
                </span>
                <h2 className="text-2xl font-bold text-slate-950">Key Features</h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                All specifications verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <h3 className="font-bold text-slate-950 text-sm mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {feature.linkText && (
                    <span className="text-[11px] font-semibold text-slate-700 hover:text-slate-950 cursor-pointer pt-2 inline-flex items-center gap-1">
                      {feature.linkText}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Best For Audience */}
          <section>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              IDEAL TARGET AUDIENCE
            </span>
            <h2 className="text-2xl font-bold text-slate-950 mb-4">Best For</h2>

            <div className="space-y-3">
              {tool.bestFor?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#f8fafd] border border-slate-200/80 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getAudienceIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Breakdown */}
          {tool.pricingTiers && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    PLANS &amp; LICENSING
                  </span>
                  <h2 className="text-2xl font-bold text-slate-950">Pricing Breakdown</h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Billed Annually
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border flex flex-col justify-between relative ${
                      tier.popular
                        ? 'border-slate-950 bg-white shadow-md'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
                        MOST POPULAR
                      </div>
                    )}

                    <div>
                      <h4 className="font-bold text-slate-950 text-base">{tier.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 mb-4">{tier.description}</p>

                      <div className="flex items-baseline gap-1 mb-5">
                        <span className="text-3xl font-extrabold text-slate-950">{tier.price}</span>
                        <span className="text-xs text-slate-500">{tier.period}</span>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-600 mb-6">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-slate-950 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        tier.popular
                          ? 'bg-slate-950 hover:bg-slate-800 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Quick Facts, Community Resources, Alternatives */}
        <aside className="space-y-8">
          {/* Quick Facts */}
          {tool.quickFacts && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-950 text-sm mb-4 pb-3 border-b border-slate-100">
                Quick Facts
              </h3>
              <dl className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Developer</dt>
                  <dd className="font-semibold text-slate-900">{tool.quickFacts.developer}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Initial Release</dt>
                  <dd className="font-semibold text-slate-900">{tool.quickFacts.initialRelease}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Primary Formats</dt>
                  <dd className="font-semibold text-slate-900">{tool.quickFacts.primaryFormats}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Offline Support</dt>
                  <dd className="font-semibold text-slate-900">{tool.quickFacts.offlineSupport}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-400">Community Ecosystem</dt>
                  <dd className="font-semibold text-slate-900">{tool.quickFacts.communityEcosystem}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Community & Resources */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-950 text-sm mb-4 pb-3 border-b border-slate-100">
              Community &amp; Resources
            </h3>
            <ul className="space-y-2.5 text-xs">
              {tool.resources ? (
                tool.resources.map((res, i) => (
                  <li key={i}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span>{res.title}</span>
                      <span className="text-slate-400 font-mono">+</span>
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span>Official Documentation</span>
                      <span className="text-slate-400 font-mono">+</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                    >
                      <span>Community Files &amp; Plugins</span>
                      <span className="text-slate-400 font-mono">+</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Related Alternatives */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-950 text-sm mb-4 pb-3 border-b border-slate-100">
              Related Alternatives
            </h3>
            <div className="space-y-3">
              {alternatives.map((alt) => (
                <div
                  key={alt!.id}
                  onClick={() => navigate(`/tools/${alt!.slug}`)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <ToolLogo name={alt!.logo} size="sm" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs group-hover:text-slate-950">
                        {alt!.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {alt!.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 group-hover:text-slate-950 transition-colors">
                    View
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
