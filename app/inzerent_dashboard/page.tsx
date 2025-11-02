'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/Header';
import { Building2, User, Settings, LogOut, Plus, Eye, Edit, Trash2, LayoutDashboard, CreditCard, Users, CheckCircle, Clock, Star, TrendingUp, AlertCircle, Image as ImageIcon, Phone, Heart, X } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type MenuItem = 'dashboard' | 'business' | 'profiles' | 'statistics';

export default function InzerentDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<MenuItem>('dashboard');
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [addProfileLoading, setAddProfileLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
    services: [] as string[],
  });

  // Profile limits
  const PROFILE_LIMIT = 10; // Free tier limit
  const totalProfiles = profiles.length + businesses.length;
  const remainingProfiles = PROFILE_LIMIT - totalProfiles;
  const canAddMore = totalProfiles < PROFILE_LIMIT;

  // Calculate statistics
  const totalViews = profiles.reduce((sum, p) => sum + (p.viewCount || 0), 0) +
                     businesses.reduce((sum, b) => sum + (b.viewCount || 0), 0);

  const totalReviews = profiles.reduce((sum, p) => sum + (p.reviewCount || 0), 0) +
                       businesses.reduce((sum, b) => sum + (b.reviewCount || 0), 0);

  const avgRating = totalProfiles > 0
    ? (profiles.reduce((sum, p) => sum + (p.rating || 0), 0) +
       businesses.reduce((sum, b) => sum + (b.rating || 0), 0)) / totalProfiles
    : 0;

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/prihlaseni');
      return;
    }

    if (session?.user) {
      fetchUserData();
    }
  }, [status, session, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profiles');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data.profiles || []);
        setBusinesses(data.businesses || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      alert('Vyplňte jméno a věk');
      return;
    }

    if (businesses.length === 0) {
      alert('Nemáte žádný podnik. Nejdřív vytvořte podnik.');
      return;
    }

    setAddProfileLoading(true);

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          businessId: businesses[0].id, // První podnik
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profil úspěšně přidán!');
        setShowAddProfileModal(false);
        setFormData({ name: '', age: '', description: '', services: [] });
        // Reload data
        fetchUserData();
      } else {
        alert(data.error || 'Chyba při přidávání profilu');
      }
    } catch (error) {
      console.error('Error adding profile:', error);
      alert('Chyba při přidávání profilu');
    } finally {
      setAddProfileLoading(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  if (loading || status === 'loading') {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400">Načítám dashboard...</p>
        </div>
      </main>
    );
  }

  const menuItems = [
    { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'business' as MenuItem, label: 'Informace o podniku', icon: Building2 },
    { id: 'profiles' as MenuItem, label: 'Profily', icon: Users },
    { id: 'statistics' as MenuItem, label: 'Statistiky', icon: TrendingUp },
  ];

  return (
    <main className="min-h-screen bg-dark-900">
      <Header />

      <div className="pt-20">
        <div className="flex min-h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 glass border-r border-white/5 p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
              <p className="text-sm text-gray-400 truncate">{session?.user?.email}</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeSection === item.id
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Odhlásit se</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">

              {/* Dashboard Overview */}
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-400">Přehled vašich profilů a statistik</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Aktivní profily</h3>
                        <Users className="w-6 h-6 text-primary-400" />
                      </div>
                      <p className="text-3xl font-bold">
                        {totalProfiles}/{PROFILE_LIMIT}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {profiles.length} solo • {businesses.length} podniků
                      </p>
                      <p className={`text-sm font-medium mt-2 ${remainingProfiles > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {remainingProfiles > 0 ? `Zbývá ${remainingProfiles} ${remainingProfiles === 1 ? 'profil' : remainingProfiles < 5 ? 'profily' : 'profilů'}` : 'Limit dosažen'}
                      </p>
                    </div>

                    <div className="glass rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Zobrazení</h3>
                        <Eye className="w-6 h-6 text-primary-400" />
                      </div>
                      <p className="text-3xl font-bold">{totalViews.toLocaleString('cs-CZ')}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {totalViews === 0 ? 'Zatím bez zobrazení' : 'Celkem zobrazení'}
                      </p>
                    </div>

                    <div className="glass rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Hodnocení</h3>
                        <Star className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-3xl font-bold">
                        {avgRating > 0 ? avgRating.toFixed(1) : '—'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {totalReviews > 0 ? `Z ${totalReviews} hodnocení` : 'Zatím bez hodnocení'}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Rychlé akce</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveSection('business')}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10 text-left"
                      >
                        <Building2 className="w-8 h-8 text-primary-400" />
                        <div>
                          <h3 className="font-semibold">Upravit podnik</h3>
                          <p className="text-sm text-gray-400">Změnit informace o podniku</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveSection('profiles')}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10 text-left"
                      >
                        <Users className="w-8 h-8 text-primary-400" />
                        <div>
                          <h3 className="font-semibold">Spravovat profily</h3>
                          <p className="text-sm text-gray-400">Přidat nebo upravit profily</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Info */}
              {activeSection === 'business' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Informace o podniku</h1>
                    <p className="text-gray-400">Upravte údaje o vašem podniku</p>
                  </div>

                  {businesses.length > 0 ? (
                    businesses.map((business) => (
                      <div key={business.id} className="glass rounded-xl p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
                            <div className="flex items-center gap-2">
                              {business.verified ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                                  <CheckCircle className="w-4 h-4" />
                                  Ověřeno
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                                  <Clock className="w-4 h-4" />
                                  Čeká na schválení
                                </span>
                              )}
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors">
                            <Edit className="w-4 h-4" />
                            Upravit
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Telefon</p>
                            <p className="font-medium">{business.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Město</p>
                            <p className="font-medium">{business.city}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-400 mb-1">Adresa</p>
                            <p className="font-medium">{business.address || '—'}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-400 mb-1">Popis</p>
                            <p className="text-gray-300">{business.description || '—'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-xl p-12 text-center">
                      <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                      <h3 className="text-xl font-semibold mb-2">Žádný podnik</h3>
                      <p className="text-gray-400 mb-6">Nemáte ještě žádný registrovaný podnik</p>
                    </div>
                  )}
                </div>
              )}

              {/* Profiles */}
              {activeSection === 'profiles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Profily</h1>
                      <p className="text-gray-400">
                        Spravujte profily vašich dívek •
                        <span className={`ml-2 font-semibold ${remainingProfiles > 0 ? 'text-primary-400' : 'text-red-400'}`}>
                          {totalProfiles}/{PROFILE_LIMIT} použito
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setShowAddProfileModal(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          canAddMore
                            ? 'gradient-primary hover:opacity-90'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!canAddMore}
                      >
                        <Plus className="w-5 h-5" />
                        Přidat profil
                      </button>
                      {!canAddMore && (
                        <p className="text-xs text-red-400">Dosažen limit profilů</p>
                      )}
                      {canAddMore && remainingProfiles <= 3 && (
                        <p className="text-xs text-yellow-400">Zbývá {remainingProfiles} {remainingProfiles === 1 ? 'profil' : 'profily'}</p>
                      )}
                    </div>
                  </div>

                  {profiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profiles.map((profile) => (
                        <div key={profile.id} className="glass rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{profile.name}</h3>
                              <p className="text-sm text-gray-400">{profile.city}</p>
                            </div>
                            {profile.verified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                                <CheckCircle className="w-3 h-3" />
                                Ověřeno
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs">
                                <Clock className="w-3 h-3" />
                                Čeká
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-4">{profile.description?.substring(0, 100)}...</p>
                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors">
                              <Edit className="w-4 h-4" />
                              Upravit
                            </button>
                            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass rounded-xl p-12 text-center">
                      <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                      <h3 className="text-xl font-semibold mb-2">Žádné profily</h3>
                      <p className="text-gray-400 mb-6">Přidejte první profil své dívky</p>
                      <button className="inline-flex items-center gap-2 px-6 py-3 gradient-primary rounded-lg hover:opacity-90 transition-opacity">
                        <Plus className="w-5 h-5" />
                        Přidat první profil
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Statistics */}
              {activeSection === 'statistics' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Statistiky</h1>
                    <p className="text-gray-400">Detailní přehled návštěvnosti a výkonu vašich profilů</p>
                  </div>

                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-primary-400" />
                        <h3 className="font-semibold text-sm">Zobrazení profilu</h3>
                      </div>
                      <p className="text-2xl font-bold">{totalViews.toLocaleString('cs-CZ')}</p>
                      <p className="text-xs text-green-400 mt-1">+12% tento týden</p>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="w-5 h-5 text-primary-400" />
                        <h3 className="font-semibold text-sm">Kliknutí na telefon</h3>
                      </div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-400 mt-1">Za posledních 7 dní</p>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-5 h-5 text-primary-400" />
                        <h3 className="font-semibold text-sm">Oblíbené</h3>
                      </div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-400 mt-1">Přidání do oblíbených</p>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-semibold text-sm">Průměrné hodnocení</h3>
                      </div>
                      <p className="text-2xl font-bold">{avgRating > 0 ? avgRating.toFixed(1) : '—'}</p>
                      <p className="text-xs text-gray-400 mt-1">Z {totalReviews} hodnocení</p>
                    </div>
                  </div>

                  {/* Visitor Chart */}
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Návštěvnost (posledních 30 dní)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={[
                          { date: '1.1', views: 0 },
                          { date: '2.1', views: 0 },
                          { date: '3.1', views: 0 },
                          { date: '4.1', views: 0 },
                          { date: '5.1', views: 0 },
                          { date: '6.1', views: 0 },
                          { date: '7.1', views: 0 },
                          { date: '8.1', views: 0 },
                          { date: '9.1', views: 0 },
                          { date: '10.1', views: 0 },
                          { date: '11.1', views: 0 },
                          { date: '12.1', views: 0 },
                          { date: '13.1', views: 0 },
                          { date: '14.1', views: 0 },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stroke="#ec4899"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorViews)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Profile Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Individual Profile Stats */}
                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-bold mb-4">Výkon jednotlivých profilů</h2>
                      {profiles.length > 0 || businesses.length > 0 ? (
                        <div className="space-y-4">
                          {profiles.map((profile) => (
                            <div key={profile.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <div>
                                <h3 className="font-semibold">{profile.name}</h3>
                                <p className="text-sm text-gray-400">{profile.city}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">{profile.viewCount || 0}</p>
                                <p className="text-xs text-gray-400">zobrazení</p>
                              </div>
                            </div>
                          ))}
                          {businesses.map((business) => (
                            <div key={business.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <div>
                                <h3 className="font-semibold">{business.name}</h3>
                                <p className="text-sm text-gray-400">{business.city}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">{business.viewCount || 0}</p>
                                <p className="text-xs text-gray-400">zobrazení</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-8">Zatím nemáte žádné profily</p>
                      )}
                    </div>

                    {/* Improvement Tips */}
                    <div className="glass rounded-xl p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                        Tipy na zlepšení
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <ImageIcon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-yellow-400 mb-1">Přidejte více fotek</h3>
                            <p className="text-sm text-gray-300">Profily s 5+ fotkami mají až 3x více zobrazení</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <Edit className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-blue-400 mb-1">Vyplňte popis</h3>
                            <p className="text-sm text-gray-300">Podrobný popis zvyšuje důvěryhodnost a zájem</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-green-400 mb-1">Získejte ověření</h3>
                            <p className="text-sm text-gray-300">Ověřené profily získávají 2x více kontaktů</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-purple-400 mb-1">Aktualizujte pravidelně</h3>
                            <p className="text-sm text-gray-300">Pravidelné aktualizace drží profil v popředí</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Completeness */}
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Úplnost profilu</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Celková úplnost</span>
                          <span className="text-sm font-bold text-primary-400">45%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary-500 to-pink-500" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Kompletní profily získají až 5x více zobrazení</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-sm">Základní informace</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-sm">Fotografie (0/5)</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-sm">Detailní popis</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-sm">Ověření profilu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Add Profile Modal */}
      {showAddProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Přidat nový profil</h2>
                <button
                  onClick={() => setShowAddProfileModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {businesses.length > 0 && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <strong>Podnik:</strong> {businesses[0].name}
                  </p>
                  <p className="text-sm text-blue-300">
                    <strong>Telefon:</strong> {businesses[0].phone} (bude použit pro všechny profily)
                  </p>
                  <p className="text-sm text-blue-300">
                    <strong>Město:</strong> {businesses[0].city}
                  </p>
                </div>
              )}

              <form onSubmit={handleAddProfile} className="space-y-6">
                {/* Jméno */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jméno <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Např. Adéla"
                    required
                  />
                </div>

                {/* Věk */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Věk <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="18"
                    required
                  />
                </div>

                {/* Popis */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Popis
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-400 transition-colors resize-none"
                    placeholder="Napište něco o sobě..."
                  />
                </div>

                {/* Služby */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Služby (volitelné)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Klasik', 'Orál', 'Anál', 'Masáž', 'BDSM', 'Escort'].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          formData.services.includes(service)
                            ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                            : 'border-white/10 hover:bg-white/5'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProfileModal(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    disabled={addProfileLoading}
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={addProfileLoading}
                  >
                    {addProfileLoading ? 'Přidávám...' : 'Přidat profil'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
