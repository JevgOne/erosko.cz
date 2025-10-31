'use client';

import { UserPlus, Search, MessageCircle, Star } from 'lucide-react';

const stepsForUsers = [
  {
    icon: Search,
    title: 'Vyhledejte',
    description: 'Procházejte tisíce ověřených profilů ve vaší oblasti',
  },
  {
    icon: UserPlus,
    title: 'Vyberte profil',
    description: 'Podívejte se na detaily, fotky a recenze',
  },
  {
    icon: MessageCircle,
    title: 'Kontaktujte',
    description: 'Spojte se přímo s inzerentem',
  },
  {
    icon: Star,
    title: 'Užijte si',
    description: 'Zanechte hodnocení po vaší zkušenosti',
  },
];

const stepsForProviders = [
  {
    icon: UserPlus,
    title: 'Registrujte se',
    description: 'Vytvořte si účet během několika minut',
  },
  {
    icon: UserPlus,
    title: 'Vytvořte profil',
    description: 'Přidejte fotky, popis a ceník služeb',
  },
  {
    icon: Star,
    title: 'Získejte viditelnost',
    description: 'Zvyšte dosah pomocí prémiových funkcí',
  },
  {
    icon: MessageCircle,
    title: 'Začněte vydělávat',
    description: 'Přijímejte rezervace a budujte pověst',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Jak to <span className="gradient-text">funguje</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Jednoduchý proces pro uživatele i inzerenty
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Users */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-8 text-center">Pro uživatele</h3>
            <div className="space-y-6">
              {stepsForUsers.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 gradient-primary blur-lg opacity-50"></div>
                        <div className="relative glass w-12 h-12 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-bold text-primary-400">Krok {index + 1}</span>
                        <h4 className="text-lg font-bold">{step.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* For Providers */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-8 text-center">Pro inzerenty</h3>
            <div className="space-y-6">
              {stepsForProviders.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 gradient-primary blur-lg opacity-50"></div>
                        <div className="relative glass w-12 h-12 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-bold text-primary-400">Krok {index + 1}</span>
                        <h4 className="text-lg font-bold">{step.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
