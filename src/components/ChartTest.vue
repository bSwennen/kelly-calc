<template>
  <div style="width: 400px">
    <div style="display: flex; justify-content: center">
      <button type="button" @click="shuffleData">Shuffle</button>
      <button type="button" @click="switchLegend">Swicth legends</button>
    </div>
    <client-only> </client-only>
    <DoughnutChart ref="doughnutRef" :chartData="testData" :options="options" />
  </div>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { computed, defineComponent, ref } from "@vue/composition-api";
import { shuffle } from "lodash";

export default defineComponent({
  name: "ChartTest",
  components: { DoughnutChart },
  setup() {
    const dataValues = ref([30, 40, 60, 70, 5]);
    const toggleLegend = ref(true);
    const doughnutRef = ref();

    const testData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED"
          ]
        }
      ]
    }));

    const options = computed(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right"
        }
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom"
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart"
        }
      }
    }));

    function shuffleData() {
      dataValues.value = shuffle(dataValues.value);
      console.log(doughnutRef.value.chartInstance);
    }

    function switchLegend() {
      toggleLegend.value = !toggleLegend.value;
    }

    return { shuffleData, doughnutRef, switchLegend, testData, options };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
