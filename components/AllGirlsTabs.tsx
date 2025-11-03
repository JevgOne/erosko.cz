'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, CheckCircle, Heart, Phone } from 'lucide-react';
import Link from 'next/link';

// Profile types with their colors - map to Prisma ProfileType enum
const profileTypes: Record<string, { color: string }> = {
  SOLO: { color: 'bg-purple-500' },
  PRIVAT: { color: 'bg-indigo-500' },
  MASSAGE_SALON: { color: 'bg-teal-500' },
  ESCORT_AGENCY: { color: 'bg-pink-500' },
  DIGITAL_AGENCY: { color: 'bg-blue-500' },
  SWINGERS_CLUB: { color: 'bg-red-500' },
  NIGHT_CLUB: { color: 'bg-orange-500' },
  STRIP_CLUB: { color: 'bg-yellow-500' },
};

export default function AllGirlsTabs() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/profiles?limit=18'); // Načíst prvních 18 profilů
      if (response.ok) {
        const data = await response.json();
        setProfiles(data.profiles || []);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Všechny erotické profily</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Prohlédněte si naše ověřené profily
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  if (profiles.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Všechny erotické profily</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Prohlédněte si naše ověřené profily
            </p>
          </div>
          <div className="text-center text-gray-400">
            Zatím nejsou k dispozici žádné schválené profily
          </div>
        </div>
      </section>
    );
  }

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
          {profiles.map((profile) => {
            // Get first photo or use placeholder
            const mainPhoto = profile.photos && profile.photos.length > 0
              ? profile.photos.find((p: any) => p.isMain)?.url || profile.photos[0]?.url
              : '/placeholder-profile.jpg';

            // Get profile type color
            const profileType = profile.profileType || 'SOLO';
            const typeColor = profileTypes[profileType]?.color || 'bg-purple-500';

            // Format category display name
            const categoryDisplay = profile.category?.replace('_', ' ') || 'Escort';

            return (
              <Link
                key={profile.id}
                href={`/divky/${profile.slug}`}
                className="glass rounded-2xl overflow-hidden card-hover group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-dark-800">
                  {/* Profile Image */}
                  <img
                    src={mainPhoto}
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-profile.jpg';
                    }}
                  />
                  {/* Placeholder with gradient (fallback) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 mix-blend-overlay"></div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {profile.isNew && (
                      <span className="bg-blue-500 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        Nový
                      </span>
                    )}
                    {profile.viewCount > 100 && (
                      <span className="bg-orange-500 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-0.5">
                        <span className="text-[9px]">🔥</span>
                        <span>Populární</span>
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Add to favorites functionality
                    }}
                    className="absolute top-2 right-2 z-10 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </button>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Profile Type Badge - Large */}
                  <div className="mb-2">
                    <span className={`${typeColor} px-2 py-1 rounded-md text-xs font-bold inline-block truncate max-w-full`}>
                      {profileType === 'SOLO' ? 'SOLO' : profileType.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold mb-1 truncate flex items-center gap-1">
                    {profile.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    <span>{profile.name}, {profile.age}</span>
                    {/* Online Status - můžeš implementovat později */}
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-gray-500"></span>
                  </h3>

                  <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{profile.city}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-400 mb-2">
                    <Phone className="w-3 h-3" />
                    <span className="truncate">{profile.phone}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full font-semibold truncate">
                      {categoryDisplay}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                      <span className="font-medium">{profile.rating?.toFixed(1) || '5.0'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
