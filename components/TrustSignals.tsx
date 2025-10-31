'use client';

import { Shield, Lock, CheckCircle, Headphones, Eye, Users } from 'lucide-react';

const trustFeatures = [
  {
    icon: CheckCircle,
    title: 'Ověřené profily',
    description: 'Všechny profily procházejí důkladnou verifikací identity',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Lock,
    title: 'Bezpečné platby',
    description: 'Šifrované transakce a ochrana osobních údajů',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'Diskrétní a anonymní',
    description: 'Vaše soukromí je naší prioritou',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Headphones,
    title: '24/7 Podpora',
    description: 'Jsme tu pro vás kdykoliv potřebujete pomoc',
    color: 'from-orange-500 to-red-500',
  },
];

const stats = [
  {
    number: '2,500+',
    label: 'Aktivních profilů',
    icon: Users,
  },
  {
    number: '150K+',
    label: 'Měsíčních návštěvníků',
    icon: Eye,
  },
  {
    number: '98%',
    label: 'Spokojených zákazníků',
    icon: CheckCircle,
  },
  {
    number: '50+',
    label: 'Měst v ČR',
    icon: Shield,
  },
];

export default function TrustSignals() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proč <span className="gradient-text">EROSKO.CZ</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Bezpečná, diskrétní a profesionální platforma pro všechny
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 text-center group hover:bg-white/5 transition-all"
                >
                  <div className="relative inline-block mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                    <div className={`relative glass w-16 h-16 rounded-2xl flex items-center justify-center mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
