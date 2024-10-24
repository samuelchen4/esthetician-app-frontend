import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Star } from 'lucide-react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertToAMPM(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hourIn12HrFormat = hour % 12 || 12;
  return `${hourIn12HrFormat}:00 ${period}`;
}

export function truncateToOneDecimal(value) {
  return Math.trunc(value * 10) / 10;
}

export function renderStars(rating) {
  const stars = new Array(5)
    .fill(0)
    .map((_, index) => (
      <Star
        size='16'
        className={cn(
          index + 1 <= rating
            ? 'stroke-yellow-400 fill-yellow-400'
            : 'stroke-gray-400 fill-gray-400'
        )}
      />
    ));
  return stars;
}
