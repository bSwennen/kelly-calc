class KellyCalc {
  constructor(bankroll, odds, winChance) {
    this.bankroll = bankroll;
    this.odds = odds;
    this.winChance = winChance;
  }

  getBet() {
    if (!this.bet) this.compute();

    return this.bet;
  }

  getRequiredWinChance() {
    if (!this.requiredWinChance) this.compute();

    return this.requiredWinChance;
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

  compute() {
    this.requiredWinChance = 1 / this.odds;
    this.edge = this.winChance - this.requiredWinChance;
    this.bankrollFraction = Math.max(
      (this.winChance * this.odds - 1) / (this.odds - 1),
      0
    );
    this.bet = this.bankroll * this.bankrollFraction;
    this.expectedWin = this.bet * (this.winChance * this.odds - 1);
  }
}
module.exports = KellyCalc;
