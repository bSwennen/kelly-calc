<template>
  <div>
    <Line
      v-if="chartData"
      class="py-2 px-2"
      :data="chartData"
      :options="chartOptions"
      :height="100"
    />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";

Chart.register(...registerables);

const props = defineProps({
  labels: Array,
  dataSets: Array,
  isLogScale: Boolean,
});

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: props.dataSets,
  };
});

const chartOptions = computed(() => {
  return {
    scales: {
      y: {
        type: props.isLogScale ? "logarithmic" : "linear",
      },
    },
    responsive: true,
    animation: false,
    plugins: {
      legend: false,
    },
  };
});
</script>
