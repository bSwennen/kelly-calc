const KellyCalc = require("../../src/model/kellyCalc.js");

const tolerance = 1e-6;

const favourableKellyCalc = new KellyCalc(100, 2, 0.6);
const unfavourableKellyCalc = new KellyCalc(100, 2, 0.1);
const zerosKellyCalc = new KellyCalc(0, 0, 0);

test("Should compute bet", () => {
  expect(Math.abs(favourableKellyCalc.getBet() - 20)).toBeLessThan(tolerance);
});

test("Should compute required win chance", () => {
  expect(
    Math.abs(favourableKellyCalc.getRequiredWinChance() - 0.5)
  ).toBeLessThan(tolerance);
});

test("Should compute edge", () => {
  expect(Math.abs(favourableKellyCalc.getEdge() - 0.1)).toBeLessThan(tolerance);
});

test("Should compute bankroll fraction", () => {
  expect(
    Math.abs(favourableKellyCalc.getBankrollFraction() - 0.2)
  ).toBeLessThan(tolerance);
});

test("Should compute expected win", () => {
  expect(Math.abs(favourableKellyCalc.getExpectedWin() - 4)).toBeLessThan(
    tolerance
  );
});

test("Should 0 bet unfavourable Kelly bet", () => {
  expect(Math.abs(unfavourableKellyCalc.getBet() - 0)).toBeLessThan(tolerance);
});

test("Should handle zeros", () => {
  expect(Math.abs(zerosKellyCalc.getBet() - 0)).toBeLessThan(tolerance);
});
