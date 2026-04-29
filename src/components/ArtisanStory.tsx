import { User, MapPin, Award } from 'lucide-react';

interface ArtisanStoryProps {
  artisan?: string;
  story?: string;
  origin?: string;
}

export default function ArtisanStory({ artisan, story, origin }: ArtisanStoryProps) {
  // Default content if not provided
  const defaultArtisan = 'Master Craftsman';
  const defaultStory = 'Each piece is handcrafted by skilled artisans in Jodhpur, Rajasthan, using techniques passed down through generations. The wood is carefully selected, seasoned, and shaped with precision to create furniture that tells a story of heritage and craftsmanship.';
  const defaultOrigin = 'Jodhpur, Rajasthan';

  const displayArtisan = artisan || defaultArtisan;
  const displayStory = story || defaultStory;
  const displayOrigin = origin || defaultOrigin;

  return (
    <div className="bg-sugan-ink text-sugan-bone rounded-2xl p-6">
      <h3 className="font-display text-xl mb-4">The Artisan&apos;s Touch</h3>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-sugan-bone/10 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 text-sugan-gold" />
        </div>
        <div>
          <h4 className="font-body font-medium text-lg">{displayArtisan}</h4>
          <div className="flex items-center gap-2 text-sugan-bone/60 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span className="font-body">{displayOrigin}</span>
          </div>
        </div>
      </div>

      <p className="text-sugan-bone/80 font-body text-sm leading-relaxed mb-4">
        {displayStory}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-sugan-bone/10">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-sugan-gold" />
          <span className="text-sm font-body text-sugan-bone/80">25+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-sugan-gold rounded-full" />
          <span className="text-sm font-body text-sugan-bone/80">Handcrafted</span>
        </div>
      </div>
    </div>
  );
}
