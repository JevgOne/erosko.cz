import Header from '@/components/Header';
export const dynamic = 'force-dynamic';
import Hero from '@/components/Hero';
import AllGirlsTabs from '@/components/AllGirlsTabs';
import Categories from '@/components/Categories';
import TrustSignals from '@/components/TrustSignals';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AllGirlsTabs />

      {/* Subtle horizontal banner between sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner
          size="horizontal"
          title="Propagujte svůj profil"
          ctaText="Více informací"
          ctaUrl="/kontakt"
        />
      </section>

      <Categories />
      <TrustSignals />
      <HowItWorks />
      <Footer />
    </main>
  );
}
