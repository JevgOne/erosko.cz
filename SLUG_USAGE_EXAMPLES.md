# 📘 Jak používat Slug Generator - Praktické příklady

## 🎯 Kdy se slug generuje?

Slug se **automaticky vygeneruje** při:
1. ✅ Vytvoření nového profilu
2. ✅ Vytvoření nového podniku
3. ✅ Aktualizaci jména nebo města (optional)

---

## 📝 Příklad 1: Vytvoření profilu s automatickým slugem

```typescript
// app/api/profiles/create/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateProfileSlug } from '@/lib/slug-generator';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Vygenerovat SEO-friendly slug
    const slug = generateProfileSlug({
      name: data.name,
      city: data.city,
      category: data.category
    });

    // 2. Zkontrolovat, jestli slug již neexistuje
    // (nanoid má velmi nízkou kolizní pravděpodobnost, ale pro jistotu)
    const existingProfile = await prisma.profile.findUnique({
      where: { slug }
    });

    let finalSlug = slug;
    if (existingProfile) {
      // Málo pravděpodobné, ale vygenerujeme nový
      finalSlug = generateProfileSlug({
        name: data.name,
        city: data.city,
        category: data.category
      });
    }

    // 3. Vytvořit profil s slugem
    const profile = await prisma.profile.create({
      data: {
        name: data.name,
        slug: finalSlug, // ← SEO slug: "lucie-praha-x7k2p9"
        age: data.age,
        city: data.city,
        phone: data.phone,
        category: data.category,
        profileType: data.profileType,
        location: data.location,
        ownerId: data.ownerId,
        // ... další pole
      }
    });

    // 4. Vrátit profil s URL
    return NextResponse.json({
      success: true,
      profile,
      url: `/profil/${finalSlug}` // ← Hotová URL!
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}
```

**Output:**
```json
{
  "success": true,
  "profile": {
    "id": "cluv...",
    "name": "Lucie",
    "slug": "lucie-praha-x7k2p9",
    "city": "Praha",
    ...
  },
  "url": "/profil/lucie-praha-x7k2p9"
}
```

---

## 🏢 Příklad 2: Vytvoření podniku

```typescript
// app/api/businesses/create/route.ts

import { generateBusinessSlug } from '@/lib/slug-generator';

export async function POST(req: Request) {
  const data = await req.json();

  // Vygenerovat business slug
  const slug = generateBusinessSlug({
    name: data.name,
    city: data.city,
    profileType: data.profileType
  });

  const business = await prisma.business.create({
    data: {
      name: data.name,
      slug, // "relax-salon-praha-x7k2p9"
      city: data.city,
      profileType: data.profileType,
      // ... další pole
    }
  });

  return NextResponse.json({
    success: true,
    business,
    url: `/podnik/${slug}`
  });
}
```

---

## 🔄 Příklad 3: Aktualizace jména/města (zachování ID)

```typescript
// app/api/profiles/[id]/update/route.ts

import { updateSlug } from '@/lib/slug-generator';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  // Najít existující profil
  const existingProfile = await prisma.profile.findUnique({
    where: { id: params.id }
  });

  if (!existingProfile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Pokud se změnilo jméno nebo město, aktualizovat slug
  let newSlug = existingProfile.slug;

  if (data.name !== existingProfile.name || data.city !== existingProfile.city) {
    // Zachovat unique ID ze starého slugu
    newSlug = updateSlug(
      existingProfile.slug, // Starý slug
      {
        name: data.name || existingProfile.name,
        city: data.city || existingProfile.city,
        category: existingProfile.category
      },
      'profile'
    );

    // Příklad:
    // Starý slug: "lucie-praha-x7k2p9"
    // Nové jméno: "Lucy"
    // Nový slug:  "lucy-praha-x7k2p9" (stejné ID!)
  }

  // Aktualizovat profil
  const updatedProfile = await prisma.profile.update({
    where: { id: params.id },
    data: {
      ...data,
      slug: newSlug
    }
  });

  return NextResponse.json({
    success: true,
    profile: updatedProfile,
    url: `/profil/${newSlug}`
  });
}
```

**Proč zachovat ID?**
- ✅ Staré odkazy pořád fungují (díky 301 redirect)
- ✅ Analytika zůstává konzistentní
- ✅ Backlinky zůstávají platné

---

## 🔍 Příklad 4: Najít profil podle slugu

