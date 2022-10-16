export function displayNumberSign(number: number): string {
  return number < 0 ? `- ${Math.abs(number)}` : `+ ${Math.abs(number)}`;
}
