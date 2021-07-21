export default class KellyCalc {
  constructor(bankroll, odds, assumedOdds) {
    if (bankroll < 0) throw new Error("Bankroll must be positive");

    if (odds <= 1) throw new Error("Odds must be greater than 1");

    if (assumedOdds < 1) throw new Error("Odds must be at least 1");

    this.bankroll = bankroll;
    this.odds = odds;
    this.assumedOdds = assumedOdds;
  }

  getBankroll() {
    return this.bankroll;
  }

  getRequiredWinChance() {
    if (!this.requiredWinChance)
      this.requiredWinChance = this.odds === 0 ? 0 : 1 / this.odds;

    return this.requiredWinChance;
  }

  getAssumedWinChance() {
    if (!this.assumedWinChance)
      this.assumedWinChance = this.assumedOdds === 0 ? 0 : 1 / this.assumedOdds;

    return this.assumedWinChance;
  }

  getEdge() {
    if (!this.edge)
      this.edge = this.getAssumedWinChance() - this.getRequiredWinChance();

    return this.edge;
  }

  getUnitWin() {
    if (!this.unitWin)
      this.unitWin = this.getAssumedWinChance() * this.odds - 1;

    return this.unitWin;
  }

  getBankrollFraction() {
    if (!this.bankrollFraction)
      this.bankrollFraction =
        this.odds === 1 ? 0 : Math.max(this.getUnitWin() / (this.odds - 1), 0);

    return this.bankrollFraction;
  }

  getWinMultiplier() {
    if (!this.winMultiplier)
      this.winMultiplier = 1 + this.getBankrollFraction() * (this.odds - 1);

    return this.winMultiplier;
  }

  getLossMultiplier() {
    if (!this.lossMultiplier)
      this.lossMultiplier = 1 - this.getBankrollFraction();

    return this.lossMultiplier;
  }

  getBet() {
    if (!this.bet) this.bet = this.bankroll * this.getBankrollFraction();

    return this.bet;
  }

  getBankrollGrowthRate() {
    if (!this.bankrollGrowthRate)
      this.bankrollGrowthRate =
        Math.pow(this.getWinMultiplier(), this.getAssumedWinChance()) *
          Math.pow(this.getLossMultiplier(), 1 - this.getAssumedWinChance()) -
        1;

    return this.bankrollGrowthRate;
  }

  getExpectedWin() {
    if (!this.expectedWin) this.expectedWin = this.getBet() * this.getUnitWin();

    return this.expectedWin;
  }
}
