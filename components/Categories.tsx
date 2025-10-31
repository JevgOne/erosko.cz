'use client';

import { Sparkles, Heart, Home, Building2, Flame, Video, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'masaze',
    name: 'Erotické masáže',
    description: 'Profesionální masérky a maséři',
    icon: Sparkles,
    count: 487,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
  {
    id: 'escort',
    name: 'Escort & Sex',
    description: 'Escort služby a doprovod',
    icon: Heart,
    count: 892,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
  {
    id: 'privaty',
    name: 'Priváty',
    description: 'Soukromé byty a prostory',
    icon: Home,
    count: 234,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'podniky',
    name: 'Podniky & Kluby',
    description: 'Erotické kluby a salony',
    icon: Building2,
    count: 156,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
  },
  {
    id: 'bdsm',
    name: 'BDSM & Speciální',
    description: 'BDSM, fetish a dominance',
    icon: Flame,
    count: 178,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'digital',
    name: 'Digitální služby',
    description: 'Online shows a custom obsah',
    icon: Video,
    count: 312,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'agentury',
    name: 'Agentury',
    description: 'Profesionální escort agentury',
    icon: Users,
    count: 67,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
];

export default function Categories() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Procházet podle kategorie</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Objevte <span className="gradient-text">perfektní službu</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vyberte si z našich kategorií a najděte přesně to, co hledáte
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className={`glass border ${category.borderColor} rounded-2xl p-6 card-hover group relative overflow-hidden`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {category.count} profilů
                </p>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/kategorie"
            className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-xl glass-hover font-medium"
          >
            <span>Zobrazit všechny kategorie</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
