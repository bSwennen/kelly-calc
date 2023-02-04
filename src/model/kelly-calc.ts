export default class KellyCalc {
  bankroll: number;
  assumedOdds: number;
  odds: number;

  requiredWinChance?: number;
  assumedWinChance?: number;
  unitWin?: number;
  edge?: number;
  winMultiplier?: number;
  lossMultiplier?: number;
  bet?: number;
  bankrollGrowthRate?: number;
  expectedWin?: number;
  bankrollFraction?: number;

  constructor(bankroll: number, odds: number, assumedOdds: number) {
    if (bankroll < 0) {
      throw new Error("Bankroll must be positive");
    }
    if (odds <= 1) {
      throw new Error("Odds must be greater than 1");
    }
    if (assumedOdds < 1) {
      throw new Error("Odds must be at least 1");
    }
    this.bankroll = bankroll;
    this.odds = odds;
    this.assumedOdds = assumedOdds;
  }

  getBankroll(): number {
    return this.bankroll;
  }

  getRequiredWinChance(): number {
    if (!this.requiredWinChance) {
      this.requiredWinChance = this.odds === 0 ? 0 : 1 / this.odds;
    }
    return this.requiredWinChance;
  }

  getAssumedWinChance(): number {
    if (!this.assumedWinChance) {
      this.assumedWinChance = this.assumedOdds === 0 ? 0 : 1 / this.assumedOdds;
    }
    return this.assumedWinChance;
  }

  getEdge(): number {
    if (!this.edge) {
      this.edge = this.getAssumedWinChance() - this.getRequiredWinChance();
    }
    return this.edge;
  }

  getUnitWin(): number {
    if (!this.unitWin) {
      this.unitWin = this.getAssumedWinChance() * this.odds - 1;
    }
    return this.unitWin;
  }

  getBankrollFraction(): number {
    if (!this.bankrollFraction) {
      this.bankrollFraction =
        this.odds === 1 ? 0 : Math.max(this.getUnitWin() / (this.odds - 1), 0);
    }
    return this.bankrollFraction;
  }

  getWinMultiplier(): number {
    if (!this.winMultiplier) {
      this.winMultiplier = 1 + this.getBankrollFraction() * (this.odds - 1);
    }
    return this.winMultiplier;
  }

  getLossMultiplier(): number {
    if (!this.lossMultiplier) {
      this.lossMultiplier = 1 - this.getBankrollFraction();
    }
    return this.lossMultiplier;
  }

  getBet(): number {
    if (!this.bet) {
      this.bet = this.bankroll * this.getBankrollFraction();
    }
    return this.bet;
  }

  getBankrollGrowthRate(): number {
    if (!this.bankrollGrowthRate) {
      this.bankrollGrowthRate =
        Math.pow(this.getWinMultiplier(), this.getAssumedWinChance()) *
          Math.pow(this.getLossMultiplier(), 1 - this.getAssumedWinChance()) -
        1;
    }
    return this.bankrollGrowthRate;
  }

  getExpectedWin(): number {
    if (!this.expectedWin) {
      this.expectedWin = this.getBet() * this.getUnitWin();
    }
    return this.expectedWin;
  }
}
