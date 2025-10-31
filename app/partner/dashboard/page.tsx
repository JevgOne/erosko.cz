'use client';

import {
  Eye,
  Phone,
  Star,
  TrendingUp,
  Calendar,
  Heart,
  MessageSquare,
  Sparkles,
  FileText,
  Zap,
  Crown,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PartnerDashboard() {
  // TODO: V reálné aplikaci získat z API/databáze
  const accountType = 'solo' as 'solo' | 'business'; // nebo 'business'
  const subscriptionLevel: 1 | 2 | 3 = 2; // FREE, Premium, VIP
  const currentCredits = 20; // TODO: Z API (Solo Premium = 20, Solo VIP = 60, Business Premium = 100, Business VIP = 250)

  // Pro solo: osobní jméno, pro podnik: název podniku
  const accountName = accountType === 'solo' ? 'Kristýno' : 'Salon Paradise';

  // State pro boost
  const [selectedProfileForBoost, setSelectedProfileForBoost] = useState('0');

  // Aktivní boosty (TODO: Z API)
  const activeBoosts: any[] = [
    // { profileName: 'Kristýna, 24', type: 'top', expiresAt: '2025-10-30T14:30:00' }
  ];

  const stats = [
    {
      icon: Eye,
      label: 'Zobrazení profilu',
      value: '3,458',
      change: '+15%',
      trend: 'up'
    },
    {
      icon: Phone,
      label: 'Kliknutí na telefon',
      value: '127',
      change: '+8%',
      trend: 'up'
    },
    {
      icon: Star,
      label: 'Průměrné hodnocení',
      value: '4.8',
      change: '+0.2',
      trend: 'up'
    },
    {
      icon: Heart,
      label: 'Oblíbené',
      value: '234',
      change: '+12%',
      trend: 'up'
    },
  ];

  // Pro solo: 1 profil, pro podnik: více profilů
  const myProfiles = accountType === 'solo'
    ? [
        {
          name: 'Kristýna, 24',
          status: 'active',
          views: '3,458',
          rating: '4.8',
          verified: true
        }
      ]
    : [
        {
          name: 'Michaela, 22',
          status: 'active',
          views: '5,234',
          rating: '4.9',
          verified: true
        },
        {
          name: 'Lucie, 26',
          status: 'active',
          views: '4,127',
          rating: '4.7',
          verified: true
        },
        {
          name: 'Natálie, 23',
          status: 'active',
          views: '3,891',
          rating: '4.8',
          verified: false
        }
      ];

  const recentActivity = [
    { type: 'view', text: 'Nové zobrazení profilu', time: 'Před 5 minutami' },
    { type: 'call', text: 'Kliknutí na váš telefon', time: 'Před 15 minutami' },
    { type: 'favorite', text: 'Přidáno do oblíbených', time: 'Před 1 hodinou' },
    { type: 'review', text: 'Nová recenze (5 hvězdiček)', time: 'Před 3 hodinami' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Vítejte zpět, {accountName}!
          </h1>
          <p className="text-gray-400">
            {accountType === 'solo'
              ? 'Přehled vašeho profilu a statistik'
              : 'Přehled vašich profilů a statistik podniku'
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Kredity badge */}
          <div className="glass px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm text-gray-400">Kredity:</span>
            <span className="ml-2 text-lg font-bold gradient-text">5</span>
          </div>

          {/* Vytvořit profil - pouze pro podniky */}
          {accountType === 'business' && (
            <Link
              href="/partner/profiles/new"
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Přidat profil
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Boost Section */}
      <div className="glass rounded-2xl p-6 border border-primary-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Rychlé topování
            </h2>
            <p className="text-gray-400 text-sm">
              Zvyšte viditelnost svého profilu jedním kliknutím
            </p>
          </div>
          <Link
            href="/partner/boost"
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Pokročilé možnosti →
          </Link>
        </div>

        {/* Aktivní boosty */}
        {activeBoosts.length > 0 && (
          <div className="mb-6 p-4 bg-dark-800/50 rounded-xl border border-green-500/30">
            <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Aktivní boosty
            </h3>
            <div className="space-y-2">
              {activeBoosts.map((boost, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{boost.profileName}</span>
                  <span className="text-yellow-400 font-semibold">
                    {boost.type === 'top' ? 'TOP pozice' : boost.type === 'highlight' ? 'Zvýraznění' : 'Obnovení'}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Zbývá {Math.round((new Date(boost.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boost formulář */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile selector - pouze pro podniky */}
          {accountType === 'business' && (
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Vyberte profil:
              </label>
              <select
                value={selectedProfileForBoost}
                onChange={(e) => setSelectedProfileForBoost(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500"
              >
                {myProfiles.map((profile, index) => (
                  <option key={index} value={index}>{profile.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Boost tlačítka */}
          <div className={accountType === 'business' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Vyberte typ boostu:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Basic TOP */}
              <button
                disabled={currentCredits < 1}
                className={`p-4 rounded-xl border transition-all text-left ${
                  currentCredits >= 1
                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20'
                    : 'bg-dark-800/30 border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">Basic TOP</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold">1 kredit</span>
                </div>
                <p className="text-xs text-gray-400">24 hodin • 2x více zobrazení</p>
              </button>

              {/* Premium TOP */}
              <button
                disabled={currentCredits < 2}
                className={`p-4 rounded-xl border transition-all text-left ${
                  currentCredits >= 2
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-dark-800/30 border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="font-bold">Premium TOP</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold">2 kredity</span>
                </div>
                <p className="text-xs text-gray-400">24 hodin • 3x více zobrazení</p>
              </button>

              {/* VIP TOP */}
              <button
                disabled={currentCredits < 3}
                className={`p-4 rounded-xl border transition-all text-left ${
                  currentCredits >= 3
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20'
                    : 'bg-dark-800/30 border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">VIP TOP</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold">3 kredity</span>
                </div>
                <p className="text-xs text-gray-400">24 hodin • 5x více zobrazení</p>
              </button>
            </div>
          </div>
        </div>

        {/* Info text */}
        {currentCredits < 2 && (
          <div className="mt-4 p-3 bg-dark-800/50 rounded-lg border border-yellow-500/20">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Nemáte dostatek kreditů?{' '}
              <Link href="/partner/boost" className="text-primary-400 hover:text-primary-300 font-semibold">
                Koupit kredity
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* My Profiles */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-400" />
            Moje profily
          </h2>
          <Link href="/partner/profiles" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
            Zobrazit vše
          </Link>
        </div>
        <div className="space-y-3">
          {myProfiles.map((profile, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-dark-800/30 rounded-xl border border-white/10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-pink-500/20"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{profile.name}</h3>
                  {profile.verified && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                      Ověřeno
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                    Aktivní
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {profile.views} zobrazení
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    {profile.rating}
                  </span>
                </div>
              </div>
              <Link
                href={`/partner/profiles/${index + 1}`}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm font-medium"
              >
                Upravit
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Poslední aktivita
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-dark-800/30 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'view' && <Eye className="w-4 h-4" />}
                  {activity.type === 'call' && <Phone className="w-4 h-4" />}
                  {activity.type === 'favorite' && <Heart className="w-4 h-4" />}
                  {activity.type === 'review' && <Star className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Card */}
        <div className="glass rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-primary-500/10 to-pink-500/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Zvyšte svou viditelnost!</h2>
              <p className="text-gray-400 mb-4">
                Propagujte svůj profil s prémiovou reklamou a získejte až 3x více klientů.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span>TOP umístění na hlavní stránce</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span>Zvýrazněný profil ve výsledcích</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span>Detailní statistiky</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  <span>Prémiový badge</span>
                </li>
              </ul>
              <Link
                href="/partner/promotion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
              >
                Zjistit více
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Zobrazení v čase */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Zobrazení profilu (30 dní)
          </h2>
          <div className="h-64 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-white/5"></div>
              ))}
            </div>

            {/* Chart area with smooth curve */}
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <path
                d="M 0,200 L 0,120 Q 50,80 100,90 T 200,70 T 300,85 T 400,60 T 500,75 T 600,55 T 700,65 T 800,45 L 800,200 Z"
                fill="url(#chartGradient)"
                className="opacity-50"
              />

              {/* Line */}
              <path
                d="M 0,120 Q 50,80 100,90 T 200,70 T 300,85 T 400,60 T 500,75 T 600,55 T 700,65 T 800,45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                className="drop-shadow-lg"
              />

              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
              <span>1. 12.</span>
              <span>15. 12.</span>
              <span>31. 12.</span>
            </div>
          </div>
        </div>

        {/* Doughnut Chart - Zdroje návštěvnosti */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary-400" />
            Zdroje návštěvnosti
          </h2>
          <div className="flex items-center justify-center gap-8 h-64">
            {/* Doughnut Chart */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="40"
                />

                {/* Přímý vstup - 55% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgb(236, 72, 153)"
                  strokeWidth="40"
                  strokeDasharray="276 502"
                  strokeDashoffset="0"
                  className="transition-all duration-500"
                />

                {/* Vyhledávače - 35% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgb(139, 92, 246)"
                  strokeWidth="40"
                  strokeDasharray="175 502"
                  strokeDashoffset="-276"
                  className="transition-all duration-500"
                />

                {/* Odkazy z jiných stránek - 10% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="40"
                  strokeDasharray="50 502"
                  strokeDashoffset="-451"
                  className="transition-all duration-500"
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">3,458</span>
                <span className="text-sm text-gray-400">celkem</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-pink-500"></div>
                <div>
                  <p className="text-sm font-semibold">Přímý vstup</p>
                  <p className="text-xs text-gray-400">1,902 (55%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-purple-500"></div>
                <div>
                  <p className="text-sm font-semibold">Vyhledávače</p>
                  <p className="text-xs text-gray-400">1,210 (35%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <div>
                  <p className="text-sm font-semibold">Odkazy</p>
                  <p className="text-xs text-gray-400">346 (10%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart - Srovnání metrik */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-400" />
          Týdenní přehled
        </h2>
        <div className="grid grid-cols-7 gap-3 h-64 items-end">
          {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((day, i) => {
            const heights = [65, 48, 72, 58, 81, 92, 78];
            return (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className="w-full relative group cursor-pointer">
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-pink-500 rounded-t-lg transition-all hover:from-primary-400 hover:to-pink-400"
                    style={{ height: `${heights[i] * 2}px` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {Math.round(heights[i] * 5)} zobrazení
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
