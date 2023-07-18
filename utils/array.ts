export const hasIntersection = (array1: any[], array2: any[]) => {
  const set = new Set(array1);
  return array2.some((element) => set.has(element));
};
