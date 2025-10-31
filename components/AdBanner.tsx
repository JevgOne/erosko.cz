'use client';

import { ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

type BannerSize = 'horizontal' | 'vertical' | 'square' | 'large-horizontal';

interface AdBannerProps {
  size: BannerSize;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  imagePlaceholder?: string;
  featured?: boolean;
}

export default function AdBanner({
  size,
  title = "Propagujte svůj profil",
  description = "Získejte více klientů s prémiovou reklamou",
  ctaText = "Více informací",
  ctaUrl = "#",
  imagePlaceholder = "Zde může být vaše reklama",
  featured = false
}: AdBannerProps) {

  const sizeClasses = {
    'horizontal': 'w-full h-24 md:h-28',
    'large-horizontal': 'w-full h-40 md:h-48',
    'vertical': 'w-full md:w-80 h-96',
    'square': 'w-full aspect-square max-w-sm'
  };

  return (
    <Link
      href={ctaUrl}
      className={`group relative overflow-hidden rounded-xl glass ${sizeClasses[size]} flex items-center justify-center border border-white/5 hover:border-white/10 transition-all`}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-pink-500/5 group-hover:from-primary-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-3 flex items-center justify-center gap-4">
        {featured && (
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3 h-3" />
            PREMIUM
          </div>
        )}

        <h3 className="text-base md:text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">
          {title}
        </h3>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 group-hover:text-white transition-all">
          {ctaText}
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      {/* Corner badge for ad label */}
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-500">
        Reklama
      </div>
    </Link>
  );
}
