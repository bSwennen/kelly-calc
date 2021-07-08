<template>
  <v-card>
    <v-card-title
      >Results
      <v-icon v-if="results.isBestBet" class="mx-auto" color="green"
        >mdi-star-face</v-icon
      >
    </v-card-title>
    <v-card-text>
      <number-list-item
        :label="'Kelly Bet'"
        :value="results.bet"
      ></number-list-item>
      <number-list-item
        :label="'Kelly Fraction'"
        :value="results.bankrollFraction"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'Required win chance'"
        :value="results.requiredWinChance"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'My win chance'"
        :value="results.assumedWinChance"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'Edge'"
        :value="results.edge"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'Average win'"
        :value="results.expectedWin"
      ></number-list-item>
      <number-list-item
        :label="'Average bankroll growth rate'"
        :value="results.growthRate"
        :isPercentage="true"
      ></number-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import NumberListItem from "@/components/NumberListItem";

export default {
  name: "Results",
  props: { results: Object },
  components: { NumberListItem }
};
</script>
