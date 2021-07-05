<template>
  <v-row>
    <v-col>
      <Form
        v-on:input="kellyCalc"
        v-on:delete="$emit('delete', $vnode.key)"
        v-on:copy="$emit('copy', $event)"
        :initFormData="initFormData"
      />
    </v-col>
    <v-col>
      <Results
        :bet="bet"
        :requiredWinChance="requiredWinChance"
        :assumedWinChance="assumedWinChance"
        :edge="edge"
        :bankrollFraction="bankrollFraction"
        :expectedWin="expectedWin"
        :growthRate="growthRate"
        v-if="computed"
      />
    </v-col>
  </v-row>
</template>

<script>
import KellyCalc from "@/model/kellyCalc";
import Results from "@/components/Results";
import Form from "@/components/Form";

export default {
  name: "KellyCalcRow",
  props: { initFormData: Object },
  components: { Results, Form },
  data() {
    return {
      computed: false,
      bet: 0,
      requiredWinChance: 0,
      assumedWinChance: 0,
      edge: 0,
      bankrollFraction: 0,
      expectedWin: 0,
      growthRate: 0
    };
  },
  methods: {
    kellyCalc(formData) {
      if (formData.bankroll && formData.odds && formData.assumedOdds) {
        const kellyCalc = new KellyCalc(
          formData.bankroll,
          formData.odds,
          formData.assumedOdds
        );

        this.bet = kellyCalc.getBet();
        this.requiredWinChance = kellyCalc.getRequiredWinChance();
        this.assumedWinChance = kellyCalc.getAssumedWinChance();
        this.edge = kellyCalc.getEdge();
        this.bankrollFraction = kellyCalc.getBankrollFraction();
        this.expectedWin = kellyCalc.getExpectedWin();
        this.growthRate = kellyCalc.getBankrollGrowthRate();

        this.computed = true;
      }
    }
  },
  mounted() {
    this.kellyCalc(this.initFormData);
  }
};
</script>
