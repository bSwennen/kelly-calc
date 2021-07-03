<template>
  <v-card class="mx-auto" tile>
    <number-list-item :label="'Bet'" :value="this.bet"></number-list-item>
    <number-list-item
      :label="'Required win chance'"
      :value="this.requiredWinChance"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Edge'"
      :value="this.edge"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Bankroll Fraction'"
      :value="this.bankrollFraction"
      :isPercentage="true"
    ></number-list-item>
    <number-list-item
      :label="'Expected win'"
      :value="this.expectedWin"
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
    edge: Number,
    bankrollFraction: Number,
    expectedWin: Number
  },
  components: { NumberListItem }
};
</script>
