// SEO Categories - Systematická struktura pro landing pages

type SlugTemplate = {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  filterFn: string; // Funkce jako string pro template replacement
  priority: number; // 1-10 (10 = nejvyšší)
  category: 'age' | 'appearance' | 'service' | 'massage' | 'type' | 'online';
  seoText: {
    heading: string;
    paragraphs: string[];
  };
};

// Template slugy s {city} placeholder
export const SEO_SLUG_TEMPLATES: Record<string, SlugTemplate> = {
  // ==========================================
  // VĚK - PRIORITY 8-10
  // ==========================================

  'milfky-{city}': {
    title: 'Milfky {City}',
    description: 'Milfky {City} - Zralé ženy 30-45 let. Zkušené a sexy milfky s ověřenými profily.',
    h1: 'Milfky {City}',
    subtitle: 'Sexy a zkušené milfky 30-45 let v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.age >= 30 && p.age <= 45 && p.location && p.location.toLowerCase().includes('{city}'))`,
    priority: 10, // TOP keyword!
    category: 'age',
    seoText: {
      heading: 'Milfky v {city} - Zralé a zkušené ženy',
      paragraphs: [
        'Milfky {City} - sexy a zkušené ženy ve věku 30-45 let. Najdete zde ověřené profily zralých žen, které vědí, co chtějí.',
        'Profesionální přístup, diskrétnost a nezapomenutelné zážitky s milfkami v celé {city}.',
      ],
    },
  },

  'studentky-{city}': {
    title: 'Studentky {City}',
    description: 'Studentky {City} - Mladé studentky 18-23 let. Ověřené profily s reálnými fotkami.',
    h1: 'Studentky {City}',
    subtitle: 'Mladé studentky 18-23 let v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.age >= 18 && p.age <= 23 && p.location?.toLowerCase().includes('{city}'))`,
    priority: 9,
    category: 'age',
    seoText: {
      heading: 'Studentky v {city}',
      paragraphs: [
        'Studentky {City} - mladé dívky ve věku 18-23 let. Všechny profily jsou ověřené s reálnými fotkami.',
        'Diskrétní služby s mladými studentkami v celé {city}.',
      ],
    },
  },

  'mlada-holka-{city}': {
    title: 'Mladá holka {City}',
    description: 'Mladá holka {City} - Mladé dívky 18-25 let. Ověřené profily.',
    h1: 'Mladá holka {City}',
    subtitle: 'Mladé dívky 18-25 let v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.age >= 18 && p.age <= 25 && p.location?.toLowerCase().includes('{city}'))`,
    priority: 8,
    category: 'age',
    seoText: {
      heading: 'Mladé holky v {city}',
      paragraphs: [
        'Mladé holky {City} ve věku 18-25 let. Ověřené profily s reálnými fotkami a hodnocením.',
        'Diskrétní služby s mladými dívkami v celé {city}.',
      ],
    },
  },

  'zrala-zena-{city}': {
    title: 'Zralá žena {City}',
    description: 'Zralá žena {City} - Zkušené ženy 30+. Ověřené profily.',
    h1: 'Zralá žena {City}',
    subtitle: 'Zkušené ženy 30+ v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.age >= 30 && p.location?.toLowerCase().includes('{city}'))`,
    priority: 7,
    category: 'age',
    seoText: {
      heading: 'Zralé ženy v {city}',
      paragraphs: [
        'Zralé a zkušené ženy v {city}. Profesionální přístup a naprostá diskrétnost.',
        'Všechny profily jsou ověřené s reálnými fotkami a hodnocením.',
      ],
    },
  },

  // ==========================================
  // VZHLED - PRIORITY 7-9
  // ==========================================

  'silikonova-prsa-{city}': {
    title: 'Silikonová prsa {City}',
    description: 'Silikonová prsa {City} - Holky s velkými silikonovými prsy. Ověřené profily.',
    h1: 'Silikonová prsa {City}',
    subtitle: 'Holky s velkými silikonovými prsy v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.breastType === 'silicone' && p.location?.toLowerCase().includes('{city}'))`,
    priority: 9,
    category: 'appearance',
    seoText: {
      heading: 'Silikonová prsa v {city}',
      paragraphs: [
        'Holky se silikonovými prsy v {city}. Ověřené profily s reálnými fotkami.',
        'Profesionální přístup a naprostá diskrétnost.',
      ],
    },
  },

  'velka-prsa-{city}': {
    title: 'Velká prsa {City}',
    description: 'Velká prsa {City} - Holky s velkými prsy. Ověřené profily.',
    h1: 'Velká prsa {City}',
    subtitle: 'Holky s velkými prsy v {city}.',
    filterFn: `(profiles) => profiles.filter(p => ['D', 'DD', 'E', 'E+'].includes(p.breastSize) && p.location?.toLowerCase().includes('{city}'))`,
    priority: 8,
    category: 'appearance',
    seoText: {
      heading: 'Velká prsa v {city}',
      paragraphs: [
        'Holky s velkými prsy v {city}. Ověřené profily s reálnými fotkami.',
        'Diskrétní služby s profesionálním přístupem.',
      ],
    },
  },

  'prirozeni-prsa-{city}': {
    title: 'Přirozené prsa {City}',
    description: 'Přirozené prsa {City} - Holky s přírodními prsy. Ověřené profily.',
    h1: 'Přirozené prsa {City}',
    subtitle: 'Holky s přírodními prsy v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.breastType === 'natural' && p.location?.toLowerCase().includes('{city}'))`,
    priority: 7,
    category: 'appearance',
    seoText: {
      heading: 'Přirozené prsa v {city}',
      paragraphs: [
        'Holky s přírodními prsy v {city}. Ověřené profily s reálnými fotkami.',
        'Profesionální přístup a naprostá diskrétnost.',
      ],
    },
  },

  'blondynka-{city}': {
    title: 'Blondýnka {City}',
    description: 'Blondýnka {City} - Blonďaté holky. Ověřené profily.',
    h1: 'Blondýnka {City}',
    subtitle: 'Blonďaté dívky v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.hairColor === 'blonde' && p.location?.toLowerCase().includes('{city}'))`,
    priority: 8,
    category: 'appearance',
    seoText: {
      heading: 'Blondýnky v {city}',
      paragraphs: [
        'Blonďaté holky v {city}. Ověřené profily s reálnými fotkami.',
        'Diskrétní a profesionální služby.',
      ],
    },
  },

  'bruneta-{city}': {
    title: 'Bruneta {City}',
    description: 'Bruneta {City} - Brunetky. Ověřené profily.',
    h1: 'Bruneta {City}',
    subtitle: 'Brunetky v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.hairColor === 'brunette' && p.location?.toLowerCase().includes('{city}'))`,
    priority: 7,
    category: 'appearance',
    seoText: {
      heading: 'Brunetky v {city}',
      paragraphs: [
        'Brunetky v {city}. Ověřené profily s reálnými fotkami.',
        'Profesionální přístup a diskrétnost.',
      ],
    },
  },

  // ==========================================
  // SLUŽBY - PRIORITY 7-10
  // ==========================================

  'escort-{city}': {
    title: 'Escort {City}',
    description: 'Escort {City} - Nejlepší escort služby. Ověřené profily, VIP doprovod, GFE.',
    h1: 'Escort {City}',
    subtitle: 'Profesionální escort služby v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.offersEscort && p.location?.toLowerCase().includes('{city}'))`,
    priority: 10,
    category: 'service',
    seoText: {
      heading: 'Escort služby v {city}',
      paragraphs: [
        'Escort {City} nabízí širokou nabídku profesionálních escort služeb. Naše ověřené escort dívky poskytují diskrétní doprovod.',
        'Všechny profily jsou ověřené s reálnými fotkami a hodnocením. Garantujeme 100% diskrétnost a bezpečnost.',
      ],
    },
  },

  'privat-{city}': {
    title: 'Privát {City}',
    description: 'Privát {City} - Erotické služby na privatu. Holky z privatu s ověřenými profily.',
    h1: 'Privát {City}',
    subtitle: 'Erotické služby na privatu v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.profileType === 'privat' && p.location?.toLowerCase().includes('{city}'))`,
    priority: 9,
    category: 'type',
    seoText: {
      heading: 'Privát v {city}',
      paragraphs: [
        'Privát {City} nabízí diskrétní erotické služby v příjemném prostředí. Všechny naše privaty jsou ověřené.',
        'Holky z privatu poskytují profesionální služby s naprostou diskrétností.',
      ],
    },
  },

  'hluboky-oral-{city}': {
    title: 'Hluboký orál {City}',
    description: 'Hluboký orál {City} - Holky nabízející deep throat. Ověřené profily.',
    h1: 'Hluboký orál {City}',
    subtitle: 'Profesionální služby hlubokého orálu v {city}.',
    filterFn: `(profiles) => profiles.filter(p => (p.offersDeepthroat || p.services?.includes('Hluboký orál')) && p.location?.toLowerCase().includes('{city}'))`,
    priority: 8,
    category: 'service',
    seoText: {
      heading: 'Hluboký orál v {city}',
      paragraphs: [
        'Hledáte profesionální služby hlubokého orálu v {city}? Najdete zde ověřené profily s reálnými fotkami.',
        'Diskrétní a bezpečné služby s naprostou ochranou soukromí.',
      ],
    },
  },

  'gfe-{city}': {
    title: 'GFE {City}',
    description: 'GFE {City} - Girlfriend Experience. Autentický zážitek s ověřenými escort dívkami.',
    h1: 'GFE - Girlfriend Experience {City}',
    subtitle: 'Autentický zážitek jako s přítelkyní v {city}.',
    filterFn: `(profiles) => profiles.filter(p => (p.offersGFE || p.services?.includes('GFE')) && p.location?.toLowerCase().includes('{city}'))`,
    priority: 7,
    category: 'service',
    seoText: {
      heading: 'GFE v {city}',
      paragraphs: [
        'GFE (Girlfriend Experience) v {city} nabízí autentický zážitek jako s přítelkyní. Escort dívky poskytují intimní a osobní služby.',
        'Diskrétnost a naprostá důvěra. Všechny profily jsou ověřené.',
      ],
    },
  },

  'spolecnice-{city}': {
    title: 'Společnice {City}',
    description: 'Společnice {City} - Elegantní společnice pro společenské akce a doprovod. Ověřené profily.',
    h1: 'Společnice {City}',
    subtitle: 'Elegantní společnice a doprovod v {city}.',
    filterFn: `(profiles) => profiles.filter(p => p.offersEscort && p.location?.toLowerCase().includes('{city}'))`,
    priority: 9,
    category: 'service',
    seoText: {
      heading: 'Společnice v {city}',
      paragraphs: [
        'Společnice {City} - elegantní escort dívky pro společenské akce, večeře a doprovod. Profesionální a diskrétní služby.',
        'Všechny naše společnice jsou ověřené, vzdělaná a elegantní. Dokonalý doprovod pro náročné klienty.',
      ],
    },
  },

  // ==========================================
  // MASÁŽE - PRIORITY 7-9
  // ==========================================

  'eroticka-masaz-{city}': {
    title: 'Erotická masáž {City}',
    description: 'Erotická masáž {City} - Profesionální erotické masáže. Ověřené masérky.',
    h1: 'Erotická masáž {City}',
    subtitle: 'Profesionální erotické masáže v {city}.',
    filterFn: `(profiles) => profiles.filter(p => (p.category?.toLowerCase().includes('masáž') || p.category?.toLowerCase().includes('masérk')) && p.location?.toLowerCase().includes('{city}'))`,
    priority: 9,
    category: 'massage',
    seoText: {
      heading: 'Erotická masáž v {city}',
      paragraphs: [
        'Erotická masáž {City} - relaxační a erotické masáže od profesionálních masérk.',
        'Diskrétní prostředí a naprostá ochrana soukromí.',
      ],
    },
  },

  'tantra-{city}': {
    title: 'Tantra {City}',
    description: 'Tantra {City} - Tantrická masáž. Ověřené tantra masérky.',
    h1: 'Tantra {City}',
    subtitle: 'Tantrická masáž v {city}.',
    filterFn: `(profiles) => profiles.filter(p => (p.category?.toLowerCase().includes('masáž') || p.category?.toLowerCase().includes('masérk')) && p.location?.toLowerCase().includes('{city}'))`,
    priority: 8,
    category: 'massage',
    seoText: {
      heading: 'Tantra masáž v {city}',
      paragraphs: [
        'Tantra {City} - profesionální tantrické masáže pro relaxaci těla i mysli.',
        'Ověřené tantra masérky s dlouholetými zkušenostmi.',
      ],
    },
  },
};

