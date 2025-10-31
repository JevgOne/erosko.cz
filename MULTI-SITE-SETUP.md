# 🌐 Multi-Site Setup - Jak vytvořit další domény

Tento návod ti ukáže, jak z erosko.cz vytvořit další domény s **jiným vzhledem** ale **stejnou funkcionalitou**.

---

## 🎯 Přehled

| Doména | Status | Barvy | Databáze |
|--------|--------|-------|----------|
| **erosko.cz** | ✅ Hotovo | Rose/Pink | erosko-production |
| **diskretni-privat.cz** | 🔜 Připraveno | Blue/Dark | diskretni-production |
| **doména3.cz** | 🔜 Připraveno | Green/Light | domena3-production |
| **doména4.cz** | 🔜 Připraveno | Purple/Elegant | domena4-production |

---

## 🚀 RYCHLÝ START - Vytvoření druhého webu

### KROK 1: Naklonuj projekt

```bash
cd /Users/zen

# Zkopíruj erosko.cz jako diskretni-privat.cz
cp -r erosko.cz diskretni-privat.cz

cd diskretni-privat.cz

# Smaž starý git a vytvoř nový
rm -rf .git
git init
```

### KROK 2: Změň konfiguraci (`site.config.ts`)

```typescript
// diskretni-privat.cz/site.config.ts

export const siteConfig = {
  // Základní info
  name: "Diskrétní Privát",
  title: "Diskrétní Privát - Privátní escort služby",
  description: "Diskrétní privátní escort služby v ČR",
  url: "https://diskretni-privat.cz",

  // Branding - ZMĚŇ BARVY
  colors: {
    primary: "#1D4ED8",    // blue-700 - Modrá (místo růžové)
    secondary: "#0F172A",  // slate-900 - Tmavá
    accent: "#3B82F6",     // blue-500 - Světle modrá
  },

  // Stejné kategorie, kontakt upravit atd.
  // ... zbytek zkopíruj z erosko.cz
}
```

### KROK 3: Změň Tailwind barvy (`tailwind.config.ts`)

```typescript
// diskretni-privat.cz/tailwind.config.ts

theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',    // ← Hlavní modrá
        600: '#2563eb',
        700: '#1d4ed8',    // ← Tmavší modrá
        800: '#1e40af',
        900: '#1e3a8a',
      },
    }
  }
}
```

### KROK 4: Vytvoř novou databázi

1. Jdi na **https://neon.tech**
2. Vytvoř nový projekt: **diskretni-production**
3. Zkopíruj Connection String
4. Uprav `.env`:

```bash
DATABASE_URL="postgresql://....diskretni-production..."
AUTH_SECRET="<vygeneruj-nový-openssl-rand-base64-32>"
NEXT_PUBLIC_APP_URL="https://diskretni-privat.cz"
```

### KROK 5: Nahraď logo a favicon

```bash
# Vlož nové logo
cp /path/to/nove-logo.png public/logo.png

# Vlož nový favicon
cp /path/to/novy-favicon.ico public/favicon.ico
```

### KROK 6: Spusť migrace (prázdná DB)

```bash
cd /Users/zen/diskretni-privat.cz

# Vytvoř strukturu databáze
npx prisma migrate deploy

# ❌ NESPOUŠTĚJ npm run db:seed - databáze zůstane prázdná
```

### KROK 7: Test lokálně

```bash
npm install
npm run dev
```

Otevři http://localhost:3000 a zkontroluj:
- ✅ Barvy jsou modré (ne růžové)
- ✅ Logo a favicon jsou nové
- ✅ Všechny funkce fungují stejně

### KROK 8: Push do GitHubu

```bash
git add .
git commit -m "Initial commit: diskretni-privat.cz"

# Vytvoř nové GitHub repo
gh repo create diskretni-privat.cz --public --source=. --remote=origin --push
```

### KROK 9: Nasaď na Vercel/Hostinger

#### Vercel:
```bash
vercel --prod
```

