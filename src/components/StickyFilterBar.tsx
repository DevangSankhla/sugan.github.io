import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface StickyFilterBarProps {
  categories: FilterOption[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  totalProducts: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function StickyFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  totalProducts,
  sortBy,
  onSortChange,
}: StickyFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sticky top-20 z-30 bg-sugan-bone/95 backdrop-blur-sm border-b border-sugan-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-sugan-ink/20 font-body text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {selectedCategory && (
              <span className="w-2 h-2 bg-sugan-gold rounded-full" />
            )}
          </button>

          {/* Category Pills (Desktop) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-sugan-ink text-sugan-bone'
                  : 'bg-white text-sugan-ink border border-sugan-ink/20 hover:border-sugan-gold'
              }`}
            >
              All ({totalProducts})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-sugan-ink text-sugan-bone'
                    : 'bg-white text-sugan-ink border border-sugan-ink/20 hover:border-sugan-gold'
                }`}
              >
                {cat.label} {cat.count !== undefined && `(${cat.count})`}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 bg-white rounded-full border border-sugan-ink/20 text-sm font-body focus:outline-none focus:border-sugan-gold"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Mobile Filter Panel */}
        {isExpanded && (
          <div className="md:hidden mt-3 pt-3 border-t border-sugan-ink/10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  onSelectCategory(null);
                  setIsExpanded(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-body ${
                  !selectedCategory
                    ? 'bg-sugan-ink text-sugan-bone'
                    : 'bg-white text-sugan-ink border border-sugan-ink/20'
                }`}
              >
                All ({totalProducts})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsExpanded(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-body ${
                    selectedCategory === cat.id
                      ? 'bg-sugan-ink text-sugan-bone'
                      : 'bg-white text-sugan-ink border border-sugan-ink/20'
                  }`}
                >
                  {cat.label} {cat.count !== undefined && `(${cat.count})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {selectedCategory && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-sugan-ink/60 font-body">Filtered by:</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-sugan-gold/10 text-sugan-ink text-sm font-body rounded-full">
              {categories.find(c => c.id === selectedCategory)?.label}
              <button
                onClick={() => onSelectCategory(null)}
                className="hover:text-sugan-gold"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
