/**
 *  Adds a value to a dictionary, if the key does not exist, it will be created
 * @param dict - The dictionary to add to
 * @param key  - The key to add to
 * @param valueToAdd  - The value to add to the key
 */
export function addToDict<T extends string | number | symbol>(
  dict: Record<T, number>,
  key: T,
  valueToAdd: number
) {
  if (dict[key] === undefined) {
    dict[key] = valueToAdd;
  } else {
    dict[key] += valueToAdd;
  }
}
