// src/utils/date.ts

export function daysAgo(isoDate: string): number {
  const target = new Date(isoDate);
  const now = new Date();

  const diffMs = now.getTime() - target.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
