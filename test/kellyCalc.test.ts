import KellyCalc from "../src/model/kelly-calc";
import { test, expect } from "vitest";

const numDigits: number = 6;

const favourableKellyCalc: KellyCalc = new KellyCalc(100, 2, 1 / 0.6);
const unfavourableKellyCalc: KellyCalc = new KellyCalc(100, 2, 10);

test("Should compute bet", () => {
  expect(favourableKellyCalc.getBet()).toBeCloseTo(20, numDigits);
});

test("Should compute required win chance", () => {
  expect(favourableKellyCalc.getRequiredWinChance()).toBeCloseTo(
    0.5,
    numDigits
  );
});

test("Should compute assumed win chance", () => {
  expect(favourableKellyCalc.getAssumedWinChance()).toBeCloseTo(0.6, numDigits);
});

test("Should compute edge", () => {
  expect(favourableKellyCalc.getEdge()).toBeCloseTo(0.1, numDigits);
});

test("Should compute bankroll fraction", () => {
  expect(favourableKellyCalc.getBankrollFraction()).toBeCloseTo(0.2, numDigits);
});

test("Should compute expected win", () => {
  expect(favourableKellyCalc.getExpectedWin()).toBeCloseTo(4, numDigits);
});

test("Should compute growth rate", () => {
  expect(favourableKellyCalc.getBankrollGrowthRate()).toBeCloseTo(
    0.02034,
    numDigits
  );
});

test("Should 0 bet unfavourable bet", () => {
  expect(unfavourableKellyCalc.getBet()).toBeCloseTo(0, numDigits);
});

test("Should throw on negative bankroll", () => {
  expect(() => new KellyCalc(-1, 3, 2)).toThrowError();
});

test("Should throw on invalid odds", () => {
  expect(() => new KellyCalc(1, 1, 2)).toThrowError();
});

test("Should throw on invalid assumed odds", () => {
  expect(() => new KellyCalc(1, 2, 0.9)).toThrowError();
});
