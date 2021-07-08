<template>
  <v-container fluid class="py-6 px-6">
    <KellyCalcRow
      v-for="row in this.rows"
      :key="row.key"
      @delete="onDelete(row)"
      @copy="onCopy"
      @input="kellyCalc($event, row)"
      :initFormData="row.formData"
      :results="row.results"
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
        results: {
          bet: 0,
          requiredWinChance: 0,
          assumedWinChance: 0,
          edge: 0,
          bankrollFraction: 0,
          expectedWin: 0,
          growthRate: 0,
          isBestBet: false
        },
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
        const kellyCalc = new KellyCalc(
          formData.bankroll,
          formData.odds,
          formData.assumedOdds
        );

        const selectedRow = this.rows.filter(value => value.key === row.key)[0];

        if (selectedRow) {
          selectedRow.results.bet = kellyCalc.getBet();
          selectedRow.results.requiredWinChance =
            kellyCalc.getRequiredWinChance();
          selectedRow.results.assumedWinChance =
            kellyCalc.getAssumedWinChance();
          selectedRow.results.edge = kellyCalc.getEdge();
          selectedRow.results.bankrollFraction =
            kellyCalc.getBankrollFraction();
          selectedRow.results.expectedWin = kellyCalc.getExpectedWin();
          selectedRow.results.growthRate = kellyCalc.getBankrollGrowthRate();
          selectedRow.computed = true;

          selectedRow.results.isBestBet = this.isHighestGrowthRate(
            selectedRow.results.growthRate
          );
        }
      }
    },
    // TODO hightest rate could also be in one of the other rows
    isHighestGrowthRate(growthRate) {
      if (this.rows.length < 2) return false;

      this.rows.forEach(value => {
        if (value.results.growthRate > growthRate) return false;
      });
      return true;
    }
  },
  mounted() {
    this.addRow({});
  }
};
</script>
