const env: any = {};
export const debounce = (fn: any, ms: number = 200) => {
  if (env.timer) clearTimeout(env.timer);
  env.timer = setTimeout(() => {
    env.timer = 0;
    fn();
  }, ms);
};

export const isValueDefined = <T = any>(value: T | undefined | null): boolean => {
  return value !== undefined && value !== null
}
