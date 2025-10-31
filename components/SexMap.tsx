'use client';

import { useState } from 'react';
import { MapPin, Users } from 'lucide-react';

const regions = [
  { id: 'praha', name: 'Praha', count: 892, x: 50, y: 50 },
  { id: 'brno', name: 'Brno', count: 456, x: 65, y: 65 },
  { id: 'ostrava', name: 'Ostrava', count: 312, x: 82, y: 35 },
  { id: 'plzen', name: 'Plzeň', count: 234, x: 35, y: 55 },
  { id: 'liberec', name: 'Liberec', count: 187, x: 58, y: 30 },
  { id: 'olomouc', name: 'Olomouc', count: 156, x: 72, y: 50 },
  { id: 'ceske-budejovice', name: 'České Budějovice', count: 145, x: 45, y: 75 },
  { id: 'hradec-kralove', name: 'Hradec Králové', count: 134, x: 62, y: 42 },
  { id: 'pardubice', name: 'Pardubice', count: 123, x: 65, y: 48 },
  { id: 'zlin', name: 'Zlín', count: 112, x: 72, y: 62 },
  { id: 'karlovy-vary', name: 'Karlovy Vary', count: 98, x: 25, y: 45 },
  { id: 'usti-nad-labem', name: 'Ústí nad Labem', count: 87, x: 42, y: 35 },
];

export default function SexMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getRegionData = (id: string) => {
    return regions.find(r => r.id === id);
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Vyberte město na mapě
        </h3>
        <p className="text-gray-400">
          Klikněte na město a objevte dostupné profily ve vaší oblasti
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 rounded-3xl p-8 relative aspect-[4/3]">
            {/* SVG Map with Pins */}
            <div className="relative w-full h-full">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  {/* Pin */}
                  <div
                    className={`relative transition-all duration-300 ${
                      hoveredRegion === region.id || selectedRegion === region.id
                        ? 'scale-125'
                        : ''
                    }`}
                  >
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20"></div>

                    {/* Pin Icon */}
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        selectedRegion === region.id
                          ? 'bg-primary-500 shadow-lg shadow-primary-500/50'
                          : hoveredRegion === region.id
                          ? 'bg-primary-400'
                          : 'bg-white/10 backdrop-blur-xl'
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 ${
                          selectedRegion === region.id || hoveredRegion === region.id
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>

                    {/* Tooltip */}
                    {(hoveredRegion === region.id || selectedRegion === region.id) && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
                        <div className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-xl text-sm font-medium">
                          <div className="font-semibold">{region.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Users className="w-3 h-3" />
                            {region.count} profilů
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-white transform rotate-45 mx-auto -mt-1"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Background decorative elements */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 30,30 L 70,30 L 70,70 L 30,70 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cities List */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-3xl p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Města</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {regions
                .sort((a, b) => b.count - a.count)
                .map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      selectedRegion === region.id
                        ? 'bg-primary-500 text-white'
                        : hoveredRegion === region.id
                        ? 'bg-white/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">{region.name}</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        selectedRegion === region.id
                          ? 'text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>{region.count}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setSelectedRegion(null)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all"
          >
            <span>Zobrazit profily v {getRegionData(selectedRegion)?.name}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
