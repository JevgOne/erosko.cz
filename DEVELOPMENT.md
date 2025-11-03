# Development Workflow - EROSKO.CZ

## Database Changes (Důležité!)

### ❌ NIKDY nemazat databázi v produkci!

### Správný způsob změny databáze:

#### 1. **Když přidáváte nové pole:**

```prisma
model Business {
  // Nové pole MUSÍ mít default hodnotu nebo být nullable
  approved Boolean @default(false)  // ✅ Správně - má default
  verified Boolean?                  // ✅ Správně - je nullable
  newField String                    // ❌ Špatně - žádný default
}
```

#### 2. **Aplikace změn:**

```bash
# Development (rychlé, ale může způsobit problémy)
npx prisma db push

# Nebo s migracemi (bezpečnější)
npx prisma migrate dev --name popis_zmeny
```

#### 3. **Pokud potřebujete aktualizovat existující záznamy:**

Vytvořte seed script který aktualizuje data:

```typescript
// prisma/update-existing.ts
import prisma from '../lib/prisma';

async function updateExisting() {
  // Nastavit approved=false pro všechny existující podniky
  await prisma.business.updateMany({
    where: { approved: undefined },
    data: { approved: false }
  });
}
```

## Co se stalo dnes:

1. Přidal jsem pole `approved` bez default hodnoty
2. Existující záznamy neměly toto pole
3. Dotazy selhaly protože pole neexistovalo
4. Musel jsem smazat databázi 😞

## Jak se tomu vyhnout příště:

**VŽDY** přidávejte nová pole s:
- `@default(hodnota)` - pro povinná pole
- `?` - pro nullable pole

Příklad:
```prisma
approved Boolean @default(false)  // ✅
verified Boolean?                 // ✅
```

## Aktuální stav:

- ✅ Databáze je čistá s novým schématem
- ✅ Admin účet: admin@erosko.cz / admin123
- ✅ 81 služeb
- ❌ Žádné demo data (musíte se zaregistrovat)

## Příště při změně schématu:

1. Přidat pole s default hodnotou nebo nullable
2. Spustit `npx prisma db push`
3. Hotovo - bez ztráty dat! ✅
