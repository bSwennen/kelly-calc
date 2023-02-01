<template>
  <v-container fluid class="py-6 px-6">
    <KellyCalcRow
      v-for="row in rows"
      :key="row.key"
      @delete="onDelete(row)"
      @copy="onCopy"
      @input="kellyCalc($event, row)"
      :initFormData="row.formData"
      :kellyCalc="row.kellyCalc"
      :isBestBet="row.isBestBet"
      :computed="row.computed"
      :canDelete="canDelete()"
    />
    <v-btn icon="mdi-plus" dark color="primary lighten" @click="onAdd"> </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import KellyCalc from "../model/kelly-calc";
import { KellyCalcData, FormData } from "../types";
import KellyCalcRow from "./KellyCalcRow.vue";
import { onMounted, Ref, ref } from "vue";

const rows: Ref<KellyCalcData[]> = ref([]);

function onAdd(): void {
  addRow({});
}

function addRow(initFormData: FormData): void {
  if (rows.value.length === 0) {
    rows.value = [initRow(0, initFormData)];
  } else {
    const newKey = rows.value[rows.value.length - 1].key + 1;

    rows.value.push(initRow(newKey, initFormData));
  }
}

function initRow(key: number, initFormData: FormData): KellyCalcData {
  return {
    key: key,
    formData: initFormData,
    isBestBet: false,
    computed: false,
  };
}

function onCopy(copyFormData: FormData): void {
  addRow(copyFormData);
}

function onDelete(row: KellyCalcData): void {
  rows.value = rows.value.filter((value) => value.key !== row.key);
}

function kellyCalc(formData: FormData, row: KellyCalcData): void {
  if (formData.bankroll && formData.odds && formData.assumedOdds) {
    const selectedRow = rows.value.filter((value) => value.key === row.key)[0];

    if (selectedRow) {
      const kellyCalc = new KellyCalc(
        formData.bankroll,
        formData.odds,
        formData.assumedOdds
      );
      selectedRow.kellyCalc = kellyCalc;
      selectedRow.computed = true;

      updateBestBet();
    }
  }
}

function maxGrowthRateRow(): KellyCalcData {
  let maxGrowthRate: number = 0;
  let maxRow: KellyCalcData = rows.value[0];

  rows.value.forEach((value) => {
    let growthRate = value.kellyCalc?.getBankrollGrowthRate();

    if (growthRate && growthRate >= maxGrowthRate) {
      maxGrowthRate = growthRate;
      maxRow = value;
    }
  });
  return maxRow;
}

function updateBestBet() {
  const maxRow = maxGrowthRateRow();

  rows.value.forEach((value) => {
    if (value.key === maxRow.key && rows.value.length > 1) {
      value.isBestBet = true;
    } else {
      value.isBestBet = false;
    }
  });
}

function canDelete(): boolean {
  return rows.value.length > 1;
}

onMounted(() => {
  addRow({});
});
</script>
