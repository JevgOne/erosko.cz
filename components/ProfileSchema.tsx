interface ProfileSchemaProps {
  profile: {
    id: number;
    name: string;
    age: number;
    location: string;
    category: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
}

export default function ProfileSchema({ profile }: ProfileSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${profile.name}, ${profile.age}`,
    "description": `Profesionální ${profile.category} v ${profile.location}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profile.location,
      "addressCountry": "CZ"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": profile.rating,
      "reviewCount": profile.reviews
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
