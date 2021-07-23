<template>
  <v-card>
    <v-card-title
      >Results
      <v-spacer></v-spacer>
      <v-icon v-if="isBestBet" class="ml-1" color="green">mdi-star-face</v-icon>
    </v-card-title>
    <v-card-text>
      <number-list-item
        :label="'Kelly Bet'"
        :value="kellyCalc.getBet()"
      ></number-list-item>
      <number-list-item
        :label="'Required win chance'"
        :value="kellyCalc.getRequiredWinChance()"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'My win chance'"
        :value="kellyCalc.getAssumedWinChance()"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'Average growth rate'"
        :value="kellyCalc.getBankrollGrowthRate()"
        :isPercentage="true"
      >
      </number-list-item>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="show = !show" color="primary lighten" text>
        Details
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show" color="primary lighten">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <number-list-item
            :label="'Kelly Fraction'"
            :value="kellyCalc.getBankrollFraction()"
            :isPercentage="true"
          ></number-list-item>
          <number-list-item
            :label="'Edge'"
            :value="kellyCalc.getEdge()"
            :isPercentage="true"
          ></number-list-item>
          <number-list-item
            :label="'Average win'"
            :value="kellyCalc.getExpectedWin()"
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
  props: { kellyCalc: Object, isBestBet: Boolean },
  data() {
    return {
      show: false
    };
  },
  components: { NumberListItem }
};
</script>
