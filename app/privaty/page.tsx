import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';

export const metadata = {
  title: 'Priváty - EROSKO.CZ',
  description: 'Najděte nejlepší soukromé byty a prostory ve vaší oblasti.',
};

export default function PrivatyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
              <Home className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium">234 aktivních profilů</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Priváty</span>
            </h1>
            <p className="text-xl text-gray-400">
              Soukromé byty a prostory s ověřenými pracovníky
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
