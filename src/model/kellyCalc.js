class KellyCalc {
  constructor(bankroll, odds, assumedOdds) {
    this.bankroll = bankroll;
    this.odds = odds;
    this.assumedOdds = assumedOdds;
  }

  getBet() {
    if (!this.bet) this.compute();

    return this.bet;
  }

  getRequiredWinChance() {
    if (!this.requiredWinChance) this.compute();

    return this.requiredWinChance;
  }

  getAssumedWinChance() {
    if (!this.assumedWinChance) this.compute();

    return this.assumedWinChance;
  }

  getEdge() {
    if (!this.edge) this.compute();

    return this.edge;
  }

  getBankrollFraction() {
    if (!this.bankrollFraction) this.compute();

    return this.bankrollFraction;
  }

  getExpectedWin() {
    if (!this.expectedWin) this.compute();

    return this.expectedWin;
  }

  getBankrollGrowthRate() {
    if (!this.bankrollGrowthRate) this.compute();

    return this.bankrollGrowthRate;
  }

  compute() {
    if (this.assumedOdds < 1 || this.odds <= 1) {
      this.zeros();

      return;
    }
    this.assumedWinChance = 1 / this.assumedOdds;
    this.requiredWinChance = 1 / this.odds;
    this.edge = this.assumedWinChance - this.requiredWinChance;
    this.unitWin = this.assumedWinChance * this.odds - 1;
    this.bankrollFraction = Math.max(this.unitWin / (this.odds - 1), 0);
    this.bet = this.bankroll * this.bankrollFraction;
    this.expectedWin = this.bet * this.unitWin;
    this.bankrollGrowthRate =
      Math.pow(1 + this.bankrollFraction, this.assumedWinChance) *
        Math.pow(1 - this.bankrollFraction, 1 - this.assumedWinChance) -
      1;
  }

  zeros() {
    this.assumedWinChance = 0;
    this.requiredWinChance = 0;
    this.unitWin = 0;
    this.edge = 0;
    this.bankrollFraction = 0;
    this.bet = 0;
    this.expectedWin = 0;
    this.bankrollGrowthRate = 0;
  }
}
module.exports = KellyCalc;
