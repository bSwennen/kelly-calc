<template>
  <v-card>
    <v-btn
      icon
      dark
      color="primary lighten"
      small
      v-on:click="refresh"
      class="mx-2 my-2"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <Chart :simData="simData" />
  </v-card>
</template>

<script>
import Chart from "@/components/Chart";
import Simulator from "@/model/simulator";

export default {
  name: "Simulation",
  props: {
    kellyCalc: Object
  },
  components: { Chart },
  data() {
    return {
      simulator: {},
      isLoading: true,
      simData: {},
      numSteps: 10,
      numSims: 10
    };
  },
  methods: {
    generateAverageGrowthData(numSteps) {
      const result = [];
      result.push(this.kellyCalc.getBankroll());

      for (let i = 0; i < numSteps; i++)
        result.push(result[i] * (1 + this.kellyCalc.getBankrollGrowthRate()));

      return result;
    },
    generateDataSets(numSims, numSteps, simulator) {
      this.isLoading = true;
      const result = [];

      result.push({
        data: this.generateAverageGrowthData(numSteps),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 0
      });

      for (let i = 0; i < numSims; i++)
        result.push({
          data: simulator.simulate(numSteps),
          backgroundColor: "black",
          borderColor: "black",
          borderWidth: 0.7,
          pointRadius: 0
        });
      this.isLoading = false;

      return result;
    },
    generateSimData(numSims, numSteps) {
      this.simulator = new Simulator(this.kellyCalc);

      return {
        labels: Array.from(Array(numSteps + 1), (x, i) => Math.floor(i / 10)),
        datasets: this.generateDataSets(numSims, numSteps, this.simulator)
      };
    },
    refresh() {
      this.simData = this.generateSimData(
        this.numSims,
        this.numSteps,
        this.simulator
      );
    }
  },
  created() {
    this.refresh();
  }
};
</script>
