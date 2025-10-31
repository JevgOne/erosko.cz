# ⚡ RYCHLÝ START - Nasazení erosko.cz na Vercel

## ✅ Co je hotovo

- ✅ Kód je v GitHub: `github.com/JevgOne/erosko.cz`
- ✅ Build funguje bez chyb
- ✅ Všechny TypeScript chyby opraveny
- ✅ Vercel konfigurace připravena
- ✅ Prisma client auto-generace nastavena

## 🚀 3 KROKY K NASAZENÍ

### Krok 1: Vytvoř Neon databázi (2 minuty)

1. Jdi na **https://neon.tech**
2. Přihlaš se přes GitHub
3. Klikni **New Project**
4. Název: `erosko-production`
5. Region: **Europe (Frankfurt)** ⭐
6. **Zkopíruj Connection String** - vypadá takto:
   ```
   postgresql://username:password@ep-xxx-xxx.eu-central-1.aws.neon.tech/neondb
   ```

### Krok 2: Nasaď na Vercel (3 minuty)

1. Jdi na **https://vercel.com/new**
2. Klikni **Import Git Repository**
3. Vyber `JevgOne/erosko.cz`
4. **Před deployem** přidej Environment Variables:

#### POVINNÉ Environment Variables:

```bash
DATABASE_URL
postgresql://..........   (z Kroku 1)

AUTH_SECRET
XYc2d4aYyGwwBjq4/4ibSFWgtOg9C/g2xDtqMTVQ56w=

AUTH_TRUST_HOST
true

NEXT_PUBLIC_APP_URL
https://erosko.cz
```

> **TIP**: AUTH_SECRET jsem už vygeneroval: `XYc2d4aYyGwwBjq4/4ibSFWgtOg9C/g2xDtqMTVQ56w=`

5. Klikni **Deploy** 🚀

### Krok 3: Spusť migrace (2 minuty)

Po úspěšném deployi spusť lokálně:

```bash
# Nastav DATABASE_URL z Neon databáze
export DATABASE_URL="postgresql://username:password@..."

# Spusť migrace
npx prisma migrate deploy

# (Volitelné) Naseeduj testovací data
npm run db:seed
```

## 🌐 Připojení domény erosko.cz

Po nasazení v Vercel dashboardu:

1. **Settings** → **Domains**
2. Přidej `erosko.cz` a `www.erosko.cz`
3. U registrátora domény nastav DNS:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Počkej 5-60 minut na propagaci DNS

## 🎉 Testovací účty

Po spuštění migrací a seedu můžeš použít:

```
Admin:    admin@erosko.cz / admin123
Provider: provider@erosko.cz / provider123
```

## 📊 Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Logs**: Vercel → Your Project → Logs
- **Database**: Neon → Your Project → Monitoring

## ⚠️ DŮLEŽITÉ PRO PRODUKCI

Před spuštěním ostrého provozu:

1. ❌ **Vymaž nebo změň** testovací účty (admin@erosko.cz, provider@erosko.cz)
2. ✅ **Nastav monitoring** (UptimeRobot, Better Uptime)
3. ✅ **Pravidelně zálohuj** databázi (Neon má auto-backup)
4. ✅ **Aktualizuj balíčky**: `npm update`

## 🆘 Problémy?

### Build selhává
```bash
npm run build
# Oprav chyby, commitni a pushni
```

### Databáze se nepřipojí
- Zkontroluj DATABASE_URL
- Ověř že má správný formát pro Neon: `?sslmode=require`
- Zkus: `npx prisma studio`

### Migrace selhávají
```bash
# Zkontroluj připojení
npx prisma db pull

# Force reset (VAROVÁNÍ: smaže data!)
npx prisma migrate reset
```

## 📖 Kompletní dokumentace

Pro podrobné informace viz **DEPLOYMENT.md**

---

**Hotovo!** 🎊 Tvůj erosko.cz je připraven k nasazení!