#### Nebo manuálně:
1. Jdi na https://vercel.com/new
2. Import `diskretni-privat.cz` repo
3. Nastav Environment Variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_APP_URL`

---

## 🎨 Barevné palety pro další domény

### diskretni-privat.cz - Modrá/Tmavá (Diskrétní)
```typescript
colors: {
  primary: "#1D4ED8",    // Modrá
  secondary: "#0F172A",  // Tmavě šedá
  accent: "#3B82F6",     // Světle modrá
}
```

### doména3.cz - Zelená/Příroda (Wellness vibe)
```typescript
colors: {
  primary: "#059669",    // Zelená
  secondary: "#1F2937",  // Šedá
  accent: "#10B981",     // Světle zelená
}
```

### doména4.cz - Fialová/Elegantní (Luxusní)
```typescript
colors: {
  primary: "#7C3AED",    // Fialová
  secondary: "#1E1B4B",  // Tmavě fialová
  accent: "#A78BFA",     // Světle fialová
}
```

### doména5.cz - Oranžová/Teplá (Energická)
```typescript
colors: {
  primary: "#EA580C",    // Oranžová
  secondary: "#292524",  // Hnědá
  accent: "#FB923C",     // Světle oranžová
}
```

---

## 📋 Checklist pro každý nový web

### Design:
- [ ] Změnit `site.config.ts` (název, url, barvy)
- [ ] Změnit `tailwind.config.ts` (barevná paleta)
- [ ] Vyměnit logo (`public/logo.png`)
- [ ] Vyměnit favicon (`public/favicon.ico`)
- [ ] Upravit homepage text (`app/page.tsx`)
- [ ] Změnit metadata v `app/layout.tsx`

### Backend:
- [ ] Vytvořit novou Neon databázi
- [ ] Nastavit nový `.env` soubor
- [ ] Vygenerovat nový `AUTH_SECRET`
- [ ] Spustit migrace (`npx prisma migrate deploy`)

### Deployment:
- [ ] Vytvořit nové GitHub repo
- [ ] Push kódu
- [ ] Nasadit na Vercel/Hostinger
- [ ] Nastavit DNS pro novou doménu

---

## 🔄 Sdílení změn mezi weby

Když vylepšíš **funkcionalitu** na erosko.cz a chceš ji přidat i do diskretni-privat.cz:

### Varianta A: Manuální kopírování

```bash
# Zkopíruj změněný soubor z erosko.cz do diskretni-privat.cz
cp /Users/zen/erosko.cz/app/api/profiles/route.ts /Users/zen/diskretni-privat.cz/app/api/profiles/route.ts

# Commitni a push
cd /Users/zen/diskretni-privat.cz
git add .
git commit -m "feat: Update profiles API from erosko.cz"
git push
```

### Varianta B: Git patches (pokročilé)

```bash
# V erosko.cz vytvoř patch
cd /Users/zen/erosko.cz
git format-patch -1 HEAD --stdout > /tmp/my-feature.patch

# V diskretni-privat.cz aplikuj patch
cd /Users/zen/diskretni-privat.cz
git apply /tmp/my-feature.patch
```

---

## 🗂️ Struktura složek

```
/Users/zen/
├── erosko.cz/                    ← Hlavní doména
│   ├── site.config.ts            (Rose/Pink)
│   └── .env                      (erosko-production DB)
│
├── diskretni-privat.cz/          ← Druhá doména
│   ├── site.config.ts            (Blue/Dark)
│   └── .env                      (diskretni-production DB)
│
├── domena3.cz/                   ← Třetí doména
│   ├── site.config.ts            (Green/Nature)
│   └── .env                      (domena3-production DB)
│
└── domena4.cz/                   ← Čtvrtá doména
    ├── site.config.ts            (Purple/Elegant)
    └── .env                      (domena4-production DB)
```

---

## 🌐 DNS nastavení

Pro každou doménu u registrátora:

```
Type: A
Name: @
Value: 76.76.21.21          (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com (Vercel CNAME)
```

---

## 💾 Databáze - Multi-tenancy

Každý web má **vlastní databázi**:

| Web | Neon projekt | Profily | Samostatné |
|-----|--------------|---------|------------|
| erosko.cz | erosko-production | 500 | ✅ |
| diskretni-privat.cz | diskretni-production | 300 | ✅ |
| domena3.cz | domena3-production | 200 | ✅ |
| domena4.cz | domena4-production | 150 | ✅ |

**Proč separátní databáze?**
- ✅ Každý web může mít jiná data
- ✅ Snadnější správa
- ✅ Nezávislé backupy
- ✅ Lepší výkon

---

## 🚀 Deployment všech webů najednou

```bash
# Script pro deployment všech webů
#!/bin/bash

SITES=("erosko.cz" "diskretni-privat.cz" "domena3.cz" "domena4.cz")

for site in "${SITES[@]}"; do
  echo "Deploying $site..."
  cd "/Users/zen/$site"

  git add .
  git commit -m "Update: $(date +%Y-%m-%d)"
  git push

  vercel --prod
done

echo "✅ All sites deployed!"
```

---

## 🆘 Troubleshooting

### Barvy se nezmění
```bash
# Smaž .next cache
rm -rf .next
npm run dev
```

### Logo se nezobrazí
```bash
# Zkontroluj cestu v Header.tsx
<Image src="/logo.png" ... />
```

### Databáze error
```bash
# Zkontroluj DATABASE_URL v .env
echo $DATABASE_URL

# Zkontroluj že migrace proběhly
npx prisma migrate status
```

---

✅ **Máš připravený systém pro vytváření neomezených webů se stejnou funkcionalitou!**

**Další kroky:**
1. Vytvoř diskretni-privat.cz podle kroků výše
2. Test lokálně
3. Nasaď na Vercel
4. Opakuj pro další domény
