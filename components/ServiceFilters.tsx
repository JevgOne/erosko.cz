'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ServiceFiltersProps {
  pageType: 'holky-na-sex' | 'eroticke-masaze' | 'bdsm' | 'online-sex';
}

export default function ServiceFilters({ pageType }: ServiceFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentServices = searchParams.get('services')?.split(',') || [];

  // Define services by category
  const servicesByCategory = {
    'holky-na-sex': [
      { id: 'escort', label: 'Escort' },
      { id: 'gfe', label: 'GFE' },
      { id: 'dinner-date', label: 'Dinner date' },
      { id: 'overnight', label: 'Overnight' },
      { id: 'striptyz', label: 'Striptýz' },
      { id: 'tanec', label: 'Erotický tanec' },
      { id: 'sprcha', label: 'Společná sprcha' },
      { id: 'foot-fetish', label: 'Foot fetish' },
      { id: 'roleplay', label: 'Roleplay' },
      { id: 'hluboky-oral', label: 'Hluboký orál' },
      { id: 'klasika', label: 'Klasika' },
      { id: 'oral', label: 'Orál' },
      { id: 'anal', label: 'Anální sex' },
      { id: 'lesbi', label: 'Lesbi show' },
      { id: 'polykani', label: 'Polykání' },
      { id: '69', label: '69' },
      { id: 'rimming', label: 'Rimming' },
      { id: 'CIM', label: 'CIM' },
      { id: 'COF', label: 'COF' },
      { id: 'french-kiss', label: 'French kiss' },
    ],
    'eroticke-masaze': [
      { id: 'klasicka', label: 'Klasická masáž' },
      { id: 'eroticka', label: 'Erotická masáž' },
      { id: 'tantricka', label: 'Tantrická masáž' },
      { id: 'happy-end', label: 'Happy end' },
      { id: 'body-to-body', label: 'Body to body' },
      { id: 'nuru', label: 'Nuru masáž' },
      { id: 'thajska', label: 'Thajská masáž' },
      { id: 'prostaticka', label: 'Prostatická masáž' },
      { id: 'parovka', label: 'Masáž pro páry' },
      { id: 'relaxacni', label: 'Relaxační masáž' },
    ],
    'bdsm': [
      { id: 'bondage', label: 'Bondage' },
      { id: 'domina', label: 'Domina' },
      { id: 'submisivni', label: 'Submisivní' },
      { id: 'spanking', label: 'Spanking' },
      { id: 'roleplay-bdsm', label: 'Roleplay BDSM' },
      { id: 'fetish', label: 'Fetish' },
      { id: 'wax-play', label: 'Wax play' },
      { id: 'humiliation', label: 'Humiliation' },
    ],
    'online-sex': [
      { id: 'videochat', label: 'Videochat' },
      { id: 'sexting', label: 'Sexting' },
      { id: 'custom-content', label: 'Custom obsah' },
      { id: 'cam-show', label: 'Cam show' },
      { id: 'onlyfans', label: 'OnlyFans' },
    ],
  };

  const services = servicesByCategory[pageType] || [];

  const toggleService = (serviceId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    let newServices: string[];
    if (currentServices.includes(serviceId)) {
      newServices = currentServices.filter(s => s !== serviceId);
    } else {
      newServices = [...currentServices, serviceId];
    }

    if (newServices.length > 0) {
      params.set('services', newServices.join(','));
    } else {
      params.delete('services');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('services');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (services.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Služby</h3>
        {currentServices.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Zrušit vše
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {services.map((service) => {
          const isActive = currentServices.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {service.label}
            </button>
          );
        })}
      </div>

      {currentServices.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400">
            Vybrané služby: <span className="text-white font-medium">{currentServices.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}
