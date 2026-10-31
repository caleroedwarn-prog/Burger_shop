const priceFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

export function formatPrice(n: number): string {
  return `${priceFormatter.format(n)} XAF`;
}
