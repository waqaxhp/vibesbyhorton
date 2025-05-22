// lib/card-format.ts
export function formatCreditCardNumber(value: string): string {
  const cleaned = value.replace(/\D+/g, "");
  const match = cleaned.match(/.{1,4}/g);
  return match ? match.join(" ") : cleaned;
}
