'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { Building2, Phone, Mail, Globe, MapPin, Clock, Plus, X } from 'lucide-react';

export default function PridatPodnikPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    profileType: '',
  });

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/prihlaseni');
    return null;
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-dark-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Načítání...</p>
          </div>
        </div>
      </main>
    );
  }

  const businessTypes = [
    { value: 'PRIVAT', label: 'Erotický privát' },
    { value: 'MASSAGE_SALON', label: 'Salon erotických masáží' },
    { value: 'ESCORT_AGENCY', label: 'Escort agentura' },
    { value: 'DIGITAL_AGENCY', label: 'Digitální agentura (Online)' },
    { value: 'SWINGERS_CLUB', label: 'Swingers klub' },
    { value: 'NIGHT_CLUB', label: 'Night Club' },
    { value: 'STRIP_CLUB', label: 'Strip Club' },
  ];

  const cities = ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'České Budějovice', 'Hradec Králové'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.city || !formData.profileType) {
      alert('Vyplňte prosím všechny povinné údaje');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/businesses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Podnik úspěšně vytvořen!');
        router.push('/inzerent_dashboard');
      } else {
        alert(data.error || 'Chyba při vytváření podniku');
      }
    } catch (error) {
      console.error('Error creating business:', error);
      alert('Něco se pokazilo. Zkuste to prosím znovu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-900">
      <Header />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium">Přidat nový podnik</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Vytvořit další podnik</span>
              </h1>
              <p className="text-xl text-gray-400">
                Přidejte další podnik ke svému účtu
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              {/* Typ podniku */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Typ podniku <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.profileType}
                  onChange={(e) => setFormData({ ...formData, profileType: e.target.value })}
                  className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                  required
                >
                  <option value="">Vyberte typ podniku</option>
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Název podniku */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Název podniku <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. Salon Paradise"
                    className="w-full bg-dark-800 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Popis */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Popis podniku
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Krátký popis vašeho podniku..."
                  rows={4}
                  className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                />
              </div>

              {/* Kontaktní údaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+420 123 456 789"
                      className="w-full bg-dark-800 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email (volitelný)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@salon.cz"
                      className="w-full bg-dark-800 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Web */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Webové stránky (volitelné)
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://www.vasepodniky.cz"
                    className="w-full bg-dark-800 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              {/* Město a adresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Město <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  >
                    <option value="">Vyberte město</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Adresa (volitelné)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ulice 123"
                      className="w-full bg-dark-800 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gradient-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Vytváření...' : 'Vytvořit podnik'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
