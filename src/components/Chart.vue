<template>
  <v-card>
    <LineChart
      class="py-6 px-6"
      :chartData="testData"
      :options="options"
      :height="100"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Simulator from "../model/simulator";
import KellyCalc from "../model/kellyCalc";

Chart.register(...registerables);

export default defineComponent({
  name: "Chart",
  components: { LineChart },
  setup() {
    const numSteps = 1000;
    const kellyCalc = new KellyCalc(10, 2, 1.8);
    const simulator = new Simulator(kellyCalc, numSteps);
    function generateAverageGrowthData() {
      const result = [];
      result.push(kellyCalc.getBankroll());

      for (let i = 0; i < numSteps; i++)
        result.push(result[i] * (1 + kellyCalc.getBankrollGrowthRate()));

      return result;
    }
    function generateDataSets(numDataSets) {
      const result = [];

      result.push({
        data: generateAverageGrowthData(),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 0
      });

      for (let i = 0; i < numDataSets; i++)
        result.push({
          data: simulator.simulate(),
          backgroundColor: "black",
          borderColor: "black",
          borderWidth: 0.7,
          pointRadius: 0
        });

      return result;
    }
    const testData = {
      labels: Array.from(Array(numSteps + 1), (x, i) => Math.floor(i / 10)),
      datasets: generateDataSets(10)
    };
    const options = {
      scales: {
        y: {
          type: "logarithmic"
        }
      },
      plugins: {
        legend: false
      }
    };
    return { testData, options };
  }
});
</script>
