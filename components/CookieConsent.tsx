'use client';

import { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    analytics: true,
    marketing: true,
    personalization: true
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
          {!showSettings ? (
            // Simple view
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon and text */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      Používáme cookies
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Používáme cookies pro zlepšení vašeho zážitku, analýzu návštěvnosti a personalizaci obsahu.
                      Kliknutím na &ldquo;Přijmout vše&rdquo; souhlasíte s používáním všech cookies.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <Link href="/privacy" className="hover:text-primary-400 transition-colors underline">
                    Ochrana soukromí
                  </Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:text-primary-400 transition-colors underline">
                    Podmínky použití
                  </Link>
                  <span>•</span>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="hover:text-primary-400 transition-colors underline"
                  >
                    Nastavení cookies
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 bg-dark-800/50 border border-white/10 rounded-xl font-semibold text-gray-400 hover:bg-dark-800 hover:border-white/20 transition-all whitespace-nowrap"
                >
                  Odmítnout vše
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all whitespace-nowrap"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          ) : (
            // Settings view
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-400" />
                  Nastavení cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary cookies - always enabled */}
                <div className="flex items-start justify-between p-4 bg-dark-800/30 border border-white/10 rounded-xl">
                  <div className="flex-1 pr-4">
                    <div className="font-semibold mb-1 flex items-center gap-2">
                      Nezbytné cookies
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                        Povinné
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Tyto cookies jsou nezbytné pro správné fungování webu a nelze je vypnout.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics cookies */}
                <div className="flex items-start justify-between p-4 bg-dark-800/30 border border-white/10 rounded-xl">
                  <div className="flex-1 pr-4">
                    <div className="font-semibold mb-1">
                      Analytické cookies
                    </div>
                    <p className="text-sm text-gray-400">
                      Pomáhají nám pochopit, jak návštěvníci používají náš web, abychom ho mohli vylepšovat.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-all ${
                      preferences.analytics ? 'bg-green-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}>
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </button>
                </div>

                {/* Marketing cookies */}
                <div className="flex items-start justify-between p-4 bg-dark-800/30 border border-white/10 rounded-xl">
                  <div className="flex-1 pr-4">
                    <div className="font-semibold mb-1">
                      Marketingové cookies
                    </div>
                    <p className="text-sm text-gray-400">
                      Používají se k zobrazení relevantních reklam a měření jejich efektivity.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-all ${
                      preferences.marketing ? 'bg-green-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}>
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </button>
                </div>

                {/* Personalization cookies */}
                <div className="flex items-start justify-between p-4 bg-dark-800/30 border border-white/10 rounded-xl">
                  <div className="flex-1 pr-4">
                    <div className="font-semibold mb-1">
                      Personalizační cookies
                    </div>
                    <p className="text-sm text-gray-400">
                      Umožňují personalizaci obsahu a reklam na základě vašich preferencí.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, personalization: !preferences.personalization})}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center transition-all ${
                      preferences.personalization ? 'bg-green-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}>
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Settings buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 bg-dark-800/50 border border-white/10 rounded-xl font-semibold text-gray-400 hover:bg-dark-800 hover:border-white/20 transition-all"
                >
                  Odmítnout vše
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Uložit nastavení
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
