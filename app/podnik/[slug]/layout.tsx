import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import {
  generateBusinessMetaTitle,
  generateBusinessMetaDescription,
  generateBusinessKeywords,
  generateCanonicalUrl,
} from '@/lib/seo-utils';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Najít podnik podle slug v databázi
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
    include: {
      profiles: {
        select: {
          id: true,
          name: true,
        },
      },
      photos: {
        orderBy: {
          order: 'asc',
        },
        take: 1,
      },
    },
  });

  // Fallback pokud podnik není nalezen
  if (!business) {
    return {
      title: 'Podnik nenalezen | EROSKO.CZ',
      description: 'Tento podnik neexistuje nebo byl odstraněn.',
    };
  }

  // Převod dat do formátu pro SEO utility
  const seoData = {
    name: business.name,
    city: business.city,
    profileType: business.profileType,
    rating: 4.5, // Default rating
    reviewCount: 0,
    description: business.description || `Profesionální erotické služby v ${business.city}.`,
  };

  // Generování SEO pomocí našich automatických funkcí
  const title = generateBusinessMetaTitle(seoData);
  const description = generateBusinessMetaDescription(seoData);
  const keywords = generateBusinessKeywords(seoData);
  const canonicalUrl = generateCanonicalUrl('business', params.slug);

  // Get main photo for OG image
  const mainPhoto = business.photos?.[0];
  const ogImage = mainPhoto?.url || '/og-default.jpg';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'EROSKO.CZ',
      locale: 'cs_CZ',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${business.name} - ${business.city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function PodnikLayout({ children }: Props) {
  return <>{children}</>;
}
