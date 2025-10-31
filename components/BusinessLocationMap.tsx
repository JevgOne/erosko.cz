'use client';

import { MapPin } from 'lucide-react';

interface BusinessLocationMapProps {
  businessName: string;
  location: string;
  fullAddress?: string;
}

export default function BusinessLocationMap({ businessName, location, fullAddress }: BusinessLocationMapProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary-400" />
        Kde nás najdete
      </h3>

      {/* Address Display */}
      <div className="mb-4 p-4 bg-dark-800/50 rounded-xl border border-white/5">
        <p className="text-sm text-gray-400 mb-1">Adresa</p>
        <p className="text-lg font-semibold">{fullAddress || location}</p>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="relative h-80 rounded-xl overflow-hidden bg-dark-800 border border-white/10">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-pink-500/10"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>

        {/* Center Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Pulsing Circle */}
            <div className="absolute -inset-8 bg-primary-500/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-4 bg-primary-500/40 rounded-full"></div>

            {/* Main Marker */}
            <div className="relative bg-gradient-to-br from-primary-500 to-pink-500 p-4 rounded-full shadow-2xl">
              <MapPin className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold mb-1">{businessName}</p>
              <p className="text-sm text-gray-400">{fullAddress || location}</p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress || location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-pink-500 rounded-lg text-sm font-semibold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Navigovat →
            </a>
          </div>
        </div>

        {/* Optional: Integration info */}
        <div className="absolute top-4 right-4">
          <div className="glass px-3 py-1.5 rounded-lg text-xs">
            <span className="text-gray-400">📍 Sex mapa</span>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-dark-800/50 p-3 rounded-xl border border-white/5 text-center">
          <p className="text-xs text-gray-400 mb-1">Oblast</p>
          <p className="font-semibold">{location}</p>
        </div>
        <div className="bg-dark-800/50 p-3 rounded-xl border border-white/5 text-center">
          <p className="text-xs text-gray-400 mb-1">Parkování</p>
          <p className="font-semibold text-green-400">Dostupné</p>
        </div>
      </div>
    </div>
  );
}