// Města s prioritami
export const CITIES = [
  { slug: 'praha', name: 'Praha', priority: 10 },
  { slug: 'brno', name: 'Brno', priority: 8 },
  { slug: 'ostrava', name: 'Ostrava', priority: 6 },
  { slug: 'plzen', name: 'Plzeň', priority: 5 },
];

// Funkce pro generování všech slugů
export function generateAllSlugs() {
  const result: Record<string, any> = {};

  Object.entries(SEO_SLUG_TEMPLATES).forEach(([template, config]) => {
    CITIES.forEach((city) => {
      const slug = template.replace('{city}', city.slug);
      const capitalizedCity = city.name;
      const lowerCity = city.slug;

      result[slug] = {
        title: config.title.replace('{City}', capitalizedCity),
        description: config.description
          .replace(/{City}/g, capitalizedCity)
          .replace(/{city}/g, lowerCity),
        h1: config.h1.replace('{City}', capitalizedCity),
        subtitle: config.subtitle.replace('{city}', lowerCity),
        filter: eval(config.filterFn.replace(/{city}/g, lowerCity)),
        priority: config.priority + (city.priority / 10), // Kombinace priority
        category: config.category,
        seoText: {
          heading: config.seoText.heading
            .replace(/{City}/g, capitalizedCity)
            .replace(/{city}/g, lowerCity),
          paragraphs: config.seoText.paragraphs.map((p) =>
            p.replace(/{City}/g, capitalizedCity).replace(/{city}/g, lowerCity)
          ),
        },
      };
    });
  });

  return result;
}

// Export vygenerovaných slugů
export const SEO_SLUGS = generateAllSlugs();
