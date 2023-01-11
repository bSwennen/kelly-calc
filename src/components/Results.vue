<template>
  <v-card>
    <v-card-item title="Florida">
      <template v-slot:title>
        <v-icon size="25" v-if="isBestBet" icon="mdi-star-face" color="green"></v-icon>
        Results
      </template>
    </v-card-item>
    <v-card-text>
      <number-list-item :label="'Kelly Bet'" :value="kellyCalc?.getBet()"></number-list-item>
      <number-list-item :label="'Required win chance'" :value="kellyCalc?.getRequiredWinChance()"
        :isPercentage="true"></number-list-item>
      <number-list-item :label="'My win chance'" :value="kellyCalc?.getAssumedWinChance()"
        :isPercentage="true"></number-list-item>
      <number-list-item :label="'Average growth rate'" :value="kellyCalc?.getBankrollGrowthRate()" :isPercentage="true">
      </number-list-item>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="show = !show" color="primary lighten" text>
        Details
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" color="primary lighten">
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <number-list-item :label="'Kelly Fraction'" :value="kellyCalc?.getBankrollFraction()"
            :isPercentage="true"></number-list-item>
          <number-list-item :label="'Edge'" :value="kellyCalc?.getEdge()" :isPercentage="true"></number-list-item>
          <number-list-item :label="'Average win'" :value="kellyCalc?.getExpectedWin()"></number-list-item>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import KellyCalc from "@/model/kelly-calc";
import { PropType } from "vue";
import NumberListItem from "./NumberListItem.vue";

export default {
  name: "Results",
  components: {
    NumberListItem
  },
  props: {
    kellyCalc: Object as PropType<KellyCalc>,
    isBestBet: Boolean
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
