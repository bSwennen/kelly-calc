<template>
  <v-card>
    <LineChart
      class="py-2 px-2"
      :chartData="simData"
      :options="options"
      :height="100"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Chart",
  props: {
    simData: Object,
    isLogScale: Boolean
  },
  components: { LineChart },
  setup(props) {
    const options = computed(() => ({
      scales: {
        y: {
          type: props.isLogScale ? "logarithmic" : "linear"
        }
      },
      responsive: true,
      plugins: {
        legend: false
      }
    }));
    return { options };
  }
});
</script>
