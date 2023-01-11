<template>
  <v-container fluid class="py-6 px-6">
    <KellyCalcRow v-for="row in rows" :key="row.key" @delete="onDelete(row)" @copy="onCopy"
      @input="kellyCalc($event, row)" :initFormData="row.formData" :kellyCalc="row.kellyCalc" :isBestBet="row.isBestBet"
      :computed="row.computed" :canDelete="canDelete()" />
    <v-btn icon="mdi-plus" dark color="primary lighten" @click="onAdd">
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import KellyCalc from "@/model/kelly-calc";
import { KellyCalcData } from "@/types/kelly-calc-data";
import { FormData } from "@/types/form-data";
import KellyCalcRow from "./KellyCalcRow.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Main",
  components: { KellyCalcRow },
  data() {
    return {
      rows: [] as KellyCalcData[],
    };
  },
  methods: {
    onAdd(): void {
      this.addRow({});
    },
    addRow(initFormData: FormData): void {
      if (this.rows.length === 0) {
        this.rows = [this.initRow(0, initFormData)];
      }
      else {
        const newKey = this.rows[this.rows.length - 1].key + 1;

        this.rows.push(this.initRow(newKey, initFormData));
      }
    },
    initRow(key: number, initFormData: FormData): KellyCalcData {
      return {
        key: key,
        formData: initFormData,
        isBestBet: false,
        computed: false,
      };
    },
    onCopy(copyFormData: FormData): void {
      this.addRow(copyFormData);
    },
    onDelete(row: KellyCalcData): void {
      this.rows = this.rows.filter((value) => value.key !== row.key);
    },
    kellyCalc(formData: FormData, row: KellyCalcData): void {
      if (formData.bankroll && formData.odds && formData.assumedOdds) {
        const selectedRow = this.rows.filter(
          (value) => value.key === row.key
        )[0];

        if (selectedRow) {
          const kellyCalc = new KellyCalc(
            formData.bankroll,
            formData.odds,
            formData.assumedOdds
          );
          selectedRow.kellyCalc = kellyCalc;
          selectedRow.computed = true;

          this.updateBestBet();
        }
      }
    },
    maxGrowthRateRow(): KellyCalcData {
      let maxGrowthRate: number = 0;
      let maxRow: KellyCalcData = this.rows[0];

      this.rows.forEach((value) => {
        let growthRate = value.kellyCalc?.getBankrollGrowthRate()

        if (growthRate && growthRate >= maxGrowthRate) {
          maxGrowthRate = growthRate;
          maxRow = value;
        }
      });
      return maxRow;
    },
    updateBestBet() {
      const maxRow = this.maxGrowthRateRow();

      this.rows.forEach((value) => {
        if (value.key === maxRow.key && this.rows.length > 1) {
          value.isBestBet = true;
        }
        else {
          value.isBestBet = false;
        }
      });
    },
    canDelete(): boolean {
      return this.rows.length > 1
    }
  },
  mounted() {
    this.addRow({});
  },
})
</script>
