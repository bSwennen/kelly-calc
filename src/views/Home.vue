<template>
  <v-container fluid class="py-8 px-6">
    <v-row dense>
      <v-col>
        <Form v-on:input="kellyCalc" />
      </v-col>
      <v-col>
        <Results
          :bet="bet"
          :requiredWinChance="requiredWinChance"
          :edge="edge"
          :bankrollFraction="bankrollFraction"
          :expectedWin="expectedWin"
          v-if="computed"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KellyCalc from "@/model/kellyCalc";
import Results from "@/components/Results";
import Form from "@/components/Form";

export default {
  name: "Home",
  components: { Results, Form },
  data() {
    return {
      computed: false,
      bet: 0,
      requiredWinChance: 0,
      edge: 0,
      bankrollFraction: 0,
      expectedWin: 0
    };
  },
  methods: {
    kellyCalc(formData) {
      if (formData.bankroll && formData.odds && formData.winChance) {
        const kellyCalc = new KellyCalc(
          formData.bankroll,
          formData.odds,
          formData.winChance / 100
        );

        this.bet = kellyCalc.getBet();
        this.requiredWinChance = kellyCalc.getRequiredWinChance();
        this.edge = kellyCalc.getEdge();
        this.bankrollFraction = kellyCalc.getBankrollFraction();
        this.expectedWin = kellyCalc.getExpectedWin();

        this.computed = true;
      }
    }
  }
};
</script>
