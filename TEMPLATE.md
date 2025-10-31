# 🎨 Jak použít tento projekt jako TEMPLATE pro další weby

Tento projekt je univerzální kostra pro escort/seznamovací weby. Můžeš ho použít pro další podobné projekty - **stejná funkcionalita, jiný design**.

---

## ✅ Co je hotovo a funguje:

### Backend/Funkcionalita:
- ✅ **Databáze**: PostgreSQL přes Prisma ORM
- ✅ **Autentizace**: NextAuth v5 (registrace, přihlášení, role)
- ✅ **Admin panel**: Správa profilů, uživatelů, statistiky
- ✅ **API**: REST API pro všechny operace
- ✅ **Vyhledávání**: Fulltext search s filtry
- ✅ **Kategorie**: Dynamické kategorie z databáze
- ✅ **Rating & Reviews**: Hodnocení a recenze
- ✅ **Formuláře**: Kontakt, registrace, profil edit
- ✅ **SEO**: Metadata, sitemap, robots.txt

### Frontend struktura:
- ✅ Next.js 14.2 s App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Responzivní design
- ✅ Dark mode ready

---

## 🚀 Jak vytvořit nový web z této kostry

### KROK 1: Naklonuj projekt

```bash
# Vytvoř nový projekt z této kostry
cd /Users/zen
cp -r erosko.cz <novy-web-nazev>
cd <novy-web-nazev>

# Smaž .git a inicializuj nový repo
rm -rf .git
git init
```

### KROK 2: Změň konfiguraci webu

Uprav soubor **`site.config.ts`** (vytvoříme ho):

```typescript
export const siteConfig = {
  name: "Erosko.cz",
  title: "Erosko.cz - Escort služby v ČR",
  description: "Najděte nejlepší escort služby v České republice",
  url: "https://erosko.cz",

  // Branding
  colors: {
    primary: "#E11D48",  // rose-600
    secondary: "#1E293B", // slate-800
  },

  // Kategorie - přizpůsob svému webu
  categories: [
    "Holky na sex",
    "Erotické masérky",
    "Escort Praha",
    "Trans escort",
    "Gigolo",
  ],

  // TopProfiles mock data
  topProfiles: [
    {
      id: 1,
      name: 'Lucie',
      age: 24,
      location: 'Praha 1',
      // ...další data
    }
  ]
}
```

### KROK 3: Změň design/vzhled

**Co ZMĚNIT pro nový web:**

#### A) Barvy (Tailwind CSS)
Uprav `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      // Změň hlavní barvy
      primary: '#E11D48',    // ← Tvoje primární barva
      secondary: '#1E293B',  // ← Tvoje sekundární
    }
  }
}
```

#### B) Logo a favicon
- Vlož nové logo: `public/logo.png`
- Vlož nový favicon: `public/favicon.ico`
- Uprav `app/layout.tsx` - změň metadata

#### C) Layout komponenty
Uprav tyto soubory pro jiný vzhled:

```
components/
├── Header.tsx          ← Změň navigaci, logo
├── Footer.tsx          ← Změň patičku
├── ProfileCard.tsx     ← Změň vzhled karty profilu
└── HeroSection.tsx     ← Změň homepage hero sekci
```

#### D) Homepage
Uprav `app/page.tsx`:
- Změň hero text
- Změň popis webu
- Přizpůsob sekce

#### E) Texty a copy
Najdi a nahraď všechny výskyty "Erosko" nebo "erosko":
```bash
# Najdi všechny soubory s "erosko"
grep -r "erosko" app/ components/ --exclude-dir=node_modules
grep -r "Erosko" app/ components/ --exclude-dir=node_modules
```

### KROK 4: Nová databáze

1. Vytvoř novou Neon databázi na https://neon.tech
2. Zkopíruj Connection String
3. Uprav `.env`:
```bash
DATABASE_URL="<novy-connection-string>"
AUTH_SECRET="<novy-secret>"
NEXT_PUBLIC_APP_URL="https://<nova-domena>"
```

### KROK 5: Spusť migrace

```bash
# Vytvoř strukturu databáze
npx prisma migrate deploy

# (Volitelně) Naseeduj testovací data
npm run db:seed
```

### KROK 6: Test lokálně

```bash
npm install
npm run dev
```

