<template>
  <v-card class="mx-auto" tile min-height="400">
    <number-list-item :label="'Kelly Bet'" :value="this.bet"></number-list-item>
    <number-list-item
      :label="'Kelly Fraction'"
      :value="this.bankrollFraction"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Required win chance'"
      :value="this.requiredWinChance"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'My win chance'"
      :value="this.assumedWinChance"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Edge'"
      :value="this.edge"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Expected win'"
      :value="this.expectedWin"
    ></number-list-item>
    <number-list-item
      :label="'Bankroll growth rate'"
      :value="this.growthRate"
      :isPercentage="true"
    ></number-list-item>
  </v-card>
</template>

<script>
import NumberListItem from "@/components/NumberListItem";

export default {
  name: "Results",
  props: {
    bet: Number,
    requiredWinChance: Number,
    assumedWinChance: Number,
    edge: Number,
    bankrollFraction: Number,
    expectedWin: Number,
    growthRate: Number
  },
  components: { NumberListItem }
};
</script>
