import { Star } from 'lucide-react';

interface RatingBreakdownProps {
  rating: number;
  reviews: number;
}

export default function RatingBreakdown({ rating, reviews }: RatingBreakdownProps) {
  // Generate mock breakdown data based on overall rating
  const breakdown = [
    { stars: 5, percentage: Math.min(100, rating * 20 - 5) },
    { stars: 4, percentage: Math.min(100, 30 - (rating - 4) * 10) },
    { stars: 3, percentage: Math.min(100, 10 - (rating - 3) * 5) },
    { stars: 2, percentage: Math.min(100, 3) },
    { stars: 1, percentage: Math.min(100, 2) },
  ];

  const aspectRatings = [
    { aspect: 'Quality', rating: Math.min(5, rating + 0.1) },
    { aspect: 'Value for Money', rating: Math.min(5, rating + 0.05) },
    { aspect: 'Appearance', rating: Math.min(5, rating + 0.15) },
    { aspect: 'Durability', rating: Math.min(5, rating - 0.05) },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-sugan-brown/10">
      <h3 className="font-display text-lg text-sugan-brown mb-4">Customer Reviews</h3>

      {/* Overall Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <span className="font-display text-5xl text-sugan-brown">{rating.toFixed(1)}</span>
          <div className="flex items-center justify-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-sugan-gold text-sugan-gold'
                    : 'text-sugan-brown/20'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-sugan-brown/50 font-body mt-1">{reviews} reviews</p>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 space-y-1">
          {breakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <span className="text-xs font-body text-sugan-brown/60 w-3">{item.stars}</span>
              <Star className="w-3 h-3 text-sugan-gold fill-sugan-gold" />
              <div className="flex-1 h-2 bg-sugan-cream rounded-full overflow-hidden">
                <div
                  className="h-full bg-sugan-gold rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs font-body text-sugan-brown/40 w-8">
                {Math.round(item.percentage)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Aspect Ratings */}
      <div className="border-t border-sugan-brown/10 pt-4">
        <p className="text-sm font-body text-sugan-brown/60 mb-3">Based on customer feedback:</p>
        <div className="grid grid-cols-2 gap-3">
          {aspectRatings.map((item) => (
            <div key={item.aspect} className="flex items-center justify-between">
              <span className="text-sm font-body text-sugan-brown">{item.aspect}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-sugan-gold fill-sugan-gold" />
                <span className="text-sm font-body text-sugan-brown font-medium">
                  {item.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
