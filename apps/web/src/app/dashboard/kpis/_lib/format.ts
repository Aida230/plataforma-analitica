// Helpers de formato simples y explícitos
export const fmtPercent = (n: number) => `${Math.round(n * 100)}%`;

export const fmtCurrency = (n: number, currency: string = 'EUR') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(n);
