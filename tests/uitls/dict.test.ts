import { addToDict } from "utils/dict";

describe("addToDict", () => {
  it("should add a new key to the dictionary", () => {
    const dict: Record<string, number> = {};
    addToDict(dict, "key1", 1);
    expect(dict).toEqual({ key1: 1 });
  });

  it("should add a value to an existing key in the dictionary", () => {
    const dict: Record<string, number> = { key1: 1 };
    addToDict(dict, "key1", 2);
    expect(dict).toEqual({ key1: 3 });
  });

  it("should work with multiple adds", () => {
    const dict: Record<string, number> = {};
    addToDict(dict, "key1", 1);
    addToDict(dict, "key2", 2);
    expect(dict).toEqual({ key1: 1, key2: 2 });
    addToDict(dict, "key1", 1);
    expect(dict).toEqual({ key1: 2, key2: 2 });
    addToDict(dict, "key1", 105);
    expect(dict).toEqual({ key1: 107, key2: 2 });
  });
});
