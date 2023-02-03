const DEFAULT_NUM_TIME_STEPS = 100;
import KellyCalc from "./kelly-calc";

export default function simulate(
  kellyCalc: KellyCalc,
  numTimeSteps: number = DEFAULT_NUM_TIME_STEPS
): number[] {
  if (numTimeSteps < 0) {
    throw new Error("Number of time steps should be positive");
  }
  const result: number[] = [];
  result.push(kellyCalc.getBankroll());

  for (let i = 0; i < numTimeSteps; i++) {
    result.push(simulateStep(kellyCalc, result[i]));
  }
  return result;
}

function simulateStep(kellyCalc: KellyCalc, bankroll: number): number {
  if (Math.random() < kellyCalc.getAssumedWinChance()) {
    return bankroll * kellyCalc.getWinMultiplier();
  }
  return bankroll * kellyCalc.getLossMultiplier();
}
