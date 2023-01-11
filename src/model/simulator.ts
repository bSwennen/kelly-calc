const DEFAULT_NUM_TIME_STEPS = 100;
import KellyCalc from "./kelly-calc";

export default class Simulator {
  kellyCalc: KellyCalc
  numTimeSteps: number;

  constructor(kellyCalc: KellyCalc, numTimeSteps = DEFAULT_NUM_TIME_STEPS) {
    if (numTimeSteps < 0)
      throw new Error("Number of time steps should be positive");

    this.kellyCalc = kellyCalc;
    this.numTimeSteps = numTimeSteps;
  }

  simulate(numTimeSteps = this.numTimeSteps) {
    const result: number[] = [];
    result.push(this.kellyCalc.getBankroll());

    for (let i = 0; i < numTimeSteps; i++) {
      result.push(this.simulateStep(result[i]));
    }
    return result;
  }

  simulateStep(bankroll: number) {
    if (Math.random() < this.kellyCalc.getAssumedWinChance()) {
      return bankroll * this.kellyCalc.getWinMultiplier();
    }
    return bankroll * this.kellyCalc.getLossMultiplier();
  }
}