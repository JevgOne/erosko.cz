/**
 * Generátor SEO-friendly URL slugs
 * Lepší než konkurence (Eroguide, DobryPrivat)
 */

import { nanoid } from 'nanoid';

// Kategorie map pro slugs
const categorySlugMap: Record<string, string> = {
  'HOLKY_NA_SEX': 'holky-na-sex',
  'EROTICKE_MASERKY': 'eroticke-masaze',
  'DOMINA': 'domina',
  'DIGITALNI_SLUZBY': 'online',
};

const businessTypeSlugMap: Record<string, string> = {
  'PRIVAT': 'privat',
  'MASSAGE_SALON': 'masazni-salon',
  'ESCORT_AGENCY': 'agentura',
  'SWINGERS_CLUB': 'swingers',
  'NIGHT_CLUB': 'club',
  'STRIP_CLUB': 'strip',
};

/**
 * Převede text na SEO-friendly slug
 * - Odstraní diakritiku
 * - Převede na lowercase
 * - Nahradí mezery pomlčkami
 * - Odstraní speciální znaky
 */
export function slugify(text: string): string {
  const from = 'áàäâăãåāéèëêěėēíìïîıīóòöôőõøōúùüûůűūçćčďľĺňńŕřšśťžźż';
  const to = 'aaaaaaaaaeeeeeeeiiiiiiioooooooouuuuuuucccddllnnrrssstzzz';

  const newText = text
    .toLowerCase()
    .split('')
    .map((char) => {
      const index = from.indexOf(char);
      return index !== -1 ? to[index] : char;
    })
    .join('');

  return newText
    .replace(/[^a-z0-9\s-]/g, '') // Odstranit speciální znaky
    .replace(/\s+/g, '-') // Mezery na pomlčky
    .replace(/-+/g, '-') // Vícenásobné pomlčky na jednu
    .replace(/^-|-$/g, ''); // Odstranit pomlčky na začátku/konci
}

/**
 * Vygeneruje unique ID (6 znaků, URL-safe)
 * Lepší než číselné ID - vypadá profesionálněji
 */
export function generateUniqueId(): string {
  return nanoid(6); // Např: "x7k2p9"
}

interface ProfileSlugData {
  name: string;
  age?: number;
  city: string;
  category: 'HOLKY_NA_SEX' | 'EROTICKE_MASERKY' | 'DOMINA' | 'DIGITALNI_SLUZBY';
}

/**
 * Vygeneruje SEO slug pro profil
 *
 * Formát: /profil/lucie-praha-x7k2p9
 *
 * Výhody oproti konkurenci:
 * - Jednoduchý a čitelný
 * - Obsahuje město → Lokální SEO boost
 * - Unique ID místo čísla → Profesionálnější
 * - Kratší než konkurence → Lepší UX
 *
 * @example
 * generateProfileSlug({
 *   name: "Lucie",
 *   city: "Praha",
 *   category: "HOLKY_NA_SEX"
 * })
 * // Returns: "lucie-praha-x7k2p9"
 */
export function generateProfileSlug(data: ProfileSlugData, uniqueId?: string): string {
  const namePart = slugify(data.name);
  const cityPart = slugify(data.city);
  const idPart = uniqueId || generateUniqueId();

  // Formát: jmeno-mesto-id (jednoduchý a efektivní)
  return `${namePart}-${cityPart}-${idPart}`;
}

interface BusinessSlugData {
  name: string;
  city: string;
  profileType: 'PRIVAT' | 'MASSAGE_SALON' | 'ESCORT_AGENCY' | 'SWINGERS_CLUB' | 'NIGHT_CLUB' | 'STRIP_CLUB';
}

/**
 * Vygeneruje SEO slug pro podnik
 *
 * Formát: /podnik/relax-salon-praha-x7k2p9
 *
 * @example
 * generateBusinessSlug({
 *   name: "Relax Salon Paradise",
 *   city: "Praha",
 *   profileType: "MASSAGE_SALON"
 * })
 * // Returns: "relax-salon-paradise-praha-x7k2p9"
 */
export function generateBusinessSlug(data: BusinessSlugData, uniqueId?: string): string {
  const namePart = slugify(data.name);
  const cityPart = slugify(data.city);
  const idPart = uniqueId || generateUniqueId();

  // Formát: jmeno-mesto-id (konzistentní s profily)
  return `${namePart}-${cityPart}-${idPart}`;
}

/**
 * Parsuje slug a vrátí informace
 *
 * @example
 * parseProfileSlug("lucie-praha-x7k2p9")
 * // Returns: { name: "lucie", city: "praha", id: "x7k2p9" }
 *
 * parseProfileSlug("marie-anna-brno-abc123")
 * // Returns: { name: "marie-anna", city: "brno", id: "abc123" }
 */
export function parseProfileSlug(slug: string): {
  name: string;
  city: string;
  id: string;
} | null {
  // Formát: jmeno-mesto-id
  // Poslední část je vždy ID (6 znaků)
  // Předposlední část je město
  // Vše ostatní je jméno

  const parts = slug.split('-');
  if (parts.length < 3) return null; // Minimálně 3 části: name-city-id

  const id = parts[parts.length - 1];
  const city = parts[parts.length - 2];
  const name = parts.slice(0, -2).join('-'); // Vše kromě posledních 2 částí

  // Validace ID (mělo by být 6 znaků alfanumerických)
  if (id.length !== 6) return null;

  return { name, city, id };
}

/**
 * Zkontroluje, jestli slug již existuje v databázi
 * (Tuto funkci implementovat v API route s Prisma)
 */
export async function checkSlugExists(slug: string, type: 'profile' | 'business'): Promise<boolean> {
  // TODO: Implementovat kontrolu v databázi
  // const exists = await prisma.profile.findUnique({ where: { slug } });
  // return !!exists;
  return false;
}

/**
 * Vygeneruje unique slug s kontrolou duplicit
 * Pokud slug existuje, vygeneruje nový s jiným ID
 */
export async function generateUniqueSlug(
  data: ProfileSlugData | BusinessSlugData,
  type: 'profile' | 'business',
  maxAttempts: number = 5
): Promise<string> {
  let attempts = 0;
  let slug = '';

  while (attempts < maxAttempts) {
    if (type === 'profile') {
      slug = generateProfileSlug(data as ProfileSlugData);
    } else {
      slug = generateBusinessSlug(data as BusinessSlugData);
    }

    const exists = await checkSlugExists(slug, type);
    if (!exists) {
      return slug;
    }

    attempts++;
  }

  // Fallback: přidat timestamp
  const timestamp = Date.now().toString(36).slice(-4);
  return `${slug}-${timestamp}`;
}

/**
 * Aktualizuje slug (například když uživatel změní jméno nebo město)
 * Zachová unique ID, aby odkazy fungovaly
 */
export function updateSlug(
  oldSlug: string,
  newData: Partial<ProfileSlugData | BusinessSlugData>,
  type: 'profile' | 'business'
): string {
  // Získat ID ze starého slugu
  const parts = oldSlug.split('-');
  const oldId = parts[parts.length - 1];

  // Vygenerovat nový slug se starým ID
  if (type === 'profile') {
    return generateProfileSlug(newData as ProfileSlugData, oldId);
  } else {
    return generateBusinessSlug(newData as BusinessSlugData, oldId);
  }
}
