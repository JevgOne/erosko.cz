// Profiles Data - Mock data pro vývoj, v produkci nahradit API/DB calls

export interface Profile {
  id: string;
  name: string;
  age: number;
  location?: string;
  category?: string;
  breastType?: 'natural' | 'silicone';
  breastSize?: string;
  hairColor?: 'blonde' | 'brunette' | 'black' | 'red';
  offersEscort?: boolean;
  offersOutcall?: boolean;
  offersGFE?: boolean;
  offersDeepthroat?: boolean;
  offersAnal?: boolean;
  offersOnline?: boolean;
  isVIP?: boolean;
  profileType?: 'privat' | 'escort' | 'massage' | 'online';
  services?: string[];
  photos?: string[];
  description?: string;
  rating?: number;
  verified?: boolean;
}

// Mock data - v produkci nahradit skutečnými daty z DB
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Lucie',
    age: 24,
    location: 'Praha',
    category: 'Escort',
    breastType: 'natural',
    breastSize: 'C',
    hairColor: 'blonde',
    offersEscort: true,
    offersOutcall: true,
    offersGFE: true,
    profileType: 'escort',
    services: ['GFE', 'Escort'],
    verified: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Petra',
    age: 35,
    location: 'Brno',
    category: 'Erotické masáže',
    breastType: 'natural',
    breastSize: 'D',
    hairColor: 'brunette',
    profileType: 'privat',
    services: ['Tantra', 'Body to body'],
    verified: true,
    rating: 4.9,
  },
];

/**
 * Načte všechny profily
 * V produkci nahradit skutečným API callem nebo DB query
 */
export async function getProfiles(): Promise<Profile[]> {
  // V produkci zde bude:
  // const response = await fetch('/api/profiles');
  // return response.json();

  // Pro vývoj vracíme mock data
  return mockProfiles;
}

/**
 * Načte jeden profil podle ID
 */
export async function getProfileById(id: string): Promise<Profile | null> {
  const profiles = await getProfiles();
  return profiles.find(p => p.id === id) || null;
}

/**
 * Filtruje profily podle kritérií
 */
export function filterProfiles(
  profiles: Profile[],
  filters: {
    location?: string;
    category?: string;
    minAge?: number;
    maxAge?: number;
    services?: string[];
  }
): Profile[] {
  return profiles.filter(profile => {
    if (filters.location && !profile.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.category && profile.category !== filters.category) {
      return false;
    }
    if (filters.minAge && profile.age < filters.minAge) {
      return false;
    }
    if (filters.maxAge && profile.age > filters.maxAge) {
      return false;
    }
    if (filters.services && filters.services.length > 0) {
      const hasService = filters.services.some(service =>
        profile.services?.includes(service)
      );
      if (!hasService) return false;
    }
    return true;
  });
}
