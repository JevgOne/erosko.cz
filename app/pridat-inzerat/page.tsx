'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PridatInzeratPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [profileType, setProfileType] = useState('SOLO');
  const [category, setCategory] = useState('HOLKY_NA_SEX');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    'Klasický sex',
    'Orální sex',
    'Anální sex',
    'Escort',
    'Masáže',
    'BDSM',
    'Webcam',
    'Phone sex',
  ];

  const cities = [
    'Praha', 'Brno', 'Ostrava', 'Plzeň', 'Liberec',
    'Olomouc', 'České Budějovice', 'Hradec Králové'
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/prihlaseni');
    }
  }, [status, router]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validace
    if (!name || !age || !city || !phone) {
      setError('Vyplňte všechny povinné údaje');
      return;
    }

    if (selectedServices.length === 0) {
      setError('Vyberte alespoň jednu službu');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          age: parseInt(age),
          city,
          phone,
          profileType,
          category,
          businessName: profileType !== 'SOLO' ? businessName : null,
          services: selectedServices,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chyba při vytváření profilu');
      }

      // Úspěch - přesměruj na profil
      router.push(`/divky/${data.profile.slug}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 text-center">
          <p className="text-gray-400">Načítám...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Přidat inzerát</span>
              </h1>
              <p className="text-gray-400">
                Vytvořte nový profil na Erosko.cz
              </p>
            </div>

            <div className="glass rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Typ profilu
                  </label>
                  <select
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                  >
                    <option value="SOLO">SOLO - Nezávislá/ý</option>
                    <option value="PRIVAT">PRIVÁT - Vlastní prostory</option>
                    <option value="SALON">SALON - Masážní salon</option>
                    <option value="ESCORT_AGENCY">ESCORT AGENTURA</option>
                    <option value="DIGITAL_AGENCY">DIGITÁLNÍ AGENTURA</option>
                  </select>
                </div>

                {profileType !== 'SOLO' && (
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                      Název podniku
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="např. Salon Paradise"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kategorie služeb
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                  >
                    <option value="HOLKY_NA_SEX">Holky na sex</option>
                    <option value="EROTICKE_MASERKY">Erotické masérky</option>
                    <option value="DOMINA">BDSM / Domina</option>
                    <option value="DIGITALNI_SLUZBY">Digitální služby (webcam, phone)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Jméno / Přezdívka *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-2">
                      Věk *
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                      required
                      min="18"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    Město *
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Vyberte město</option>
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="+420 123 456 789"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nabízené služby (vyberte alespoň jednu) *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(service => (
                      <label
                        key={service}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-dark-800 border border-white/10 hover:border-primary-500 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Vytvářím profil...' : 'Vytvořit profil'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Po vytvoření profilu bude váš inzerát přístupný veřejnosti.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
