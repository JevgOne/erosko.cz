import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileGrid from '@/components/ProfileGrid';
import { getProfiles } from '@/lib/profiles-data';
import { SEO_SLUGS } from '@/lib/seo-categories';
import type { Metadata } from 'next';

// Import systematických SEO slugů z konfigurace
const slugConfig = SEO_SLUGS;

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const config = slugConfig[params.slug];

  if (!config) {
    return {
      title: 'Stránka nenalezena',
      description: 'Požadovaná stránka neexistuje.'
    };
  }

  return {
    title: `${config.title} - Erosko.cz | Erotické služby`,
    description: config.description,
    keywords: config.title.toLowerCase(),
  };
}

// Generate static params for known slugs
export async function generateStaticParams() {
  return Object.keys(slugConfig).map((slug) => ({
    slug,
  }));
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const config = slugConfig[params.slug];

  if (!config) {
    notFound();
  }

  const allProfiles = await getProfiles();
  const profiles = config.filter(allProfiles);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">{config.h1}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {config.subtitle}
            </p>
          </div>

          {/* Statistiky */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{profiles.length}</div>
              <div className="text-gray-400">Ověřených profilů</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400">Dostupnost</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-gray-400">Diskrétnost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profily */}
      <ProfileGrid profiles={profiles} title="" description="" />

      {/* SEO Text */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 gradient-text">
              {config.seoText.heading}
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {config.seoText.paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
