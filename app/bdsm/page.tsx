'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchWithMap from '@/components/SearchWithMap';
import ProfileGrid from '@/components/ProfileGrid';
import { profiles } from '@/components/TopProfiles';
import { Flame } from 'lucide-react';

export default function BDSMPage() {

  // Filter profiles for "Domina" category
  let bdsmProfiles = profiles.filter(profile => profile.category === 'Domina');

  // Apply city filter if present

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
              <Flame className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium">{bdsmProfiles.length} aktivních profilů</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">BDSM & Speciální</span>
            </h1>
            <p className="text-xl text-gray-400">
              BDSM, fetish a dominance služby s ověřenými profily
            </p>
          </div>

          {/* Search With Map */}
          <SearchWithMap cityPrefix="BDSM" pageType="bdsm" />
        </div>
      </section>

      {/* Display filtered profiles */}
      <ProfileGrid profiles={bdsmProfiles} />

      <Footer />
    </main>
  );
}
