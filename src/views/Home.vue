<template>
  <v-container fluid class="py-6 px-6">
    <KellyCalcRow
      v-for="row in this.rows"
      :key="row.key"
      @delete="onDelete(row)"
      @copy="onCopy"
      @input="kellyCalc($event, row)"
      :initFormData="row.formData"
      :kellyCalc="row.kellyCalc"
      :isBestBet="row.isBestBet"
      :computed="row.computed"
    />
    <v-btn fab dark color="primary lighten" v-on:click="onAdd" class="my-2">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import KellyCalc from "@/model/kellyCalc";
import KellyCalcRow from "@/components/KellyCalcRow";

export default {
  name: "Home",
  components: { KellyCalcRow },
  data() {
    return {
      rows: []
    };
  },
  methods: {
    onAdd() {
      this.addRow({});
    },
    addRow(initFormData) {
      if (this.rows.length === 0) this.rows = [this.initRow(0, initFormData)];
      else {
        const newKey = this.rows[this.rows.length - 1].key + 1;

        this.rows.push(this.initRow(newKey, initFormData));
      }
    },
    initRow(key, initFormData) {
      return {
        key: key,
        formData: initFormData,
        kellyCalc: null,
        isBestBet: false,
        computed: false
      };
    },
    onCopy(copyFormData) {
      this.addRow(copyFormData);
    },
    onDelete(row) {
      this.rows = this.rows.filter(value => value.key !== row.key);
    },
    kellyCalc(formData, row) {
      if (formData.bankroll && formData.odds && formData.assumedOdds) {
        const selectedRow = this.rows.filter(value => value.key === row.key)[0];

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
    maxGrowthRateRow() {
      let maxGrowthRate = 0;
      let maxRow = this.rows[0];

      this.rows.forEach(value => {
        if (value.kellyCalc.getBankrollGrowthRate() >= maxGrowthRate) {
          maxGrowthRate = value.kellyCalc.getBankrollGrowthRate();
          maxRow = value;
        }
      });
      return maxRow;
    },
    updateBestBet() {
      const maxRow = this.maxGrowthRateRow();

      this.rows.forEach(value => {
        if (value.key === maxRow.key && this.rows.length > 1)
          value.isBestBet = true;
        else value.isBestBet = false;
      });
    }
  },
  mounted() {
    this.addRow({});
  }
};
</script>
