<template>
  <v-card>
    <v-card-title>Simulations</v-card-title>
    <v-card-text>
      <SimulationForm
        :initNumSims="initNumSims"
        :initNumSteps="initNumSteps"
        @refresh="refresh"
        @input="onFormInput($event)"
      />
    </v-card-text>
    <Chart :simData="simData" :isLogScale="isLogScale" />
  </v-card>
</template>

<script>
import Chart from "@/components/simulation/Chart";
import Simulator from "@/model/simulator";
import SimulationForm from "@/components/simulation/SimulationForm";

export default {
  name: "Simulation",
  props: {
    kellyCalc: Object,
  },
  components: { Chart, SimulationForm },
  data() {
    return {
      simulator: {},
      isLoading: true,
      simData: {},
      initNumSteps: 100,
      initNumSims: 10,
      numSteps: null,
      numSims: null,
      isLogScale: true,
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
      const result = [];

      result.push({
        data: this.generateAverageGrowthData(numSteps),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 0,
      });

      for (let i = 0; i < numSims; i++)
        result.push({
          data: simulator.simulate(numSteps),
          backgroundColor: "black",
          borderColor: "black",
          borderWidth: 0.7,
          pointRadius: 0,
        });

      return result;
    },
    generateSimData(numSims, numSteps) {
      this.simulator = new Simulator(this.kellyCalc);

      return {
        labels: Array.from(Array(numSteps + 1), (x, i) => i),
        datasets: this.generateDataSets(numSims, numSteps, this.simulator),
      };
    },
    refresh() {
      this.isLoading = true;
      this.simData = this.generateSimData(this.numSims, this.numSteps);
      this.isLoading = false;
    },
    onFormInput(formData) {
      if (formData.numSims) this.numSims = formData.numSims;

      if (formData.numSteps) this.numSteps = formData.numSteps;

      this.isLogScale = formData.isLogScale;
    },
  },
  created() {
    this.numSims = this.initNumSims;
    this.numSteps = this.initNumSteps;

    this.refresh();
  },
};
</script>
