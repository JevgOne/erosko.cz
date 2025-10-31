# 🚀 Nasazení erosko.cz s PRÁZDNOU databází

## ✅ Co je připraveno:

- ✅ Kód v GitHubu: `github.com/JevgOne/erosko.cz`
- ✅ Build funguje bez chyb
- ✅ Neon databáze vytvořena: `erosko-production`
- ✅ TopProfiles.tsx data (v kódu) - zobrazí se automaticky

---

## 🎯 NASAZENÍ - 3 JEDNODUCHÉ KROKY

### KROK 1: Získej Connection String z Neonu

1. Jdi na https://console.neon.tech
2. Otevři projekt **erosko-production**
3. Klikni na **Connect**
4. Zkopíruj **Connection String**:
   ```
   postgresql://neondb_owner:npg_xxxxx@ep-xxxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
5. **ULOŽ SI HO!**

---

### KROK 2A: Nasazení na Vercel (doporučeno pro test)

1. Jdi na https://vercel.com/new
2. **Import Git Repository** → `JevgOne/erosko.cz`
3. **Environment Variables** - přidej tyto 4:

```
DATABASE_URL
<tvůj-connection-string-z-kroku-1>

AUTH_SECRET
XYc2d4aYyGwwBjq4/4ibSFWgtOg9C/g2xDtqMTVQ56w=

AUTH_TRUST_HOST
true

NEXT_PUBLIC_APP_URL
https://erosko.cz
```

4. Klikni **Deploy** 🚀

---

### KROK 2B: Nasazení na Hostinger

#### Požadavky:
- Business nebo Premium plán (Node.js podpora)
- SSH přístup

#### Postup:

1. **Přihlaš se přes SSH**:
   ```bash
   ssh u123456@server.hostinger.com
   ```

2. **Naklonuj projekt**:
   ```bash
   cd domains/erosko.cz/public_html
   git clone https://github.com/JevgOne/erosko.cz.git .
   ```

3. **Vytvoř .env soubor**:
   ```bash
   nano .env
   ```

   Vlož:
   ```
   DATABASE_URL="<connection-string-z-neonu>"
   AUTH_SECRET="XYc2d4aYyGwwBjq4/4ibSFWgtOg9C/g2xDtqMTVQ56w="
   AUTH_TRUST_HOST=true
   NEXT_PUBLIC_APP_URL="https://erosko.cz"
   ```

   Ulož: `Ctrl+O`, `Enter`, `Ctrl+X`

4. **Nainstaluj dependencies**:
   ```bash
   npm install
   ```

5. **Build projekt**:
   ```bash
   npm run build
   ```

6. **Nastav Node.js aplikaci** v Hostinger panelu:
   - Website → Advanced → Node.js
   - Application mode: **Production**
   - Application root: `/domains/erosko.cz/public_html`
   - Application URL: `erosko.cz`
   - Application startup file: `server.js` nebo `npm start`
   - Node.js version: **18** nebo **20**

---

### KROK 3: Vytvoř strukturu databáze (POUZE migrace, BEZ seedu!)

Po nasazení spusť **POUZE migrace** (vytvoří tabulky, ale NEpřidá testovací data):

```bash
# Nastav DATABASE_URL
export DATABASE_URL="<connection-string-z-neonu>"

# Spusť POUZE migrace (vytvoří prázdné tabulky)
npx prisma migrate deploy
```

**DŮLEŽITÉ:** **NESPOUŠTĚJ** `npm run db:seed` - to by přidalo testovací data!

---

## 📊 CO BUDE NA WEBU:

| Část | Stav | Zdroj |
|------|------|-------|
| **Design/Layout** | ✅ Funguje | Kód |
| **Stránky** | ✅ Funguje | Kód |
| **TopProfiles data** | ✅ Zobrazí se | Kód (TopProfiles.tsx) |
| **Formuláře** | ✅ Fungují | Kód |
| **Registrace/Přihlášení** | ✅ Funguje | Kód + DB |
| **Databáze** | ✅ Prázdná | Neon (jen struktura) |
| **Admin účty** | ❌ Žádné | Musíš vytvořit přes registraci |

---

## 🔐 Vytvoření prvního admin účtu

Po nasazení:

1. Otevři `https://erosko.cz/registrace`
2. Zaregistruj se jako admin
3. Email se uloží do **prázdné** Neon databáze
4. Přihlaš se přes `/prihlaseni`

**Databáze bude čistá** - žádné testovací profily!

---

## 🎨 Co se zobrazí uživatelům:

- ✅ Homepage s TopProfiles.tsx daty (Lucie, Anastasia, atd.)
- ✅ Všechny kategorie fungují
- ✅ Vyhledávání funguje
- ✅ Filtry fungují
- ✅ Formuláře fungují
- ❌ **Admin panel** - musíš se nejdřív zaregistrovat

---

## 🔄 Přidání skutečných profilů

Později když budeš chtít přidat **skutečné profily** (ne TopProfiles.tsx mock data):

### Varianta A: Přes Admin Panel (když bude hotový)
- Dashboard → Přidat profil

### Varianta B: Přes Databázi (Neon)
1. Jdi na https://console.neon.tech
2. Otevři projekt → **SQL Editor**
3. Spusť SQL příkazy pro vložení profilů

### Varianta C: Import z CSV/JSON
- Vytvoř import script
- Spustíš: `node import-profiles.js`

---

## 📋 Checklist před spuštěním

- [ ] Neon databáze vytvořena
- [ ] Connection String zkopírován
- [ ] Projekt nasazen (Vercel/Hostinger)
- [ ] Environment Variables nastaveny
- [ ] Migrace spuštěny (`npx prisma migrate deploy`)
- [ ] ❌ **SEED NESPUŠTĚN** (`npm run db:seed` - PŘESKOČIT!)
- [ ] Web otevřen a funguje
- [ ] TopProfiles data se zobrazují
- [ ] Registrace funguje

---

## ⚠️ DŮLEŽITÉ

### NESPOUŠTĚJ:
❌ `npm run db:seed` - přidá testovací data!
❌ `npx prisma db push --force-reset` - smaže databázi!

### SPOUŠTĚJ POUZE:
✅ `npx prisma migrate deploy` - vytvoří strukturu DB
✅ `npm run build` - build projektu
✅ `npm start` - spustí server

---

## 🆘 Problémy?

### TopProfiles se nezobrazují
- Zkontroluj že build prošel
- TopProfiles.tsx je v kódu - mělo by fungovat automaticky

### Databáze error
- Zkontroluj DATABASE_URL
- Zkontroluj že migrace proběhly: `npx prisma migrate deploy`

### Registrace nefunguje
- Zkontroluj AUTH_SECRET je nastavený
- Zkontroluj že migrace vytvořily tabulku User

---

✅ **HOTOVO! erosko.cz běží s prázdnou databází a TopProfiles.tsx daty!**
