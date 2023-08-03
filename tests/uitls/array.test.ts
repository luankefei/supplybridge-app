import { hasIntersection } from "utils/array";

describe("hasIntersection", () => {
  it("should return true if there is an intersection between the two arrays", () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    expect(hasIntersection(array1, array2)).toBe(true);
  });

  it("should return false if there is no intersection between the two arrays", () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    expect(hasIntersection(array1, array2)).toBe(false);
  });

  it("should return true if the two arrays have the same elements", () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(hasIntersection(array1, array2)).toBe(true);
  });

  it("should return false if one of the arrays is empty", () => {
    const array1 = [1, 2, 3];
    const array2: number[] = [];
    expect(hasIntersection(array1, array2)).toBe(false);
  });

  it("should return false if both arrays are empty", () => {
    const array1: number[] = [];
    const array2: number[] = [];
    expect(hasIntersection(array1, array2)).toBe(false);
  });
});
