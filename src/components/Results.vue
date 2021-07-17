<template>
  <v-card>
    <v-card-title
      >Results
      <v-spacer></v-spacer>
      <v-icon v-if="results.isBestBet" class="ml-1" color="green"
        >mdi-star-face</v-icon
      >
    </v-card-title>
    <v-card-text>
      <number-list-item
        :label="'Kelly Bet'"
        :value="results.bet"
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
        :label="'Average growth rate'"
        :value="results.growthRate"
        :isPercentage="true"
      ></number-list-item>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="show = !show" color="primary lighten" text>
        Details
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <number-list-item
            :label="'Kelly Fraction'"
            :value="results.bankrollFraction"
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
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import NumberListItem from "@/components/NumberListItem";

export default {
  name: "Results",
  props: { results: Object },
  data() {
    return {
      show: false
    };
  },
  components: { NumberListItem }
};
</script>
