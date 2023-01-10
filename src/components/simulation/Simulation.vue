<template>
  <v-card>
    <v-card-title>Simulations</v-card-title>
    <v-card-text>
      <SimulationForm :initNumSims="initNumSims" :initNumSteps="initNumSteps" @refresh="refresh"
        @input="onFormInput($event)" />
    </v-card-text>
    <Chart :simData="simData" :isLogScale="isLogScale" />
  </v-card>
</template>

<script lang="ts">
import Chart from "./Chart.vue";
import Simulator from "@/model/simulator";
import SimulationForm from "./SimulationForm.vue";
import KellyCalc from '@/model/kelly-calc';
import { PropType } from 'vue';
import { FormData } from "@/types/simulation/form-data";

export default {
  name: "Simulation",
  props: {
    kellyCalc: Object as PropType<KellyCalc>,
  },
  components: {
    Chart,
    SimulationForm
  },
  data() {
    return {
      simulator: {} as Simulator,
      isLoading: true,
      simData: {},
      initNumSteps: 100,
      initNumSims: 10,
      numSteps: 0,
      numSims: 0,
      isLogScale: true,
    };
  },
  methods: {
    generateAverageGrowthData(numSteps: number) {
      if (this.kellyCalc) {
        const result = [];
        result.push(this.kellyCalc.getBankroll());

        for (let i = 0; i < numSteps; i++)
          result.push(result[i] * (1 + this.kellyCalc.getBankrollGrowthRate()));

        return result;
      }
    },
    generateDataSets(numSims: number, numSteps: number, simulator: Simulator) {
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
    generateSimData(numSims: number, numSteps: number) {
      if (this.kellyCalc) {
        this.simulator = new Simulator(this.kellyCalc);
      }
      return {
        labels: Array.from(Array(numSteps + 1), (x, i) => i),
        datasets: this.generateDataSets(numSims, numSteps, this.simulator),
      };
    },
    refresh() {
      if (this.numSims && this.numSteps) {
        this.simData = this.generateSimData(this.numSims, this.numSteps);
      }
      this.isLoading = true;
      this.isLoading = false;
    },
    onFormInput(formData: FormData) {
      if (formData.numSims) {
        this.numSims = formData.numSims;
      }
      if (formData.numSteps) {
        this.numSteps = formData.numSteps;
      }
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