```typescript
// app/profil/[slug]/page.tsx

import { prisma } from '@/lib/prisma';
import { parseProfileSlug } from '@/lib/slug-generator';

export default async function ProfilePage({
  params
}: {
  params: { slug: string }
}) {
  // 1. Najít profil podle slugu
  const profile = await prisma.profile.findUnique({
    where: { slug: params.slug },
    include: {
      photos: true,
      reviews: true,
      services: true,
    }
  });

  if (!profile) {
    return <div>Profil nenalezen</div>;
  }

  // 2. Optional: Parsovat informace ze slugu
  const slugInfo = parseProfileSlug(params.slug);
  // slugInfo = { name: "lucie", city: "praha", id: "x7k2p9" }

  // 3. Zobrazit profil
  return (
    <div>
      <h1>{profile.name} - {profile.city}</h1>
      <p>URL: /profil/{params.slug}</p>
      {/* ... zbytek profilu */}
    </div>
  );
}
```

---

## 📊 Příklad 5: Generování sitemap s SEO slugs

```typescript
// app/sitemap.ts

import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://erosko.cz';

  // Načíst všechny profily
  const profiles = await prisma.profile.findMany({
    where: { approved: true },
    select: {
      slug: true,
      updatedAt: true,
    }
  });

  // Načíst všechny podniky
  const businesses = await prisma.business.findMany({
    where: { approved: true },
    select: {
      slug: true,
      updatedAt: true,
    }
  });

  // Vytvořit sitemap entries
  const profileEntries = profiles.map((profile) => ({
    url: `${baseUrl}/profil/${profile.slug}`, // ← SEO slug!
    lastModified: profile.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const businessEntries = businesses.map((business) => ({
    url: `${baseUrl}/podnik/${business.slug}`, // ← SEO slug!
    lastModified: business.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...profileEntries,
    ...businessEntries,
  ];
}
```

**Output sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://erosko.cz/profil/lucie-praha-x7k2p9</loc>
    <lastmod>2025-11-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://erosko.cz/profil/kristyna-brno-m3n8p2</loc>
    <lastmod>2025-11-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... další profily -->
