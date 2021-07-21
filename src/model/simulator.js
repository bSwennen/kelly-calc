import KellyCalc from "../../src/model/kellyCalc.js";
const DEFAULT_NUM_TIME_STEPS = 100;

export default class Simulator {
  constructor(kellyCalc, numTimeSteps = DEFAULT_NUM_TIME_STEPS) {
    if (numTimeSteps < 0)
      throw new Error("Number of time steps should be positive");

    this.kellyCalc = kellyCalc;
    this.numTimeSteps = numTimeSteps;
  }

  simulate() {
    const result = [];
    result.push(this.kellyCalc.getBankroll());

    for (let i = 0; i < this.numTimeSteps; i++)
      result.push(this.simulateStep(result[i]));

    return result;
  }

  simulateStep(bankroll) {
    if (Math.random() < this.kellyCalc.getAssumedWinChance())
      return bankroll * this.kellyCalc.getWinMultiplier();

    return bankroll * this.kellyCalc.getLossMultiplier();
  }
}
