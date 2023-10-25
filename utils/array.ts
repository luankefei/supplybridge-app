export const hasIntersection = (array1: any[], array2: any[]) => {
  const set = new Set(array1);
  return array2.some((element) => set.has(element));
};

export const isArraysOverlapped = <T extends string | number = string>(total: T[] | Set<T>, current: T[] | Set<T>): boolean => {
  const _total: T[] = [...total]
  return [...current].some((c) => _total.includes(c))
}