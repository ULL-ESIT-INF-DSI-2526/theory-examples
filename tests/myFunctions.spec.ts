import {describe, test, expect} from "vitest";
import {add} from "../src/index";

describe("Add function tests", () => {
  test("add(1, 7) to be 8", () => {
    expect(add(1, 7)).toBe(8);
  });

  test("add(-10, 3) to be -7", () => {
    expect(add(-10, 3)).toBe(-7);
  });

  test("add(3.51, 4.42) to be 7.9", () => {
    expect(add(3.51, 4.42)).toBeCloseTo(7.9, 1);
  });
});
