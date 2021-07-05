const KellyCalc = require("../../src/model/kellyCalc.js");

const numDigits = 6;

const favourableKellyCalc = new KellyCalc(100, 2, 1 / 0.6);
const unfavourableKellyCalc = new KellyCalc(100, 2, 10);
const zerosKellyCalc = new KellyCalc(0, 0, 0);
const onesKellyCalc = new KellyCalc(1, 1, 1);

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

test("Should handle zeros", () => {
  expect(zerosKellyCalc.getBet()).toBeCloseTo(0, numDigits);
});

test("Should handle ones", () => {
  expect(onesKellyCalc.getBet()).toBeCloseTo(0, numDigits);
});
