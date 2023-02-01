<template>
  <v-card>
    <v-card-item>
      <template v-slot:title>
        <v-icon
          size="25"
          v-if="isBestBet"
          icon="mdi-star-face"
          color="green"
        ></v-icon>
        Results
      </template>
    </v-card-item>
    <v-card-text>
      <number-list-item
        :label="'Kelly Bet'"
        :value="kellyCalc?.getBet() ?? 0"
      ></number-list-item>
      <number-list-item
        :label="'Required win chance'"
        :value="kellyCalc?.getRequiredWinChance() ?? 0"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'My win chance'"
        :value="kellyCalc?.getAssumedWinChance() ?? 0"
        :isPercentage="true"
      ></number-list-item>
      <number-list-item
        :label="'Average growth rate'"
        :value="kellyCalc?.getBankrollGrowthRate() ?? 0"
        :isPercentage="true"
      >
      </number-list-item>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="onClick" color="primary lighten" text> Details </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="onClick"
        color="primary lighten"
      >
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <number-list-item
            :label="'Kelly Fraction'"
            :value="kellyCalc?.getBankrollFraction() ?? 0"
            :isPercentage="true"
          ></number-list-item>
          <number-list-item
            :label="'Edge'"
            :value="kellyCalc?.getEdge() ?? 0"
            :isPercentage="true"
          ></number-list-item>
          <number-list-item
            :label="'Average win'"
            :value="kellyCalc?.getExpectedWin() ?? 0"
          ></number-list-item>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KellyCalc from "../model/kelly-calc";
import NumberListItem from "./NumberListItem.vue";

defineProps<{
  kellyCalc?: KellyCalc;
  isBestBet: boolean;
}>();

const show = ref(false);

function onClick() {
  show.value = !show.value;
}
</script>