Otevři http://localhost:3000

---

## 📋 Checklist pro nový web

- [ ] Naklonovat projekt do nové složky
- [ ] Smazat `.git` a vytvořit nový repo
- [ ] Vytvořit `site.config.ts` s novým nastavením
- [ ] Změnit barvy v `tailwind.config.ts`
- [ ] Vyměnit logo a favicon
- [ ] Upravit `Header.tsx` a `Footer.tsx`
- [ ] Změnit homepage text v `app/page.tsx`
- [ ] Najít a nahradit všechny výskyty "erosko"
- [ ] Vytvořit novou Neon databázi
- [ ] Nastavit `.env` s novým connection stringem
- [ ] Spustit migrace
- [ ] Test lokálně
- [ ] Nasadit na Vercel/Hostinger

---

## 🎯 Co NEMĚNIT (funkční kostra):

### Backend (už funguje):
- ❌ `prisma/schema.prisma` - databázové schéma
- ❌ `app/api/**/*` - API endpointy
- ❌ `lib/auth.ts` - autentizační logika
- ❌ `lib/db.ts` - Prisma client
- ❌ `actions/**/*` - Server actions
- ❌ `middleware.ts` - Auth middleware

### Komponenty (funkční logika):
- ❌ `components/admin/**/*` - Admin panel logika
- ❌ `components/SearchFilters.tsx` - Filtrovací logika
- ❌ `components/RatingStars.tsx` - Rating systém
- ❌ `app/admin/**/*` - Admin stránky

**Pouze přizpůsob VZHLED těchto komponent, ne funkcionalitu!**

---

## 🔄 Rozdíly mezi weby

| Vlastnost | Erosko.cz | Nový web |
|-----------|-----------|----------|
| **Funkcionalita** | Stejná ✅ | Stejná ✅ |
| **Databáze struktura** | Stejná ✅ | Stejná ✅ |
| **API** | Stejné ✅ | Stejné ✅ |
| **Design** | Originální | **Nový** 🎨 |
| **Barvy** | Rose/Pink | **Nové** 🎨 |
| **Logo** | Erosko | **Nové** 🎨 |
| **Texty** | "Erosko" | **Nový název** 🎨 |
| **Doména** | erosko.cz | **Nová doména** 🎨 |
| **Kategorie** | CZ escort | **Přizpůsobené** 🎨 |

---

## 🛠️ Užitečné příkazy

```bash
# Najdi všechny výskyty "erosko"
grep -ri "erosko" . --exclude-dir={node_modules,.next}

# Nahraď "erosko" za "novyweb"
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/erosko/novyweb/g'

# Zkontroluj build
npm run build

# Push do nového GitHub repo
git remote add origin https://github.com/<user>/<novy-repo>.git
git push -u origin main
```

---

## 📚 Struktura projektu

```
erosko.cz/                    ← TEMPLATE kostra
├── app/                      ← Next.js pages (změň texty)
│   ├── page.tsx              ← Homepage (ZMĚŇ)
│   ├── admin/                ← Admin panel (NEMĚNIT logiku)
│   ├── api/                  ← API routes (NEMĚNIT)
│   └── layout.tsx            ← Layout (ZMĚŇ metadata)
├── components/               ← React komponenty
│   ├── Header.tsx            ← ZMĚŇ design
│   ├── Footer.tsx            ← ZMĚŇ design
│   ├── ProfileCard.tsx       ← ZMĚŇ design
│   └── admin/                ← NEMĚNIT logiku
├── lib/                      ← Utils (NEMĚNIT)
├── prisma/                   ← DB schema (NEMĚNIT)
├── public/                   ← Statické soubory
│   ├── logo.png              ← ZMĚŇ
│   └── favicon.ico           ← ZMĚŇ
├── tailwind.config.ts        ← ZMĚŇ barvy
├── site.config.ts            ← VYTVOŘ a ZMĚŇ
└── .env                      ← ZMĚŇ credentials
```

---

## 💡 Tipy

1. **Vždy testuj lokálně** před nasazením
2. **Používej Git** - commituj často
3. **Nová databáze** pro každý web
4. **Nový AUTH_SECRET** pro každý web
5. **Backupuj** databázi pravidelně

---

✅ **Máš funkční template! Stačí změnit design a texty, backend funguje!**
