'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

// TODO: Replace with actual API types from your review system
interface Review {
  id?: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  helpful?: number;
}

interface ReviewsSectionProps {
  profileId?: number;
  businessId?: string;
  averageRating: string | number;
  totalReviews: number;
  // TODO: Add API endpoint prop when ready
  // apiEndpoint?: string;
}

export default function ReviewsSection({
  profileId,
  businessId,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([
    // TODO: Replace with API call
    // Example: const { data: reviews } = useReviews(profileId || businessId)
    {
      name: 'Jan K.',
      rating: 5,
      date: 'Před 2 dny',
      text: 'Perfektní služby, krásné prostředí a milý personál. Určitě se vrátím!',
      helpful: 12,
    },
    {
      name: 'Petr M.',
      rating: 5,
      date: 'Před týdnem',
      text: 'Skvělé masáže, profesionální přístup. Doporučuji!',
      helpful: 8,
    },
    {
      name: 'Martin S.',
      rating: 4,
      date: 'Před 2 týdny',
      text: 'Velmi příjemné prostředí, čisté a diskrétní. Jen parkování mohlo být lepší.',
      helpful: 5,
    },
  ]);

  // TODO: Implement API integration
  // useEffect(() => {
  //   fetchReviews(profileId || businessId).then(setReviews);
  // }, [profileId, businessId]);

  const handleAddReview = () => {
    // TODO: Implement review submission to API
    console.log('Add review for:', profileId || businessId);
    // Example: submitReview({ profileId, rating, text })
  };

  const handleHelpful = (reviewIndex: number) => {
    // TODO: Implement helpful vote API call
    console.log('Mark helpful:', reviewIndex);
  };

  // Mock rating breakdown data
  // TODO: Calculate from actual reviews when API is connected
  const ratingBreakdown = [
    { stars: 5, count: Math.floor(totalReviews * 0.6), percentage: 60 },
    { stars: 4, count: Math.floor(totalReviews * 0.25), percentage: 25 },
    { stars: 3, count: Math.floor(totalReviews * 0.1), percentage: 10 },
    { stars: 2, count: Math.floor(totalReviews * 0.03), percentage: 3 },
    { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 },
  ];

  return (
    <div className="glass rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Star className="w-7 h-7 text-yellow-400" fill="currentColor" />
          Hodnocení a recenze ({totalReviews})
        </h2>
        <button
          onClick={handleAddReview}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Přidat hodnocení
        </button>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-white/10">
        {/* Overall Rating */}
        <div className="text-center md:col-span-1">
          <div className="text-6xl font-bold mb-2">{averageRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" />
            ))}
          </div>
          <p className="text-gray-400">Na základě {totalReviews} hodnocení</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-2 space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{item.stars} hvězd</span>
              <div className="flex-1 h-3 bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400 w-12 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-dark-800/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold mb-1">{review.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleHelpful(index)}
                  className="flex items-center gap-1 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful && <span className="text-xs">{review.helpful}</span>}
                </button>
              </div>
              <p className="text-gray-300">{review.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Zatím žádné recenze</p>
            <button
              onClick={handleAddReview}
              className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all"
            >
              Buďte první, kdo přidá hodnocení
            </button>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {reviews.length > 0 && (
        <div className="text-center mt-6">
          <button className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all">
            Zobrazit všechna hodnocení ({totalReviews})
          </button>
        </div>
      )}

      {/* API Integration Notes (hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-400">
          <p className="font-semibold mb-2">🔧 API Integration TODO:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            <li>Connect to review API endpoint</li>
            <li>Profile ID: {profileId || 'N/A'}</li>
            <li>Business ID: {businessId || 'N/A'}</li>
            <li>Implement fetchReviews()</li>
            <li>Implement submitReview()</li>
            <li>Implement markHelpful()</li>
          </ul>
        </div>
      )}
    </div>
  );
}
