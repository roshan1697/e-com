import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    reviewCount?: number;
    size?: 'sm' | 'md';
}

const StarRating = ({ rating, reviewCount, size = 'sm' }: StarRatingProps) => {
    const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const fill = Math.min(Math.max(rating - (star - 1), 0), 1);
                    return (
                        <div key={star} className="relative">
                            <Star className={`${starSize} text-gray-200 fill-gray-200`} />
                            {fill > 0 && (
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: `${fill * 100}%` }}
                                >
                                    <Star className={`${starSize} text-amber-400 fill-amber-400`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {reviewCount !== undefined && (
                <span className="text-xs text-gray-500">
                    {rating.toFixed(1)} ({reviewCount.toLocaleString()})
                </span>
            )}
        </div>
    );
}


export default StarRating