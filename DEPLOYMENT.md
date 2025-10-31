# 🚀 Erosko.cz - Návod na nasazení

## 📋 Co potřebuješ

1. **PostgreSQL databázi** (libovolný poskytovatel)
2. **Node.js hosting** podporující Next.js 14
3. **Doménu** (erosko.cz)

---

## 🎯 Doporučené řešení (ZDARMA pro start)

### Option 1: Vercel + Neon (Nejjednodušší)
- **Hosting**: Vercel (ZDARMA)
- **Databáze**: Neon.tech (ZDARMA 512 MB)
- **Cena**: 0 Kč/měsíc

### Option 2: Jakýkoliv hosting s Node.js
- Např. DigitalOcean, Heroku, Railway, Render
- PostgreSQL databáze (Supabase, ElephantSQL, vlastní)

---

## 📦 Příprava projektu

### 1. Build projektu
```bash
npm run build
```

### 2. Environment variables (.env.production)
```env
# Databáze (změň na tvou production databázi!)
DATABASE_URL="postgresql://user:password@host:5432/erosko_prod"

# NextAuth
AUTH_SECRET="vygeneruj-silny-secret-min-32-znaku"
AUTH_TRUST_HOST=true

# URL aplikace
NEXT_PUBLIC_APP_URL="https://erosko.cz"
```

---

## 🌐 Nasazení na Vercel (DOPORUČENO)

### Krok 1: Vytvoř databázi na Neon.tech
1. Jdi na https://neon.tech
2. Sign up (GitHub login)
3. Create new project: "erosko-production"
4. Zkopíruj **Connection String**

### Krok 2: Deploy na Vercel
1. Jdi na https://vercel.com
2. Sign up (GitHub login)
3. **New Project** → Import Git Repository
4. Connect GitHub → Select `erosko.cz` repo
5. **Environment Variables**:
   - `DATABASE_URL` = tvůj connection string z Neonu
   - `AUTH_SECRET` = vygeneruj na https://generate-secret.vercel.app/32
   - `AUTH_TRUST_HOST` = `true`
   - `NEXT_PUBLIC_APP_URL` = `https://erosko.cz`
6. **Deploy!**

### Krok 3: Spusť migrace databáze
```bash
# Lokálně s production DATABASE_URL v .env
npx prisma migrate deploy
npx prisma db seed  # Naplní testovací data
```

### Krok 4: Připoj vlastní doménu
1. V Vercelu: **Settings** → **Domains**
2. Přidej `erosko.cz` a `www.erosko.cz`
3. U registrátora domény nastav DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🖥️ Nasazení na vlastní VPS/Hosting

### 1. Nahrání kódu na server
```bash
# SSH do serveru
ssh user@tvuj-server.com

# Clone repository
git clone https://github.com/tvuj-user/erosko.cz.git
cd erosko.cz

# Install dependencies
npm install

# Build
npm run build
```

### 2. Nastavení environment variables
```bash
# Vytvoř .env.production
nano .env.production

# Vlož:
DATABASE_URL="postgresql://..."
AUTH_SECRET="tvuj-secret"
AUTH_TRUST_HOST=true
NEXT_PUBLIC_APP_URL="https://erosko.cz"
```

### 3. Spuštění databázových migrací
```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4. Spuštění aplikace (PM2)
```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "erosko" -- start

# Auto-restart on server reboot
pm2 startup
pm2 save
```

### 5. Nginx jako reverse proxy
```nginx
server {
    listen 80;
    server_name erosko.cz www.erosko.cz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. SSL certifikát (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d erosko.cz -d www.erosko.cz
```

---

## 🗄️ Databázové migrace

### Vytvoření nové migrace (development)
```bash
npx prisma migrate dev --name popis-zmeny
```

### Aplikování migrací (production)
```bash
npx prisma migrate deploy
```

### Reset databáze (VAROVÁNÍ: smaže všechna data!)
```bash
npx prisma migrate reset
```

---

## 🔒 Bezpečnost

### Důležité před spuštěním!

1. **Změň AUTH_SECRET** v production!
2. **NIKDY** nesdílej .env soubory
3. **Nastav firewall** na serveru
4. **Pravidelně aktualizuj** závislosti: `npm update`
5. **Monitoring**: Nastav uptime monitoring (UptimeRobot ZDARMA)

---

## 📊 Monitorování a údržba

### Logy na Vercelu
- Dashboard → tvůj projekt → Logs

### Logy na vlastním serveru (PM2)
```bash
pm2 logs erosko
pm2 monit
```

### Záloha databáze
```bash
# Neon má automatické zálohy
# Vlastní databáze:
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## 🆘 Řešení problémů

### Aplikace nenaběhne
```bash
# Zkontroluj logy
pm2 logs erosko --lines 100

# Restartuj
pm2 restart erosko
```

### Databázové chyby
```bash
# Zkontroluj connection string
echo $DATABASE_URL

# Ověř že databáze běží
npx prisma db pull
```

### Build selže
```bash
# Vymaž node_modules a .next
rm -rf node_modules .next
npm install
npm run build
```

---

## 📞 Podpora

- **Vercel dokumentace**: https://vercel.com/docs
- **Neon dokumentace**: https://neon.tech/docs
- **Prisma dokumentace**: https://www.prisma.io/docs
- **Next.js dokumentace**: https://nextjs.org/docs

---

## ✅ Checklist před spuštěním

- [ ] PostgreSQL databáze vytvořena
- [ ] DATABASE_URL nastaven
- [ ] AUTH_SECRET vygenerován (min 32 znaků)
- [ ] `npm run build` funguje
- [ ] Migrace aplikovány (`npx prisma migrate deploy`)
- [ ] Testovací data naplněna (`npx prisma db seed`)
- [ ] Doména připojena
- [ ] SSL certifikát aktivní
- [ ] Monitoring nastaven

---

🎉 **Hotovo! Tvůj Erosko.cz je online!**
