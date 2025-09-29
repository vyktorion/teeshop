export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
  }).format(amount);
}

export function formatPrice(price: number, salePrice?: number): {
  original: string;
  sale?: string;
  discount?: number;
} {
  const original = formatCurrency(price);
  
  if (salePrice && salePrice < price) {
    const discount = Math.round(((price - salePrice) / price) * 100);
    return {
      original,
      sale: formatCurrency(salePrice),
      discount,
    };
  }
  
  return { original };
}