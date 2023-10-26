import { isValueDefined } from "./util";

export const hasIntersection = (array1: any[], array2: any[]) => {
  const set = new Set(array1);
  return array2.some((element) => set.has(element));
};

export const isArraysOverlapped = <T extends string | number = string>(total: T[] | Set<T>, current: T[] | Set<T>): boolean => {
  const _total: T[] = [...total]
  return [...current].some((c) => _total.includes(c))
}

export const toArray = <T = any>(value: T | T[] | Set<T> | undefined | null): T[] => {
  if (!isValueDefined(value)) return [];

  try {
    if (Array.isArray(value)) return value;
    return [value as T]
  } catch {
    return [value as T]
  }
};

export const arrayToString = <T extends number | string>(value: T[], joinWith = ', '): string => {
  return value.filter((v) => isValueDefined(v) && v !== "").join(joinWith);
}
