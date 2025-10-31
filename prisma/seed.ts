import { PrismaClient, ProfileType, Category, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.profileService.deleteMany();
  await prisma.service.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.business.deleteMany();
  await prisma.user.deleteMany();

  console.log('✨ Cleared existing data');

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@erosko.cz',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: UserRole.ADMIN,
    },
  });

  // Create provider user
  const providerUser = await prisma.user.create({
    data: {
      email: 'provider@erosko.cz',
      passwordHash: await bcrypt.hash('provider123', 10),
      role: UserRole.PROVIDER,
    },
  });

  console.log('👤 Created users');

  // Create Services
  const services = await Promise.all([
    prisma.service.create({ data: { name: 'Klasický sex', icon: 'Heart' } }),
    prisma.service.create({ data: { name: 'Orální sex', icon: 'Smile' } }),
    prisma.service.create({ data: { name: 'Anální sex', icon: 'Circle' } }),
    prisma.service.create({ data: { name: 'Escort', icon: 'Users' } }),
    prisma.service.create({ data: { name: 'Masáže', icon: 'Hand' } }),
    prisma.service.create({ data: { name: 'BDSM', icon: 'Zap' } }),
    prisma.service.create({ data: { name: 'Webcam', icon: 'Video' } }),
    prisma.service.create({ data: { name: 'Phone sex', icon: 'Phone' } }),
  ]);

  console.log('✅ Created services');

  // Czech cities
  const cities = ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'České Budějovice', 'Hradec Králové'];
  const names = ['Nikola', 'Petra', 'Kateřina', 'Veronika', 'Michaela', 'Tereza', 'Lucie', 'Barbora', 'Anna', 'Lenka'];

  // Create Profiles
  const profiles = [];
  for (let i = 0; i < 30; i++) {
    const city = cities[i % cities.length];
    const name = names[i % names.length];
    const categories = [Category.HOLKY_NA_SEX, Category.EROTICKE_MASERKY, Category.DOMINA, Category.DIGITALNI_SLUZBY];
    const category = categories[i % categories.length];
    const profileTypes = [ProfileType.SOLO, ProfileType.PRIVAT];
    const profileType = profileTypes[i % 2];

    const profile = await prisma.profile.create({
      data: {
        name,
        slug: `${name.toLowerCase()}-${city.toLowerCase()}-${i}`,
        age: 20 + (i % 15),
        description: `Profesionální ${category === Category.HOLKY_NA_SEX ? 'escort' : category === Category.EROTICKE_MASERKY ? 'masérka' : category === Category.DOMINA ? 'domina' : 'poskytovatelka online služeb'} v ${city}. Diskrétní a profesionální služby.`,
        phone: `+420 ${700 + i} ${String(i).padStart(3, '0')} ${String(i * 10).padStart(3, '0')}`,
        email: `${name.toLowerCase()}${i}@example.com`,
        city,
        location: `${city}, centrum`,
        profileType,
        category,
        height: 160 + (i % 20),
        weight: 50 + (i % 20),
        bust: ['85B', '90C', '75A', '95D'][i % 4],
        offersEscort: i % 3 === 0,
        travels: i % 2 === 0,
        hourlyRate: 2000 + (i * 500),
        verified: i % 2 === 0,
        isNew: i < 5,
        isPopular: i % 4 === 0,
        isOnline: i % 3 === 0,
        rating: 3 + Math.random() * 2,
        reviewCount: Math.floor(Math.random() * 50),
        viewCount: Math.floor(Math.random() * 1000),
        ownerId: providerUser.id,
      },
    });

    profiles.push(profile);

    // Add services to profile
    const profileServices = services.slice(0, 3 + (i % 3));
    for (const service of profileServices) {
      await prisma.profileService.create({
        data: {
          profileId: profile.id,
          serviceId: service.id,
        },
      });
    }
  }

  console.log(`✅ Created ${profiles.length} profiles`);

  // Create Businesses
  const businessNames = [
    'Salon Paradise',
    'Privát Venus',
    'Escort Elite',
    'Masáže Relax',
    'Studio Passion',
    'Privát Diamond'
  ];

  for (let i = 0; i < businessNames.length; i++) {
    const city = cities[i % cities.length];
    const name = businessNames[i];
    const profileTypes = [ProfileType.MASSAGE_SALON, ProfileType.PRIVAT, ProfileType.ESCORT_AGENCY];
    const profileType = profileTypes[i % 3];

    const business = await prisma.business.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: `${name} nabízí prémiové služby v ${city}. Moderní prostředí, diskrétní přístup a profesionální personál.`,
        phone: `+420 ${600 + i} ${String(i).padStart(3, '0')} ${String(i * 11).padStart(3, '0')}`,
        email: `info@${name.toLowerCase().replace(/\s+/g, '')}.cz`,
        website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.cz`,
        address: `Ulice ${i+1}, ${city}`,
        city,
        profileType,
        verified: i % 2 === 0,
        isNew: i < 2,
        isPopular: i % 3 === 0,
        rating: 3.5 + Math.random() * 1.5,
        reviewCount: Math.floor(Math.random() * 100),
        viewCount: Math.floor(Math.random() * 2000),
        ownerId: providerUser.id,
      },
    });

    // Create profiles for each business
    for (let j = 0; j < 3; j++) {
      const profileName = names[(i * 3 + j) % names.length];
      await prisma.profile.create({
        data: {
          name: profileName,
          slug: `${profileName.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}-${j}`,
          age: 21 + (j % 10),
          description: `${profileName} pracuje v ${name}. Profesionální přístup a diskrétnost zaručena.`,
          phone: business.phone,
          email: `${profileName.toLowerCase()}@${name.toLowerCase().replace(/\s+/g, '')}.cz`,
          city,
          location: business.address || city,
          profileType: business.profileType,
          category: Category.HOLKY_NA_SEX,
          height: 165 + (j % 15),
          weight: 52 + (j % 15),
          bust: ['85B', '90C', '75A'][j % 3],
          offersEscort: true,
          travels: j % 2 === 0,
          hourlyRate: 3000 + (j * 1000),
          verified: true,
          isNew: i < 2,
          isPopular: i % 2 === 0,
          isOnline: j === 0,
          rating: 4 + Math.random(),
          reviewCount: Math.floor(Math.random() * 30),
          viewCount: Math.floor(Math.random() * 500),
          ownerId: providerUser.id,
          businessId: business.id,
        },
      });
    }
  }

  console.log(`✅ Created ${businessNames.length} businesses with their profiles`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
