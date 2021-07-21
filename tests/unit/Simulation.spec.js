import Simulator from "../../src/model/simulator.js";
import KellyCalc from "../../src/model/kellyCalc.js";

jest.mock("../../src/model/kellyCalc.js");

let mockKellyCalc;

beforeEach(() => {
  KellyCalc.mockImplementation(() => {
    return {
      getBankroll: () => {
        return 10;
      },
      getAssumedWinChance: () => {
        return 0.6;
      },
      getLossMultiplier: () => {
        return 0.3;
      },
      getWinMultiplier: () => {
        return 5;
      }
    };
  });
  mockKellyCalc = new KellyCalc(10, 3, 2);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
  KellyCalc.mockClear();
});

test("Should create valid output", () => {
  const testSimulator = new Simulator(mockKellyCalc, 1);
  const simulation = testSimulator.simulate();

  expect(simulation).toBeInstanceOf(Array);
  expect(simulation.length).toBe(2);
  expect(simulation[0]).toBe(10);
  expect(simulation[1]).toBeGreaterThanOrEqual(0);
});

test("Should win multiply if bet won", () => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.4);

  const testSimulator = new Simulator(mockKellyCalc, 1);
  const simulation = testSimulator.simulate();

  expect(simulation[1]).toBe(5 * 10);
});

test("Should loss multiply if bet lost", () => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.9);

  const testSimulator = new Simulator(mockKellyCalc, 1);
  const simulation = testSimulator.simulate();

  expect(simulation[1]).toBe(0.3 * 10);
});

test("Should handle 0 time steps", () => {
  const testSimulator = new Simulator(mockKellyCalc, 0);
  const simulation = testSimulator.simulate();

  expect(simulation.length).toBe(1);
  expect(simulation[0]).toBe(10);
});

test("Should throw for negative time steps", () => {
  expect(() => new Simulator(mockKellyCalc, -1)).toThrowError();
});
