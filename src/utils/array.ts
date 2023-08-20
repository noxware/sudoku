export function areUnique(array: any[]): boolean {
  return array.length === new Set(array).size;
}
