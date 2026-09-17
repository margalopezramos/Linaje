export function formatEUR(n: number): string {
  return `${n.toFixed(2).replace('.', ',')} €`;
}
