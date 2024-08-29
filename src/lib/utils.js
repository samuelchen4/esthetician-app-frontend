import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertToAMPM(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hourIn12HrFormat = hour % 12 || 12;
  return `${hourIn12HrFormat}:00 ${period}`;
}
