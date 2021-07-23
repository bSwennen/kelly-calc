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
    <LineChart
      class="py-2 px-2"
      :chartData="simData"
      :options="options"
      :height="100"
    />
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Simulator from "../model/simulator";

Chart.register(...registerables);

export default defineComponent({
  name: "Chart",
  props: {
    kellyCalc: Object
  },
  components: { LineChart },
  setup(props) {
    const numSteps = 1e4;
    const loading = ref(true);
    const kellyCalc = ref(props.kellyCalc);
    const simulator = ref(new Simulator(kellyCalc, numSteps));
    function generateAverageGrowthData() {
      const result = [];
      result.push(kellyCalc.value.getBankroll());

      for (let i = 0; i < numSteps; i++)
        result.push(result[i] * (1 + kellyCalc.value.getBankrollGrowthRate()));

      return result;
    }
    function generateDataSets(numDataSets) {
      loading.value = true;

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
          data: simulator.value.simulate(),
          backgroundColor: "black",
          borderColor: "black",
          borderWidth: 0.7,
          pointRadius: 0
        });

      loading.value = false;

      return result;
    }
    const simData = computed(() => generateSimData());
    const options = {
      scales: {
        y: {
          type: "logarithmic"
        }
      },
      responsive: true,
      plugins: {
        legend: false
      }
    };
    function generateSimData() {
      return {
        labels: Array.from(Array(numSteps + 1), (x, i) => Math.floor(i / 10)),
        datasets: generateDataSets(5)
      };
    }
    function refresh() {
      kellyCalc.value = props.kellyCalc;
      simulator.value = new Simulator(props.kellyCalc, numSteps);
    }
    return { simData, options, refresh, loading };
  }
});
</script>
