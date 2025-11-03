'use client';

import { useState } from 'react';
import { Star, MapPin, CheckCircle, Phone, Building2, Users, Clock } from 'lucide-react';
import Link from 'next/link';

// Profile types with their colors
const profileTypes = {
  solo: { color: 'bg-purple-500' },
  privat: { color: 'bg-indigo-500' },
  salon: { color: 'bg-teal-500' },
  escort_agency: { color: 'bg-pink-500' },
  digital_agency: { color: 'bg-blue-500' },
  swingers_club: { color: 'bg-red-500' },
  night_club: { color: 'bg-orange-500' },
  strip_club: { color: 'bg-yellow-500' },
};

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  category: string;
  rating: number;
  reviews: number;
  verified: boolean;
  isNew: boolean;
  isPopular: boolean;
  profileType: keyof typeof profileTypes;
  businessName: string | null;
  phone: string;
  isOnline: boolean;
  image: string;
}

interface BusinessGridProps {
  profiles: Profile[];
  title?: string;
  description?: string;
}

export default function BusinessGrid({ profiles, title, description }: BusinessGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 18; // 18 business cards per page

  // Group profiles by business
  const businesses = profiles.reduce((acc, profile) => {
    const businessName = profile.businessName || profile.name;
    if (!acc[businessName]) {
      acc[businessName] = {
        name: businessName,
        slug: (profile as any).slug, // Add slug from profile
        location: profile.location,
        phone: profile.phone,
        rating: profile.rating,
        reviews: profile.reviews,
        verified: profile.verified,
        isNew: profile.isNew,
        isPopular: profile.isPopular,
        profileType: profile.profileType,
        category: profile.category,
        photos: (profile as any).photos || [], // Add photos from profile
        profiles: []
      };
    }
    acc[businessName].profiles.push(profile);
    return acc;
  }, {} as Record<string, any>);

  const businessList = Object.values(businesses);

  // Calculate pagination
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = businessList.slice(indexOfFirstBusiness, indexOfLastBusiness);
  const totalPages = Math.ceil(businessList.length / businessesPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {description && (
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Business Grid - větší kartičky */}
        {businessList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBusinesses.map((business, index) => (
              <Link
                key={index}
                href={`/podnik/${business.slug || business.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="glass rounded-3xl overflow-hidden card-hover group"
              >
                {/* Image Container - vyšší než u běžných profilů */}
                <div className="relative h-80 overflow-hidden bg-dark-800">
                  {/* Business Photo */}
                  {(business as any).photos && (business as any).photos.length > 0 ? (
                    <img
                      src={(business as any).photos[0].url}
                      alt={business.name}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    /* Placeholder with gradient */
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                  )}

                  {/* Business Type Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`${(profileTypes as any)[business.profileType]?.color || 'bg-gray-500'} px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center justify-center gap-1`}>
                      <Building2 className="w-3 h-3" />
                      {business.profileType === 'salon'
                        ? 'Masážní salon'
                        : business.profileType === 'privat'
                        ? 'Privát'
                        : business.profileType === 'escort_agency'
                        ? 'Escort Agentura'
                        : business.profileType === 'digital_agency'
                        ? 'Digitální agentura'
                        : 'PODNIK'
                      }
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    {business.verified && (
                      <span className="bg-green-500 px-2 py-1 rounded-full text-[10px] font-semibold inline-flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Ověřeno
                      </span>
                    )}
                    {business.isNew && (
                      <span className="bg-blue-500 px-2 py-1 rounded-full text-[10px] font-semibold inline-flex items-center justify-center">
                        Nový
                      </span>
                    )}
                    {business.isPopular && (
                      <span className="bg-orange-500 px-2 py-1 rounded-full text-[10px] font-semibold inline-flex items-center justify-center gap-1">
                        🔥 Top
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

                  {/* Business Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="text-sm font-bold text-white">{business.rating}</span>
                        <span className="text-xs text-gray-300">({business.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Users className="w-3 h-3 text-white" />
                        <span className="text-xs text-white font-medium">{business.profiles.length} Dívek</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content - více prostoru pro business info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {business.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{business.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{business.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-green-400 font-medium">Otevřeno 9:00 - 22:00</span>
                  </div>

                  {/* Category Badge */}
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-xs px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full inline-flex items-center justify-center">
                      {business.profileType === 'salon'
                        ? 'Erotické masáže'
                        : business.profileType === 'privat'
                        ? 'Holky na sex'
                        : business.profileType === 'escort_agency'
                        ? 'Holky na escort'
                        : business.profileType === 'digital_agency'
                        ? 'Digitální služby'
                        : business.category
                      }
                    </span>
                  </div>

                  {/* View Profiles Button */}
                  <div className="mt-4">
                    <div className="w-full text-center py-2 bg-gradient-to-r from-primary-500/20 to-pink-500/20 rounded-xl text-sm font-semibold group-hover:from-primary-500/30 group-hover:to-pink-500/30 transition-all">
                      Zobrazit profily →
                    </div>
                  </div>
                </div>
              </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="glass px-4 py-2 rounded-lg glass-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Předchozí
                </button>

                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-400">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'gradient-primary'
                          : 'glass glass-hover'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="glass px-4 py-2 rounded-lg glass-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Další
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Žádné podniky nenalezeny v této kategorii</p>
          </div>
        )}
      </div>
    </section>
  );
}