</urlset>
```

---

## 🔀 Příklad 6: 301 Redirects (migrace ze starých URL)

```typescript
// middleware.ts (nebo app/profil/[id]/route.ts pro redirect)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function middleware(request: Request) {
  const url = new URL(request.url);

  // Detekce starého formátu: /profil/123 (číselné ID)
  const pathMatch = url.pathname.match(/^\/profil\/(\d+)$/);

  if (pathMatch) {
    const oldId = pathMatch[1];

    // Najít profil podle starého ID a získat nový slug
    const profile = await prisma.profile.findUnique({
      where: { id: oldId },
      select: { slug: true }
    });

    if (profile) {
      // 301 redirect na novou URL
      return NextResponse.redirect(
        `${url.origin}/profil/${profile.slug}`,
        { status: 301 } // ← Permanent redirect (SEO friendly)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/profil/:path*',
};
```

**Výsledek:**
```
https://erosko.cz/profil/123
    ↓ 301 redirect
https://erosko.cz/profil/lucie-praha-x7k2p9
```

**Proč 301?**
- ✅ Zachová SEO hodnotu backlinků
- ✅ Informuje Google o nové URL
- ✅ Uživatelé automaticky přesměrováni

---

## 🧪 Příklad 7: Testování slug generátoru

```typescript
// __tests__/slug-generator.test.ts

import {
  generateProfileSlug,
  generateBusinessSlug,
  parseProfileSlug,
  slugify
} from '@/lib/slug-generator';

describe('Slug Generator', () => {
  it('should generate profile slug with correct format', () => {
    const slug = generateProfileSlug({
      name: 'Lucie',
      city: 'Praha',
      category: 'HOLKY_NA_SEX'
    });

    // Formát: jmeno-mesto-id
    expect(slug).toMatch(/^lucie-praha-[a-z0-9]{6}$/);
  });

  it('should handle special characters in names', () => {
    const slug = generateProfileSlug({
      name: 'Kateřina Nováková',
      city: 'České Budějovice',
      category: 'EROTICKE_MASERKY'
    });

    // Mělo by být: katerina-novakova-ceske-budejovice-x7k2p9
    expect(slug).toMatch(/^katerina-novakova-ceske-budejovice-[a-z0-9]{6}$/);
  });

  it('should handle multiple word names', () => {
    const slug = generateProfileSlug({
      name: 'Marie Anna',
      city: 'Brno',
      category: 'DOMINA'
    });

    expect(slug).toMatch(/^marie-anna-brno-[a-z0-9]{6}$/);
  });

  it('should parse slug correctly', () => {
    const parsed = parseProfileSlug('lucie-praha-x7k2p9');

    expect(parsed).toEqual({
      name: 'lucie',
      city: 'praha',
      id: 'x7k2p9'
    });
  });

  it('should parse multi-word names correctly', () => {
    const parsed = parseProfileSlug('marie-anna-brno-abc123');

    expect(parsed).toEqual({
      name: 'marie-anna', // Správně spojeno!
      city: 'brno',
      id: 'abc123'
    });
  });

  it('should generate business slug correctly', () => {
    const slug = generateBusinessSlug({
      name: 'Relax Salon Paradise',
      city: 'Praha',
      profileType: 'MASSAGE_SALON'
    });

    expect(slug).toMatch(/^relax-salon-paradise-praha-[a-z0-9]{6}$/);
  });
});
```

---

## 📚 Všechny dostupné funkce

### 1. `slugify(text: string): string`

Převede text na URL-safe slug.

```typescript
slugify("Kateřina Nováková")
// → "katerina-novakova"

slugify("České Budějovice")
// → "ceske-budejovice"

slugify("Miss Luna ★")
// → "miss-luna"
```

### 2. `generateUniqueId(): string`

Vygeneruje 6-znakové unique ID.

```typescript
generateUniqueId()
// → "x7k2p9"

generateUniqueId()
// → "a3b5c7"
```

### 3. `generateProfileSlug(data, uniqueId?): string`

Hlavní funkce pro profily.

```typescript
generateProfileSlug({
  name: "Lucie",
  city: "Praha",
  category: "HOLKY_NA_SEX"
})
// → "lucie-praha-x7k2p9"

// S vlastním ID (pro testing)
generateProfileSlug({
  name: "Lucie",
  city: "Praha",
  category: "HOLKY_NA_SEX"
}, "test123")
// → "lucie-praha-test123"
```

### 4. `generateBusinessSlug(data, uniqueId?): string`

Pro podniky.

```typescript
generateBusinessSlug({
  name: "Relax Salon",
  city: "Praha",
  profileType: "MASSAGE_SALON"
})
// → "relax-salon-praha-x7k2p9"
```

### 5. `parseProfileSlug(slug: string)`

Parsuje slug na komponenty.

```typescript
parseProfileSlug("lucie-praha-x7k2p9")
// → { name: "lucie", city: "praha", id: "x7k2p9" }
```

### 6. `updateSlug(oldSlug, newData, type)`

Aktualizuje slug (zachová ID).

```typescript
updateSlug(
  "lucie-praha-x7k2p9",
  { name: "Lucy", city: "Praha" },
  'profile'
)
// → "lucy-praha-x7k2p9" (stejné ID!)
```

---

## ✅ Best Practices

### DO ✅

- ✅ Vždy generovat slug při vytvoření profilu
- ✅ Ukládat slug do databáze
- ✅ Používat slug v URL místo číselného ID
- ✅ Implementovat 301 redirects pro staré URL
- ✅ Validovat slug před uložením

### DON'T ❌

- ❌ Negenerovat slug ručně
- ❌ Neměnit slug často (špatné pro SEO)
- ❌ Nepoužívat slug bez validace
- ❌ Nezapomenout na 301 redirects při změně

---

## 🎯 Shrnutí

**Naše URL:**
```
/profil/lucie-praha-x7k2p9
        ↑     ↑      ↑
      jméno  město  unique
```

**Výhody:**
- ✅ SEO-friendly (město v URL!)
- ✅ Čitelné
- ✅ Unique (žádné duplicity)
- ✅ Automatické generování
- ✅ Lepší než konkurence

**Použití:**
```typescript
// Vytvoření
const slug = generateProfileSlug({name, city, category});

// Uložení
await prisma.profile.create({ data: { slug, ...} });

// Použití v URL
<Link href={`/profil/${slug}`}>

// Najít podle slugu
await prisma.profile.findUnique({ where: { slug } });
```

🚀 **Ready to use!**
