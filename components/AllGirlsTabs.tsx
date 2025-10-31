'use client';

import { Star, MapPin, CheckCircle, Heart, Phone } from 'lucide-react';
import Link from 'next/link';
import { profiles } from './TopProfiles';

// Profile types with their colors
const profileTypes = {
  solo: { color: 'bg-purple-500' },
  privat: { color: 'bg-indigo-500' },
  salon: { color: 'bg-teal-500' },
  escort_agency: { color: 'bg-pink-500' },
  digital_agency: { color: 'bg-blue-500', label: 'Digitální Agentura' },
  swingers_club: { color: 'bg-red-500', label: 'Swingers klub' },
  night_club: { color: 'bg-orange-500', label: 'Night Club' },
  strip_club: { color: 'bg-yellow-500' },
};

// Přidat boostLevel prvním 18 profilům
const girlsWithBoost = profiles.slice(0, 18).map((profile, index) => ({
  ...profile,
  boostLevel:
    index < 3 ? 'vip' :       // První 3 = VIP
    index < 7 ? 'premium' :   // Další 4 = Premium
    index < 11 ? 'basic' :    // Další 4 = Basic
    null                       // Zbytek = bez boostu
}));

// Seřadit podle boost levelu
const sortedGirls = [...girlsWithBoost].sort((a, b) => {
  const boostOrder = { vip: 3, premium: 2, basic: 1, null: 0 };
  return (boostOrder[b.boostLevel as keyof typeof boostOrder] || 0) -
         (boostOrder[a.boostLevel as keyof typeof boostOrder] || 0);
});

export default function AllGirlsTabs() {
  // Všechny dívky - seřazené podle boost levelu
  const girls = sortedGirls;

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Všechny erotické profily</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Prohlédněte si naše ověřené profily
          </p>
        </div>

        {/* Grid - 6 columns on xl */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {girls.map((girl) => (
            <Link
              key={girl.id}
              href={`/profil/${girl.id}`}
              className="glass rounded-2xl overflow-hidden card-hover group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-dark-800">
                {/* Profile Image */}
                <img
                  src={girl.image}
                  alt={girl.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Placeholder with gradient (fallback) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 mix-blend-overlay"></div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {girl.isNew && (
                    <span className="bg-blue-500 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                      Nový
                    </span>
                  )}
                  {girl.isPopular && (
                    <span className="bg-orange-500 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-0.5">
                      <span className="text-[9px]">🔥</span>
                      <span>Populární</span>
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-2 right-2 z-10 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Profile Type Badge - Large */}
                <div className="mb-2">
                  <span className={`${profileTypes[girl.profileType].color} px-2 py-1 rounded-md text-xs font-bold inline-block truncate max-w-full`}>
                    {girl.profileType === 'solo'
                      ? 'SOLO'
                      : girl.profileType === 'salon'
                      ? `Salon ${girl.businessName}`
                      : girl.profileType === 'privat'
                      ? `Privát ${girl.businessName}`
                      : girl.profileType === 'escort_agency'
                      ? girl.businessName
                      : girl.businessName
                    }
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-1 truncate flex items-center gap-1">
                  {girl.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                  <span>{girl.name}, {girl.age}</span>
                  {/* Online Status */}
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${girl.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                </h3>

                <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{girl.location}</span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-gray-400 mb-2">
                  <Phone className="w-3 h-3" />
                  <span className="truncate">{girl.phone}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full font-semibold">
                    {girl.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                    <span className="font-medium">{girl.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
