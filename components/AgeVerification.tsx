'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, X } from 'lucide-react';

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(true); // Default to true to avoid flash
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age in this session
    const verified = sessionStorage.getItem('age_verified');
    if (!verified) {
      setIsVerified(false);
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('age_verified', 'true');
    setIsVisible(false);
    setTimeout(() => setIsVerified(true), 300);
  };

  const handleDecline = () => {
    // Redirect to safe site
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative w-full max-w-lg mx-4">
        {/* Warning icon animation */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Modal content */}
        <div className="glass rounded-3xl p-8 md:p-10 border border-red-500/20 shadow-2xl shadow-red-500/10 mt-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Ověření věku
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold">
              <AlertTriangle className="w-4 h-4" />
              Pouze pro dospělé 18+
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <p className="text-gray-300 text-center leading-relaxed">
              Tyto webové stránky obsahují obsah pouze pro dospělé osoby starší 18 let.
            </p>
            <div className="bg-dark-800/50 border border-white/10 rounded-xl p-4 space-y-2.5 text-sm text-gray-400 max-h-64 overflow-y-auto">
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Vstupem na tyto stránky potvrzujete, že je vám 18 let nebo více (nebo 21 let, pokud se nacházíte ve státě, kde je tento věk požadován zákonem)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Všechny údaje uvedené na webu (včetně fotek, popisů a kontaktních informací) jsou údaje inzerentů. Provozovatel webu neručí za správnost těchto údajů</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Web používám pouze pro soukromé účely a nebudu obsah zpřístupňovat osobám mladším 18/21 let</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Na veškeré informace, fotografie a obsah zveřejněný na těchto stránkách se vztahují autorská práva. Jakékoliv kopírování nebo šíření obsahu bez souhlasu je zakázáno</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Obsah těchto stránek může být pro některé osoby nevhodný</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>Souhlasíte s našimi podmínkami použití a zásadami ochrany osobních údajů</span>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDecline}
              className="px-6 py-4 bg-dark-800/50 border border-white/10 rounded-xl font-semibold text-gray-400 hover:bg-dark-800 hover:border-white/20 transition-all"
            >
              Není mi 18 let
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-4 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
            >
              Jsem dospělý (18+)
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Kliknutím na tlačítko &ldquo;Jsem dospělý&rdquo; potvrzujete, že jste dosáhli zákonného věku pro prohlížení obsahu pro dospělé ve vaší zemi.
          </p>
        </div>
      </div>
    </div>
  );
}
